import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MetricCard from "./MetricCard";

test("renders MetricCard label and value", () => {
  render(<MetricCard label="Total Members" value={42} color="green" />);
  expect(screen.getByText("Total Members")).toBeInTheDocument();
  expect(screen.getByText("42")).toBeInTheDocument();
});