"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableDescription({ html }: { html: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!html) return null;

  return (
    <div className="mb-10 relative">
      <div 
        className={`text-[15px] font-light leading-relaxed text-[#52525b] overflow-hidden transition-all duration-300 relative ${isExpanded ? 'max-h-[5000px]' : 'max-h-[150px]'}`}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-wider text-black mt-2 hover:text-[#ff5a1f] transition-colors"
      >
        {isExpanded ? (
          <>Read Less <ChevronUp className="w-4 h-4" /></>
        ) : (
          <>Read More <ChevronDown className="w-4 h-4" /></>
        )}
      </button>
    </div>
  );
}
