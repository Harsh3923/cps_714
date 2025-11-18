import React from "react";
import MemberTable from "./MemberTable";

export default function MemberSection({ members, approve, reject, suspend }) {
  const pendingMembers = members.filter((m) => m.status === "pending");
  const activeMembers = members.filter((m) => m.status === "active");
  const inactiveMembers = members.filter((m) => m.status === "suspended" || m.status === "rejected");

  return (
    // make the card a column flex container that fills available height
    <div className="bg-white p-4 rounded h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-3">Member Management</h2>

      {/* content area grows to fill and becomes scrollable if it overflows */}
      <div className="flex-1 overflow-auto space-y-6">
        {pendingMembers.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Pending Applications ({pendingMembers.length})</h3>
            <MemberTable members={pendingMembers} approve={approve} reject={reject} suspend={suspend} showActions={true} tableType="pending" />
          </div>
        )}

        {activeMembers.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Active Members ({activeMembers.length})</h3>
            <MemberTable members={activeMembers} approve={approve} reject={reject} suspend={suspend} showActions={true} tableType="active" />
          </div>
        )}

        {inactiveMembers.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Suspended/Rejected Members ({inactiveMembers.length})</h3>
            <MemberTable members={inactiveMembers} approve={approve} reject={reject} suspend={suspend} showActions={false} tableType="inactive" />
          </div>
        )}

        {members.length === 0 && <p className="text-gray-500">No members found.</p>}
      </div>
    </div>
  );
}