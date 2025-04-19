
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { HelpCircle } from "lucide-react";

interface FinancialTermTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

const FinancialTermTooltip = ({ term, definition, children }: FinancialTermTooltipProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="group text-blue-400 cursor-help underline decoration-dotted inline-flex items-center">
          {children}
          <HelpCircle className="ml-1 h-4 w-4 text-blue-400 opacity-70 group-hover:opacity-100" />
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 bg-slate-800 border border-slate-700">
        <div>
          <h4 className="font-bold text-white">{term}</h4>
          <p className="text-slate-300">{definition}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default FinancialTermTooltip;
