import React from "react";

export default function MemberTable({ members, approve, reject, suspend, showActions, tableType }) {
  return (
    <table className="w-full text-sm mb-4">
      <thead>
        <tr className="text-left text-gray-600">
          <th className="pb-2">Name</th>
          <th className="pb-2">Card</th>
          <th className="pb-2">Status</th>
          {showActions && <th className="pb-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {members.map((m) => (
          <tr key={m.id} className="border-t">
            <td className="py-2">{m.name}</td>
            <td className="py-2">{m.cardNumber}</td>
            <td className="py-2 capitalize">{m.status}</td>
            {showActions && (
              <td className="py-2 space-x-2">
                {tableType === "pending" && (
                  <>
                    <button onClick={() => approve(m.id)} className="px-2 py-1 bg-green-600 text-white rounded text-xs">Approve</button>
                    <button onClick={() => reject(m.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Reject</button>
                  </>
                )}
                {tableType === "active" && (
                  <button onClick={() => suspend(m.id)} className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Suspend</button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}