const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DB_ID;

(async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  console.log(response);
})();

