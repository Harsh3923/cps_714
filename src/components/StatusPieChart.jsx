import React from "react";

/**
 * Props:
 *  - counts: { active, suspended, rejected, pending }
 *  - size: number (px)
 */
export default function StatusPieChart({ counts = {}, size = 160 }) {
  const { active = 0, suspended = 0, rejected = 0, pending = 0 } = counts;
  const total = active + suspended + rejected + pending;

  if (!total) {
    return (
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold mb-3">Member Status Breakdown</h2>
        <p className="text-gray-500">No members yet.</p>
      </div>
    );
  }

  const toPct = (n) => Math.round((n / total) * 1000) / 10; // one decimal pct

  const a = toPct(active);
  const b = toPct(suspended);
  const c = toPct(rejected);
  const d = toPct(pending);

  // conic-gradient requires percentages that add up to 100.
  const bg = `conic-gradient(#16a34a 0% ${a}%, #f59e0b ${a}% ${a + b}%, #ef4444 ${a + b}% ${a + b + c}%, #3b82f6 ${a + b + c}% 100%)`;

  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-lg font-semibold mb-3">Member Status Breakdown</h2>

      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-start md:space-x-6">
        <div className="flex-shrink-0" style={{ width: size, height: size }}>
          <div style={{ width: "100%", height: "100%", background: bg, borderRadius: "50%" }} />
        </div>
        <div className="text-sm mt-4 md:mt-0">
          <div className="flex items-center mb-2">
            <span className="w-3 h-3 inline-block mr-2" style={{ background: "#16a34a" }} /> Active — {active} ({a}%)
          </div>
          <div className="flex items-center mb-2">
            <span className="w-3 h-3 inline-block mr-2" style={{ background: "#f59e0b" }} /> Suspended — {suspended} ({b}%)
          </div>
          <div className="flex items-center mb-2">
            <span className="w-3 h-3 inline-block mr-2" style={{ background: "#ef4444" }} /> Rejected — {rejected} ({c}%)
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block mr-2" style={{ background: "#3b82f6" }} /> Pending — {pending} ({d}%)
          </div>
        </div>
      </div>
    </div>
  );
}