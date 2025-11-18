export const mockMembers = [
  { id: "m-001", name: "Aisha Khan", email: "aisha.k@example.com", cardNumber: "C-1001", status: "pending", createdAt: new Date().toISOString() },
  { id: "m-002", name: "Mathew Frost", email: "mathew.k@example.com", cardNumber: "C-1002", status: "pending", createdAt: new Date().toISOString() },
  { id: "m-003", name: "Liam O'Reilly", email: "liam.o@example.com", cardNumber: "C-1003", status: "active", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() },
  { id: "m-004", name: "Shawn Smith", email: "shawn.o@example.com", cardNumber: "C-1004", status: "active", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString() },
  { id: "m-005", name: "Nickisha Roy", email: "nickisha.o@example.com", cardNumber: "C-1005", status: "active", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
  { id: "m-006", name: "Chen Wei", email: "chen.w@example.com", cardNumber: "C-1006", status: "suspended", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
];

export const mockCheckouts = [
  { memberId: "m-003", itemTitle: "Intro to Algorithms", checkedOutAt: new Date().toISOString() },
  { memberId: "m-005", itemTitle: "Modern Art: A History", checkedOutAt: new Date().toISOString() },
  { memberId: "m-004", itemTitle: "JavaScript: The Good Parts", checkedOutAt: new Date().toISOString() },
  { memberId: "m-006", itemTitle: "Modern Art: A History", checkedOutAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 26).toISOString() },
];

export const mockOverdueReport = [
  { memberId: "m-003", memberName: "Liam O'Reilly", itemTitle: "Intro to Algorithms", daysLate: 16, fine: 8.0 },
  { memberId: "m-005", memberName: "Chen Wei", itemTitle: "Modern Art: A History", daysLate: 26, fine: 13.0 },
];