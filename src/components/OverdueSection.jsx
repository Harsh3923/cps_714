import React from "react";

export default function OverdueSection({ overdue, markResolved }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Overdue Items Report</h2>
      {overdue.length === 0 ? (
        <p className="text-gray-500">No overdue items.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th>Member</th>
              <th>Item</th>
              <th>Days Late</th>
              <th>Fine</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {overdue.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="py-2">{r.memberName}</td>
                <td className="py-2">{r.itemTitle}</td>
                <td className="py-2">{r.daysLate}</td>
                <td className="py-2">${r.fine.toFixed(2)}</td>
                <td>
                  <button onClick={() => markResolved(r.memberId, r.itemTitle)} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Mark Resolved</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}