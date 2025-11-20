import React from "react";
import { render, screen } from "@testing-library/react";
import StaffAdminDashboard from "./StaffAdminDashboard.jsx";
import { mockMembers, mockCheckouts } from "./lib/mocks.js";
import { computeMetrics } from "./lib/metrics.js";

test("renders dashboard, metrics and checked-out items (smoke)", () => {
  render(<StaffAdminDashboard />);

  const metrics = computeMetrics(mockMembers, mockCheckouts);


  expect(screen.getByText("LibraLITE - Staff Administration Dashboard")).toBeInTheDocument();


  expect(screen.getByText(String(metrics.totalMembers))).toBeInTheDocument();


  expect(screen.getByText("Member Management")).toBeInTheDocument();

  expect(screen.getByText("Checked-out Items")).toBeInTheDocument();
  const matches = screen.getAllByText(mockCheckouts[0].itemTitle);
  expect(matches.length).toBeGreaterThan(0);


});