import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import OverdueSection from "./OverdueSection";

test("renders overdue rows and calls markResolved with correct args", async () => {
  const user = userEvent.setup();
  const markResolved = vi.fn();
  const overdue = [
    { memberId: "m-1", memberName: "Liam", itemTitle: "Intro to Algorithms", daysLate: 10, fine: 5.0 },
  ];

  render(<OverdueSection overdue={overdue} markResolved={markResolved} />);

  expect(screen.getByText("Intro to Algorithms")).toBeInTheDocument();
  const btn = screen.getByText("Mark Resolved");
  await user.click(btn);
  expect(markResolved).toHaveBeenCalledWith("m-1", "Intro to Algorithms");
});