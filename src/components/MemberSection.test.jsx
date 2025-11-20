import React from "react";
import { render, screen } from "@testing-library/react";
import MemberSection from "./MemberSection.jsx";

const pending = [
  { id: "t-1", name: "Test User", email: "t@example.com", cardNumber: "C-1", status: "pending", createdAt: new Date().toISOString() },
];

test("shows pending applications with approve/reject buttons", () => {
  render(<MemberSection members={pending} approve={() => {}} reject={() => {}} suspend={() => {}} />);

  expect(screen.getByText(/Pending Applications/)).toBeInTheDocument();
  expect(screen.getByText("Test User")).toBeInTheDocument();
  expect(screen.getByText("Approve")).toBeInTheDocument();
  expect(screen.getByText("Reject")).toBeInTheDocument();
});