"use client";

import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import ChartZoom from "./ChartZoom";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
  variant?: "default" | "featured" | "compact";
}

const ChartCard = ({
  title,
  children,
  className = "",
  showControls = true,
  variant = "default",
}: ChartCardProps) => {
  const CardControls = () => (
    <div className="flex items-center space-x-2">
      <ChartZoom
        title={title}
        triggerLabel=""
        triggerClassName="p-2 hover:bg-white/60 rounded-lg transition-colors group"
      >
        {children}
      </ChartZoom>
    </div>
  );

  const heightClass =
    variant === "compact" ? "h-64" : variant === "featured" ? "h-80" : "h-72";

  return (
    <div
      className={`
        group relative
        bg-gradient-to-br from-white to-gray-50/50
        rounded-none shadow-lg border border-gray-200/60
        p-6 lg:p-8
        transition-all duration-300 ease-out
        hover:shadow-2xl hover:shadow-[#FF277E]/5
        hover:border-[#FF277E]/20
        overflow-hidden
        ${className}
      `}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF277E]/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-6">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-gradient-to-br from-[#FF277E]/10 to-[#FF277E]/5 rounded-xl">
            <TrendingUp className="w-5 h-5 text-[#FF277E]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
              {title}
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#FF277E] to-transparent rounded-full" />
          </div>
        </div>
        {showControls && <CardControls />}
      </div>

      {/* Chart content */}
      <div className={`relative ${heightClass} transition-all duration-300`}>
        <div className="h-full flex items-center justify-center bg-white to-transparent rounded-xl border-none p-4">
          {children}
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF277E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ChartCard;
