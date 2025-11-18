
import React from "react";

export default function CheckedOutList({ checkouts = [], members = [] }) {
  const lookupName = (id) => members.find((m) => m.id === id)?.name || id;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Checked-out Items</h2>
      {checkouts.length === 0 ? (
        <p className="text-gray-500">No items currently checked out.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th>Item</th>
              <th>Checked Out By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((c, i) => (
              <tr key={i} className="border-t">
                <td className="py-2">{c.itemTitle}</td>
                <td className="py-2">{lookupName(c.memberId)}</td>
                <td className="py-2">{new Date(c.checkedOutAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
