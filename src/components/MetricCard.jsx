import React from "react";

export default function MetricCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded">
      <h3 className="text-sm text-gray-600">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}