const fs = require('fs');
const path = require('path');
const contentful = require('contentful-management');

// Config
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const config = {
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
    pageId: '1S76nrGoZDJJV9kM2iN79y', // Change as needed
    inputFile: path.join(__dirname, '../contentful/input1.txt'),
};

async function main() {
    // Read and parse champions
    const data = fs.readFileSync(config.inputFile, 'utf8');
    const champions = data
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => {
            const [year, ...nameParts] = line.split('\t');
            return { year: year.trim(), name: nameParts.join(',').trim() };
        });

    // Connect to Contentful
    const client = contentful.createClient({ accessToken: config.accessToken });
    const space = await client.getSpace(config.spaceId);
    const env = await space.getEnvironment(config.environmentId);

    // Create and publish champion entries
    const championEntries = [];
    for (const champ of champions) {
        const entry = await env.createEntry('champion', {
            fields: {
                year: { 'en-US': +champ.year },
                name: { 'en-US': champ.name },
            },
        });
        const publishedEntry = await entry.publish();
        championEntries.push(publishedEntry);
    }

    // Update championPage with new champions
    const page = await env.getEntry(config.pageId);
    page.fields.champions = {
        'en-US': championEntries.map(e => ({ sys: { type: 'Link', linkType: 'Entry', id: e.sys.id } })),
    };
    const updatedPage = await page.update();
    await updatedPage.publish();
    console.log('Champions injected, published, and page updated/published.');
}

main().catch(console.error);