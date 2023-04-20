const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DB_ID;
const src = 'name';
const dest = 'amount';

async function get_database() {
    const response = await notion.databases.retrieve({
        database_id: databaseId,
    });
    console.log(response);
    console.log(src in response['properties']);
    console.log(dest in response['properties']);
    return 0;
}

async function get_entries() {
    const response = await notion.databases.query({
        database_id: databaseId,
    });
    console.log(response);
    console.log('----------------');
    for(result of response['results']) {
        for([name, prop] of Object.entries(result['properties'])) {
            if(name != src && name != dest)
                continue;
            let type = prop['type']
            let vals = prop[type]
            console.log(name + ': ' + vals[0].plain_text)
        }
    }
    return 0;
}

(async () => {
    let x = await get_database();
    console.log("getting entries:");
    let y = await get_entries();
})();

