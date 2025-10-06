import React, { useEffect, useState } from "react";
// Uncomment to use Firebase
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const USE_FIRESTORE = false; // set true when Firebase is configured

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
// };
// let db;
// if (USE_FIRESTORE) {
//   const app = initializeApp(firebaseConfig);
//   db = getFirestore(app);
// }

const mockMembers = [
  { id: "m-001", name: "Aisha Khan", email: "aisha.k@example.com", cardNumber: "C-1001", status: "pending" },
  { id: "m-002", name: "Liam O'Reilly", email: "liam.o@example.com", cardNumber: "C-1002", status: "active" },
  { id: "m-003", name: "Chen Wei", email: "chen.w@example.com", cardNumber: "C-1003", status: "suspended" },
];

const mockOverdueReport = [
  { memberId: "m-002", memberName: "Liam O'Reilly", itemTitle: "Intro to Algorithms", daysLate: 16, fine: 8.0 },
  { memberId: "m-003", memberName: "Chen Wei", itemTitle: "Modern Art: A History", daysLate: 26, fine: 13.0 },
];

export default function StaffAdminDashboard() {
  const [members, setMembers] = useState([]);
  const [overdueReport, setOverdueReport] = useState([]);
  const [metrics, setMetrics] = useState({ totalMembers: 0, todaysCheckouts: 0, pendingApplications: 0 });

  useEffect(() => {
    if (!USE_FIRESTORE) {
      setMembers(mockMembers);
      setOverdueReport(mockOverdueReport);
      setMetrics({
        totalMembers: mockMembers.length,
        todaysCheckouts: 12,
        pendingApplications: mockMembers.filter((m) => m.status === "pending").length,
      });
    }
  }, []);

  const approveMember = (id) => setMembers((p) => p.map((m) => (m.id === id ? { ...m, status: "active" } : m)));
  const rejectMember = (id) => setMembers((p) => p.filter((m) => m.id !== id));
  const markResolved = (id, item) =>
    setOverdueReport((p) => p.filter((r) => !(r.memberId === id && r.itemTitle === item)));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">📚 LibraLite Staff Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Total Members" value={metrics.totalMembers} />
        <MetricCard label="Today's Checkouts" value={metrics.todaysCheckouts} />
        <MetricCard label="Pending Applications" value={metrics.pendingApplications} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemberSection members={members} approve={approveMember} reject={rejectMember} />
        <OverdueSection overdue={overdueReport} markResolved={markResolved} />
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        Skeleton build for TA demo — mock data mode active
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

function MemberSection({ members, approve, reject }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Member Management</h2>
      {members.length === 0 ? (
        <p className="text-gray-500">No members found.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2">Name</th>
              <th className="pb-2">Card</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="py-2">{m.name}</td>
                <td className="py-2">{m.cardNumber}</td>
                <td className="py-2 capitalize">{m.status}</td>
                <td className="py-2 space-x-2">
                  {m.status === "pending" && (
                    <>
                      <button onClick={() => approve(m.id)} className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                        Approve
                      </button>
                      <button onClick={() => reject(m.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
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
