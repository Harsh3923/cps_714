import React from "react";
import { render, screen } from "@testing-library/react";
import StatusPieChart from "./StatusPieChart.jsx";

test("displays counts and percentages for members and checkouts", () => {
  render(
    <StatusPieChart
      counts={{ active: 2, suspended: 1, rejected: 1, pending: 0 }}
      checkoutsCount={3}
      overdueCount={1}
    />
  );

  // members
  expect(screen.getByText(/Active — 2/)).toBeInTheDocument();
  expect(screen.getByText(/Suspended — 1/)).toBeInTheDocument();
  expect(screen.getByText(/Rejected — 1/)).toBeInTheDocument();

  // percentages: 2/4 => 50%
  expect(screen.getByText(/\(50%/)).toBeInTheDocument();

  // checkouts
  expect(screen.getByText(/Overdue — 1/)).toBeInTheDocument();
  expect(screen.getByText(/Not overdue — 2/)).toBeInTheDocument();
});