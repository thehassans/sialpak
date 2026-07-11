const fs = require('fs');
let file = fs.readFileSync('src/app/cart/page.tsx', 'utf8');

// Replace standard colors and classes with theme colors
file = file.replace(/bg-\[#f8f9fb\]/g, 'bg-[#fee5c9]');
file = file.replace(/bg-white/g, 'bg-[#ffebd5]');
file = file.replace(/border-\[#f0f0f0\]/g, 'border-black');
file = file.replace(/border-\[#e8ecf0\]/g, 'border-black');
file = file.replace(/text-\[#1a1f2e\]/g, 'text-black');
file = file.replace(/text-\[#64748b\]/g, 'text-black/70');
file = file.replace(/text-\[#94a3b8\]/g, 'text-black/60');
file = file.replace(/text-\[#b8c0cc\]/g, 'text-black/40');
file = file.replace(/bg-\[#1a1f2e\]/g, 'bg-[#3b2e2a]');
file = file.replace(/bg-\[#fafbfc\]/g, 'bg-[#fee5c9]');
file = file.replace(/hover:bg-\[#2d3548\]/g, 'hover:bg-[#ff5a1f]');
file = file.replace(/border border-black/g, 'border-2 border-black');

// Update input styling
file = file.replace(
  'const inputCls = "w-full border border-[#e8ecf0] rounded-xl px-4 py-3 text-[14px] text-[#1a1f2e] bg-[#fafbfc] outline-none transition-all focus:border-[#1a1f2e] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,31,46,0.06)] placeholder:text-[#b8c0cc]";',
  'const inputCls = "w-full border-2 border-black rounded-xl px-4 py-3 text-[14px] text-black font-bold bg-[#fee5c9] outline-none transition-all focus:border-[#ff5a1f] focus:bg-[#ffebd5] focus:shadow-[0_0_0_4px_rgba(255,90,31,0.2)] placeholder:text-black/40";'
);

// Add bold shadows to main cards
file = file.replace(/bg-\[#ffebd5\] rounded-2xl border-2 border-black overflow-hidden/g, 'bg-[#ffebd5] rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden');

// Update proceed button style
file = file.replace(/bg-\[#3b2e2a\] hover:bg-\[#ff5a1f\] text-white font-bold text-\[13px\] uppercase tracking-widest py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2/g, 'bg-[#3b2e2a] hover:bg-[#ff5a1f] text-white font-black text-[15px] uppercase tracking-widest py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2');

// Submit button styles for COD & Advance
file = file.replace(/w-full font-black text-\[13px\] uppercase tracking-widest py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60/g, 'w-full font-black text-[15px] uppercase tracking-widest py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]');

file = file.replace(/bg-amber-400 hover:bg-amber-500 text-black shadow-\[0_4px_16px_rgba\(245,158,11,0\.25\)\]/g, 'bg-[#ff5a1f] hover:bg-[#e04f1a] text-white');
file = file.replace(/bg-\[#3b2e2a\] hover:bg-\[#ff5a1f\] text-white shadow-\[0_4px_16px_rgba\(26,31,46,0\.15\)\]/g, 'bg-[#3b2e2a] hover:bg-[#2d221e] text-white');

// Update apply coupon button
file = file.replace(/bg-\[#3b2e2a\] text-white font-bold text-\[11px\] uppercase tracking-wider px-4 rounded-xl hover:bg-\[#ff5a1f\] transition-colors disabled:opacity-50/g, 'bg-[#ff5a1f] text-white font-black text-[13px] uppercase tracking-wider px-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]');

fs.writeFileSync('src/app/cart/page.tsx', file);
