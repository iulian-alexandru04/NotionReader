const { Client } = require('@notionhq/client');
const prompt = require("prompt-sync")({ sigint: true });

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DB_ID;
const src = 'name';
const dest = 'amount';

class Item {
    constructor(key, value, right, wrong) {
        this.key = key;
        this.value = value;
        this.right = right;
        this.wrong = wrong;
    }
}

async function get_database() {
    const response = await notion.databases.retrieve({
        database_id: databaseId,
    });
    return 0;
}

function read_text(prop) {
    return prop[prop['type']][0].plain_text;
}

async function get_items() {
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    let items = [];
    for(result of response['results']) {
        let s = result['properties'][src]
        let d = result['properties'][dest]
        let i = new Item(read_text(s), read_text(d), 0, 0);
        console.log('item: ' + i.key + ' = ' + i.value);
        items.push(i);
    }
    return items;
}

(async () => {
    let x = await get_database();
    console.log("getting entries:");
    let items = await get_items();
    let queue = [...items];
    while(queue.length != 0) {
        let i = queue.shift();
        console.log(i);
        let isOk = prompt('is ok? ');
        if(isOk !== 'y')
            queue.push(i);
    }
})();

