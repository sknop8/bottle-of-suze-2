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

    // line breaks
    plainText = plainText.replace(/(\r\n|\n|\r)/gm, '<br>');

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
      ret = `<p class='quote'>${richTextToHtml(block.quote.rich_text)}</p>`
      break;  
    case 'image':
      // center images
      ret = '<center>';

      if (block.image.file) {
        ret += `<img src=${block.image.file.url} />`;
        console.warn(`Warning: Notion-hosted image being used and will expire on ${block.image.file.expiry_time}`)
      } else if (block.image.external)  {
        ret += `<img src=${block.image.external.url} />`;
      }

      // Captions
      if (block.image.caption) {
        ret += `<div class='caption'>${richTextToHtml(block.image.caption)}</div>`;
      }

      ret += '</center>';

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
      break;
    case 'divider':
      ret = '<hr>';
      break;
    case 'bulleted_list_item':
      const text = richTextToHtml(block.bulleted_list_item.rich_text);
      ret = `<ul><li>${text}</li></ul>`;
      break;
    default:
      console.warn(`Unexpected block type ${block.type} not being handled`);
      break;
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
const postTitleMap = {};      // <postUrl: string, title:string>

// main page, get post titles, etc.
const getParentPage = async () => {
  let html = '';

  const children = await notion.blocks.children.list({
    block_id: pageId
  });

  for (let c of children.results) {
    switch(c.type) {
      case 'heading_1':
        html += `<h1>${richTextToHtml(c.heading_1.rich_text)}</h1>`;
        break;
      case 'heading_2':
        html += `<h2>${richTextToHtml(c.heading_2.rich_text)}</h2>`;
        break;
      case 'heading_3':
        html += `<h3>${richTextToHtml(c.heading_3.rich_text)}</h2>`;
        break;
      case 'paragraph':
        html += `<p>${richTextToHtml(c.paragraph.rich_text)}</p>`;
        break;
      case 'child_page':
        const postTitle = c.child_page.title;
        const postUrl = postTitleToUrl(postTitle);

        postTitleMap[postUrl] = postTitle;

        // link to the post
        html +=`<p><a class='thoughtpost' href='/thoughtblog/${postUrl}'>${postTitle}</a></p>`;

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
    postTitleMap[postId] = found.child_page.title;
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

  res.render('thoughtblog/main', {
    title: 'thoughtblog | bottle of suze',
    info: {
      html
    }
  });

  // load child pages in background
  for (let postId in postIdMap) {
    getChildPage(postId, true)
  }
});

router.get('/:post_id', async (req, res, next) => {
  let postId = postTitleToUrl(req.params.post_id);
  let html = await getChildPage(postId, false);
  let title = postTitleMap[postId] ?? postId;

  res.render('thoughtblog/post', {
    title: `${title} | bottle of suze`,
    postInfo: {
      title,
      html
    }
  });

  // check for update in background
  getChildPage(postId, true)
});

module.exports = router;