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

const postTitleToUrl = (title) => {
  return encodeURI(title.toLowerCase().replaceAll(' ', '-'));
}

const postIdMap = {};         // <postUrl: string, notionBlockId: string>
const postIdHtmlMap = {};     // <postUrl: string, html: string>
const postLastEditedMap = {}; // <postUrl: string, date(ms): string>
const postNeedsUpdate = {};   // <postUrl: string, needsUpdate: boolean>

// main page, get post titles, etc.
const getParentPage = async () => {
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
        const postTitle = c.child_page.title;
        const postUrl = postTitleToUrl(postTitle);

        // link to the post
        html +=`<p><a href='/thoughtblog/${postUrl}'>${postTitle}</a></p>`;

        postIdMap[postUrl] = c.id;

        // flag update if the page has new edits
        const lastEdited = Date.parse(c.last_edited_time);
        const prevLastEdited = postLastEditedMap[postUrl];
        if (!prevLastEdited || prevLastEdited < lastEdited) {
          postNeedsUpdate[postUrl] = true;
          postLastEditedMap[postUrl] = lastEdited;
        }

        break;
    }
  }
  return html;
};

// get page content by postid (url)
const getChildPage = async (postId, checkForUpdates) => {
  let html = '';
  let notionBlockId = postIdMap[postId];
  let needsUpdate = postNeedsUpdate[postId] ?? true;

  if (!notionBlockId) {
    const children = await notion.blocks.children.list({
      block_id: pageId
    });
    let found = children.results.find((c) =>
      c.type === 'child_page' && postTitleToUrl(c.child_page.title) === postId
    );
    if (!found) return html;
    notionBlockId = found.id;
    postIdMap[postId] = notionBlockId;
  }

  if (checkForUpdates) {
    const pageInfo = await notion.pages.retrieve({
      page_id: notionBlockId
    });

    const lastEdited = Date.parse(pageInfo.last_edited_time);
    const prevLastEdited = postLastEditedMap[postId];
    if (!prevLastEdited || prevLastEdited < lastEdited) {
      postNeedsUpdate[postId] = true;
      postLastEditedMap[postId] = lastEdited;
      needsUpdate = true;
    }
  };

  //  check if we have any html cached
  if (!needsUpdate && postIdHtmlMap[postId]) {
    return postIdHtmlMap[postId];
  }

  const content = await notion.blocks.children.list({
    block_id: notionBlockId
  });

  for (let block of content.results)  {
    html += await parseResult(block)
  }

  // update cache
  postIdHtmlMap[postId] = html;

  // mark updated
  postNeedsUpdate[postId] = false;

  return html;
};

router.get('/', async (_req, res) => {
  let html = await getParentPage();
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

router.get('/:post_id', async (req, res, next) => {
  let postId = req.params.post_id;
  let html = await getChildPage(postId, false);
  res.send(`
    <html>
      <head></head>
      <body>
        <h1>thoughtblog</h1>
        ${html}
      </body>
    </html>
  `);

  // check for update in background
  getChildPage(postId, true)
});

// load child pages in background
getParentPage().then(async () => {
  for (let postId in postIdMap) {
    await getChildPage(postId, true);
  }
});

module.exports = router;