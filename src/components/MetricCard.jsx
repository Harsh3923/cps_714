import React from "react";

const COLOR_MAP = {
  green: { bg: "bg-[#f2ebfd]", text: "text-[#752adf]" },
  blue: { bg: "bg-[#effaff]", text: "text-[#41b6ff]" },
  yellow: { bg: "bg-[#fff4ef]", text: "text-[#ff8b4f]" },
  red: { bg: "bg-red-100", text: "text-red-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  gray: { bg: "bg-gray-100", text: "text-gray-700" },
};

export default function MetricCard({ label, value, color = "blue" }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue;
  return (
    <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${c.bg}`}>
        <span className={`font-bold ${c.text} text-lg`}>{value}</span>
      </div>
      <div>
        <h3 className="text-sm text-gray-600">{label}</h3>
      </div>
    </div>
  );
}