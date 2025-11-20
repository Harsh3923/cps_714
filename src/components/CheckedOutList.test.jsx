import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckedOutList from "./CheckedOutList";

test("renders checked-out items with member names and dates", () => {
  const members = [
    { id: "m-1", name: "Liam O'Reilly", cardNumber: "C-1", status: "active" },
  ];
  const checkouts = [
    { memberId: "m-1", itemTitle: "Intro to Algorithms", checkedOutAt: new Date().toISOString() },
  ];

  render(<CheckedOutList checkouts={checkouts} members={members} />);

  expect(screen.getByText("Intro to Algorithms")).toBeInTheDocument();
  expect(screen.getByText("Liam O'Reilly")).toBeInTheDocument();
  // date displayed as locale string somewhere
  const dateStr = new Date(checkouts[0].checkedOutAt).toLocaleString();
  expect(screen.getByText(new RegExp(dateStr.replace(/\//g, "\\/").split(",")[0], "i"))).toBeTruthy();
});