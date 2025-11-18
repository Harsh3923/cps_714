import React from "react";

export default function PopularItemsCard({ items }) {
  return (
    <div className="bg-white p-4 rounded">
      <h3 className="text-sm text-gray-600">Popular Items</h3>
      {items && items.length > 0 ? (
        <ul className="mt-2 text-sm">
          {items.map((it, idx) => (
            <li key={idx} className="font-medium">
              {it.title} <span className="text-gray-500">({it.count})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No checkout data</p>
      )}
    </div>
  );
}