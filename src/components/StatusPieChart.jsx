import React from "react";

/**
 * Props:
 *  - counts: { active, suspended, rejected, pending }
 *  - size: number (px)
 *  - checkoutsCount: number (total checked-out items)
 *  - overdueCount: number (total overdue items)
 */
export default function StatusPieChart({
  counts = {},
  size = 160,
  checkoutsCount = 0,
  overdueCount = 0,
}) {
  const { active = 0, suspended = 0, rejected = 0, pending = 0 } = counts;
  const totalMembers = active + suspended + rejected + pending;

  const toPct = (n, tot) => (tot ? Math.round((n / tot) * 1000) / 10 : 0);

  // member status pie
  const a = toPct(active, totalMembers);
  const b = toPct(suspended, totalMembers);
  const c = toPct(rejected, totalMembers);
  const d = toPct(pending, totalMembers);
  const memberBg =
    totalMembers === 0
      ? "transparent"
      : `conic-gradient(#16a34a 0% ${a}%, #f59e0b ${a}% ${a + b}%, #ef4444 ${a + b}% ${
          a + b + c
        }%, #3b82f6 ${a + b + c}% 100%)`;

  // checked/out vs overdue pie (overdue vs not-overdue)
  const notOverdue = Math.max(0, checkoutsCount - overdueCount);
  const totalCheck = checkoutsCount;
  const overPct = toPct(overdueCount, totalCheck);
  const notOverPct = toPct(notOverdue, totalCheck);
  const checkBg =
    totalCheck === 0
      ? "transparent"
      : `conic-gradient(#ef4444 0% ${overPct}%, #3b82f6 ${overPct}% 100%)`;

  // fallback simple card when both sets empty
  if (!totalMembers && totalCheck === 0) {
    return (
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold mb-3">Member Status & Checkouts</h2>
        <p className="text-gray-500">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-center">Member Status & Checkouts</h2>

      {/* container: stack on small, row on md+, center content */}
      <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-8">
        {/* Member status pie block */}
        <div className="flex items-center md:items-start space-x-6">
          <div
            className="flex-shrink-0 rounded-full shadow-sm"
            style={{ width: size, height: size, background: memberBg }}
            aria-hidden
          />
          <div className="text-sm">
            <div className="font-medium mb-1">Members</div>
            <div className="flex items-center mb-1">
              <span className="w-3 h-3 inline-block mr-2 rounded-sm" style={{ background: "#16a34a" }} /> Active — {active} ({a}%)
            </div>
            <div className="flex items-center mb-1">
              <span className="w-3 h-3 inline-block mr-2 rounded-sm" style={{ background: "#f59e0b" }} /> Suspended — {suspended} ({b}%)
            </div>
            <div className="flex items-center mb-1">
              <span className="w-3 h-3 inline-block mr-2 rounded-sm" style={{ background: "#ef4444" }} /> Rejected — {rejected} ({c}%)
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block mr-2 rounded-sm" style={{ background: "#3b82f6" }} /> Pending — {pending} ({d}%)
            </div>
          </div>
        </div>

        {/* Checked-out vs Overdue block */}
        <div className="flex items-center md:items-start space-x-6">
          <div
            className="flex-shrink-0 rounded-full shadow-sm"
            style={{ width: size, height: size, background: checkBg }}
            aria-hidden
          />
          <div className="text-sm">
            <div className="font-medium mb-1">Checkouts</div>
            {totalCheck === 0 ? (
              <div className="text-gray-500">No checked-out items</div>
            ) : (
              <>
                <div className="flex items-center mb-1">
                  <span className="w-3 h-3 inline-block mr-2 rounded-sm" style={{ background: "#ef4444" }} /> Overdue — {overdueCount} ({overPct}%)
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 inline-block mr-2 rounded-sm" style={{ background: "#3b82f6" }} /> Not overdue — {notOverdue} ({notOverPct}%)
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}