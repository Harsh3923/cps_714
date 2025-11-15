import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, USE_FIRESTORE } from "./firebase.js";

const mockMembers = [
  { id: "m-001", name: "Aisha Khan", email: "aisha.k@example.com", cardNumber: "C-1001", status: "pending" },
  { id: "m-002", name: "Mathew Frost", email: "mathew.k@example.com", cardNumber: "C-1002", status: "pending" },
  { id: "m-003", name: "Liam O'Reilly", email: "liam.o@example.com", cardNumber: "C-1003", status: "active" },
  { id: "m-004", name: "Shawn Smith", email: "shawn.o@example.com", cardNumber: "C-1004", status: "active" },
  { id: "m-005", name: "Nickisha Roy", email: "nickisha.o@example.com", cardNumber: "C-1005", status: "active" },
  { id: "m-006", name: "Chen Wei", email: "chen.w@example.com", cardNumber: "C-1006", status: "suspended" },
];

const mockOverdueReport = [
  { memberId: "m-003", memberName: "Liam O'Reilly", itemTitle: "Intro to Algorithms", daysLate: 16, fine: 8.0 },
  { memberId: "m-005", memberName: "Chen Wei", itemTitle: "Modern Art: A History", daysLate: 26, fine: 13.0 },
];

export default function StaffAdminDashboard() {
  const [members, setMembers] = useState([]);
  const [overdueReport, setOverdueReport] = useState([]);
  const [metrics, setMetrics] = useState({
    totalMembers: 0,
    todaysCheckouts: 0,
    activeMembers: 0,
    suspendedMembers: 0,
    rejectedMembers: 0,
    pendingApplications: 0,
  });

  // helper to recompute metrics from a list of members
  const updateMetrics = (membersList) => {
    const activeCount = membersList.filter((m) => m.status === "active").length;
    const suspendedCount = membersList.filter((m) => m.status === "suspended").length;
    const rejectedCount = membersList.filter((m) => m.status === "rejected").length;
    const pendingCount = membersList.filter((m) => m.status === "pending").length;

    setMetrics({
      totalMembers: membersList.length,
      todaysCheckouts: 12, // keeping static for now
      activeMembers: activeCount,
      suspendedMembers: suspendedCount,
      rejectedMembers: rejectedCount,
      pendingApplications: pendingCount,
    });
  };

  useEffect(() => {
    if (!USE_FIRESTORE || !db) {
      // mock mode
      setMembers(mockMembers);
      setOverdueReport(mockOverdueReport);
      updateMetrics(mockMembers);
    } else {
      // Firestore mode
      async function fetchData() {
        try {
          const membersCol = collection(db, "members");
          const membersSnapshot = await getDocs(membersCol);

          const membersList = membersSnapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));

          setMembers(membersList);
          // overdue can stay mock for now or pull from Firestore as well
          setOverdueReport(mockOverdueReport);
          updateMetrics(membersList);
        } catch (err) {
          console.error("Error loading data from Firestore:", err);
          // fallback to mock if Firestore fails
          setMembers(mockMembers);
          setOverdueReport(mockOverdueReport);
          updateMetrics(mockMembers);
        }
      }

      fetchData();
    }
  }, []);

  // single helper to update status locally and in Firestore
  const changeMemberStatus = async (id, newStatus) => {
    // update local state and metrics
    setMembers((prev) => {
      const updated = prev.map((m) =>
        m.id === id ? { ...m, status: newStatus } : m
      );
      updateMetrics(updated);
      return updated;
    });

    // if Firestore is enabled, persist the change
    if (USE_FIRESTORE && db) {
      try {
        const ref = doc(db, "members", id);
        await updateDoc(ref, { status: newStatus });
      } catch (err) {
        console.error("Error updating member status in Firestore:", err);
      }
    }
  };

  const approveMember = (id) => changeMemberStatus(id, "active");
  const rejectMember = (id) => changeMemberStatus(id, "rejected");
  const suspendMember = (id) => changeMemberStatus(id, "suspended");

  const markResolved = (id, item) =>
    setOverdueReport((p) => p.filter((r) => !(r.memberId === id && r.itemTitle === item)));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">📚 LibraLite Staff Dashboard</h1>

      {/* Only show Total Members and Today's Checkouts at the top */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <MetricCard label="Total Members" value={metrics.totalMembers} />
        <MetricCard label="Today's Checkouts" value={metrics.todaysCheckouts} />
      </div>

      {/* Member Status Breakdown */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Member Status Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.activeMembers}</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{metrics.suspendedMembers}</div>
            <div className="text-sm text-gray-600">Suspended</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{metrics.rejectedMembers}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.pendingApplications}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemberSection
          members={members}
          approve={approveMember}
          reject={rejectMember}
          suspend={suspendMember}
        />
        <OverdueSection overdue={overdueReport} markResolved={markResolved} />
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        Skeleton build for TA demo — {USE_FIRESTORE ? "Firestore mode active" : "mock data mode active"}
      </footer>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-sm text-gray-600">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function MemberSection({ members, approve, reject, suspend }) {
  const pendingMembers = members.filter((m) => m.status === "pending");
  const activeMembers = members.filter((m) => m.status === "active");
  const inactiveMembers = members.filter(
    (m) => m.status === "suspended" || m.status === "rejected"
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Member Management</h2>

      {pendingMembers.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">
            Pending Applications ({pendingMembers.length})
          </h3>
          <MemberTable
            members={pendingMembers}
            approve={approve}
            reject={reject}
            suspend={suspend}
            showActions={true}
            tableType="pending"
          />
        </div>
      )}

      {activeMembers.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">
            Active Members ({activeMembers.length})
          </h3>
          <MemberTable
            members={activeMembers}
            approve={approve}
            reject={reject}
            suspend={suspend}
            showActions={true}
            tableType="active"
          />
        </div>
      )}

      {inactiveMembers.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-700 mb-2">
            Suspended/Rejected Members ({inactiveMembers.length})
          </h3>
          <MemberTable
            members={inactiveMembers}
            approve={approve}
            reject={reject}
            suspend={suspend}
            showActions={false}
            tableType="inactive"
          />
        </div>
      )}

      {members.length === 0 && (
        <p className="text-gray-500">No members found.</p>
      )}
    </div>
  );
}

function MemberTable({ members, approve, reject, suspend, showActions, tableType }) {
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
                    <button
                      onClick={() => approve(m.id)}
                      className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(m.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                    >
                      Reject
                    </button>
                  </>
                )}
                {tableType === "active" && (
                  <button
                    onClick={() => suspend(m.id)}
                    className="px-2 py-1 bg-yellow-600 text-white rounded text-xs"
                  >
                    Suspend
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function OverdueSection({ overdue, markResolved }) {
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
                  <button
                    onClick={() => markResolved(r.memberId, r.itemTitle)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  >
                    Mark Resolved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
