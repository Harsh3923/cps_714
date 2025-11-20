import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import MemberTable from "./MemberTable";

test("pending row shows Approve and Reject and calls handlers", async () => {
  const user = userEvent.setup();
  const approve = vi.fn();
  const reject = vi.fn();
  const suspend = vi.fn();

  const pending = [
    { id: "m-1", name: "Alice", cardNumber: "C-1", status: "pending" },
  ];

  render(
    <MemberTable
      members={pending}
      approve={approve}
      reject={reject}
      suspend={suspend}
      showActions={true}
      tableType="pending"
    />
  );

  expect(screen.getByText("Alice")).toBeInTheDocument();
  const approveBtn = screen.getByText("Approve");
  const rejectBtn = screen.getByText("Reject");

  await user.click(approveBtn);
  expect(approve).toHaveBeenCalledWith("m-1");

  await user.click(rejectBtn);
  expect(reject).toHaveBeenCalledWith("m-1");
});

test("active row shows Suspend and calls handler", async () => {
  const user = userEvent.setup();
  const approve = vi.fn();
  const reject = vi.fn();
  const suspend = vi.fn();

  const active = [
    { id: "m-2", name: "Bob", cardNumber: "C-2", status: "active" },
  ];

  render(
    <MemberTable
      members={active}
      approve={approve}
      reject={reject}
      suspend={suspend}
      showActions={true}
      tableType="active"
    />
  );

  expect(screen.getByText("Bob")).toBeInTheDocument();
  const suspendBtn = screen.getByText("Suspend");
  await user.click(suspendBtn);
  expect(suspend).toHaveBeenCalledWith("m-2");
});