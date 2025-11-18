import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, USE_FIRESTORE } from "./firebase.js";

import MetricCard from "./components/MetricCard";
import PopularItemsCard from "./components/PopularItemsCard";
import MemberSection from "./components/MemberSection";
import OverdueSection from "./components/OverdueSection";
import CheckedOutList from "./components/CheckedOutList";
import StatusPieChart from "./components/StatusPieChart";

import { computeMetrics } from "./lib/metrics";
import { mockMembers, mockCheckouts, mockOverdueReport } from "./lib/mocks";

export default function StaffAdminDashboard() {
  const [members, setMembers] = useState([]);
  const [overdueReport, setOverdueReport] = useState([]);
  const [metrics, setMetrics] = useState(computeMetrics([], []));

  useEffect(() => {
    if (!USE_FIRESTORE || !db) {
      setMembers(mockMembers);
      setOverdueReport(mockOverdueReport);
      setMetrics(computeMetrics(mockMembers, mockCheckouts));
    } else {
      async function fetchData() {
        try {
          const membersCol = collection(db, "members");
          const membersSnapshot = await getDocs(membersCol);
          const membersList = membersSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setMembers(membersList);
          setOverdueReport(mockOverdueReport);
          setMetrics(computeMetrics(membersList, mockCheckouts));
        } catch (err) {
          console.error("Error loading data:", err);
          setMembers(mockMembers);
          setOverdueReport(mockOverdueReport);
          setMetrics(computeMetrics(mockMembers, mockCheckouts));
        }
      }
      fetchData();
    }
  }, []);

  const changeMemberStatus = async (id, newStatus) => {
    setMembers((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m));
      setMetrics(computeMetrics(updated, mockCheckouts));
      return updated;
    });

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
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-4">LibraLITE - Staff Administration Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-semibold">
        <MetricCard label="Total Members" value={metrics.totalMembers} color="green" />
        <MetricCard label="Today's Checkouts" value={metrics.todaysCheckouts} color="blue" />
        <MetricCard label="New Registrations (Today)" value={metrics.todaysRegistrations} color="yellow" />
        <PopularItemsCard items={metrics.popularItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* left: member management fills the full height of the right stacked column */}
        <div className="h-full">
          <MemberSection members={members} approve={approveMember} reject={rejectMember} suspend={suspendMember} />
        </div>

        {/* right: stacked cards (status pie, overdue, checked-out) */}
        <div className="space-y-6">
          <StatusPieChart
            counts={{
              active: metrics.activeMembers,
              suspended: metrics.suspendedMembers,
              rejected: metrics.rejectedMembers,
              pending: metrics.pendingApplications,
            }}
            checkoutsCount={mockCheckouts.length}
            overdueCount={overdueReport.length}
          />
          <OverdueSection overdue={overdueReport} markResolved={markResolved} />
          <CheckedOutList checkouts={mockCheckouts} members={members} />
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        Skeleton build for TA demo — {USE_FIRESTORE ? "Firestore mode active" : "mock data mode active"}
      </footer>
    </div>
  );
}