const fs = require('fs');
const html = fs.readFileSync('C:/Users/kjh/.gemini/antigravity/brain/96350ff2-33d3-4304-9d8a-69478abea486/.system_generated/steps/815/content.md', 'utf8');
const regex = /href="(https:\/\/buysial\.pk\/product\/[^"]+)"/g;
let match;
const links = new Set();
while ((match = regex.exec(html)) !== null) {
  links.add(match[1]);
}
console.log('Found product links:', links.size);
console.log(Array.from(links).join('\n'));
