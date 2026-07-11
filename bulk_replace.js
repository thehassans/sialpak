const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Background replacements
  if (content.includes('bg-[#fee5c9]')) { content = content.replace(/bg-\[#fee5c9\]/g, 'bg-[#f8f9fa]'); changed = true; }
  if (content.includes('bg-[#ffebd5]')) { content = content.replace(/bg-\[#ffebd5\]/g, 'bg-white'); changed = true; }
  
  // Actually, let's make all page background f8f9fa and blocks white
  // If we change fee5c9 (which was often page bg) to #f8f9fa
  // If we change ffebd5 (which was often blocks) to white

  // Shadow replacements
  const brutalistShadow = /shadow-\[4px_4px_0px_0px_rgba\(0,0,0,1\)\]/g;
  if (brutalistShadow.test(content)) {
    content = content.replace(brutalistShadow, 'shadow-sm');
    changed = true;
  }
  
  const brutalistShadow2 = /shadow-\[2px_2px_0px_0px_rgba\(0,0,0,1\)\]/g;
  if (brutalistShadow2.test(content)) {
    content = content.replace(brutalistShadow2, 'shadow-sm');
    changed = true;
  }

  // Border replacements
  const brutalistBorder = /border-2 border-black/g;
  if (brutalistBorder.test(content)) {
    content = content.replace(brutalistBorder, 'border border-gray-200');
    changed = true;
  }
  
  const brutalistBorderB = /border-b-2 border-black/g;
  if (brutalistBorderB.test(content)) {
    content = content.replace(brutalistBorderB, 'border-b border-gray-200');
    changed = true;
  }

  const brutalistBorderT = /border-t-2 border-black/g;
  if (brutalistBorderT.test(content)) {
    content = content.replace(brutalistBorderT, 'border-t border-gray-200');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
}
