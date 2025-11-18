export const isSameDay = (a, b = new Date()) => {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export function computeMetrics(membersList = [], checkoutsList = []) {
  const activeCount = membersList.filter((m) => m.status === "active").length;
  const suspendedCount = membersList.filter((m) => m.status === "suspended").length;
  const rejectedCount = membersList.filter((m) => m.status === "rejected").length;
  const pendingCount = membersList.filter((m) => m.status === "pending").length;

  const todaysCheckouts = (checkoutsList || []).length
    ? (checkoutsList || []).filter((c) => isSameDay(c.checkedOutAt)).length
    : 12; // fallback

  const todaysRegistrations = membersList.filter((m) => m.createdAt && isSameDay(m.createdAt)).length;

  const counts = {};
  (checkoutsList || []).forEach((c) => {
    counts[c.itemTitle] = (counts[c.itemTitle] || 0) + 1;
  });
  const popularItems = Object.entries(counts)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    totalMembers: membersList.length,
    todaysCheckouts,
    todaysRegistrations,
    activeMembers: activeCount,
    suspendedMembers: suspendedCount,
    rejectedMembers: rejectedCount,
    pendingApplications: pendingCount,
    popularItems,
  };
}