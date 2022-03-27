const express = require('express');
const router = express.Router();
const { Client } = require("@notionhq/client")


// Initializing notion client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const pageId = process.env.NOTION_BLOG_PAGE_ID;

const richTextToHtml = (textArr) => {
  let html = "";
  for (let t of textArr) {
    let plainText = t.plain_text;
    let config = t.annotations;
    let style = [];
    if (config.bold) {
      html += '<strong>'
      style.push('</strong>');
    }
    if (config.italic) {
      html += '<i>'
      style.push('</i>');
    }
    if (t.text.link) {
      html += `<a href=${t.href} target='_blank'>${t.text.content}</a>`
    } else {
      html += plainText;
    }

    // add tail tags
    while (style.length > 0) {
      html += style.pop();
    }
  }

  return html;
};

const parseResult = async (block) => {
  let ret = '';

  switch(block.type) {
    case 'paragraph':
      ret = `<p>${richTextToHtml(block.paragraph.rich_text)}</p>`;
      break;
    case 'heading_1':
      ret = `<h1>${block.heading_1.rich_text[0].plain_text}</h1>`;
      break;
    case 'heading_2':
      ret =  `<h2>${block.heading_2.rich_text[0].plain_text}</h2>`;
      break;
    case 'heading_3':
      ret = `<h3>${block.heading_3.rich_text[0].plain_text}</h3>`;
      break;
    case 'quote':
      // TODO: will need to style these in css
      ret = `<q>${richTextToHtml(block.quote.rich_text)}</q>`
      break;  
    case 'image':
      // center images
      ret = '<center>';

      if (block.image.file) {
        ret += `<img height='200px' src=${block.image.file.url} />`;
        console.warn(`Warning: Notion-hosted image being used and will expire on ${block.image.file.expiry_time}`)
      } else if (block.image.external)  {
        ret += `<img height='200px' src=${block.image.external.url} />`;
      }

      // Captions
      if (block.image.caption) {
        ret += `<p>${richTextToHtml(block.image.caption)}</p>`;
      }

      ret += '</center>';

      // TODO: style img and caption padding
      break;
    case 'column_list':
      const columnChildren = await notion.blocks.children.list({
        block_id: block.id
      });
      for (let child of columnChildren.results) {
        const columnInfo = await notion.blocks.children.list({
          block_id: child.id
        });
        for (let res of columnInfo.results) {
          ret += await parseResult(res);
        }
      }
  }

  return ret;
};

const getPage = async () => {
  let html = '';

  const children = await notion.blocks.children.list({
    block_id: pageId  
  });

  for (let c of children.results) {
    switch(c.type) {
      case 'heading_1':
        html += `<h1>${c.heading_1.rich_text[0].plain_text}</h1>`;
        break;
      case 'heading_2':
        // year
        html += `<h2>${c.heading_2.rich_text[0].plain_text}</h2>`;
        break;
      case 'heading_3':
        // month]
        html += `<h3>${c.heading_3.rich_text[0].plain_text}</h2>`;
        break;
      case 'child_page':
        // post
        const content = await notion.blocks.children.list({
          block_id: c.id  
        });

        // making titles h1 while they're all on the same page
        html += '<br>'
        html +=`<h1>${c.child_page.title  }</h1>`;
        // html +=`<strong>${c.child_page.title}</strong>`;

        // get html for each post
        for (let block of content.results)  {
          html += await parseResult(block);          
        }

        break;
    }
  }
  return html;
};

router.get('/', async (_req, res) => {
  const html = await getPage();
  res.send(`
    <html>
      <head></head>
      <body>
        <h1>thoughtblog</h1>
        ${html}
      </body>
    </html>
  `);
});

// create page

// router.get('/', (_req, res) => {
//   res.render('thoughtblog/thoughtpost', {
//     title: 'thoughtblog | bottle of suze',
//     posts: notionPosts
//   });
// });



module.exports = router;