import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopularItemsCard from "./PopularItemsCard";

test("renders popular items list with counts", () => {
  const items = [
    { title: "Book A", count: 3 },
    { title: "Book B", count: 1 },
  ];
  render(<PopularItemsCard items={items} />);

  const bookAItem = screen.getByText("Book A").closest("li");
  expect(bookAItem).toBeInTheDocument();
  expect(within(bookAItem).getByText(/Taken out\s*3/)).toBeInTheDocument();

  const bookBItem = screen.getByText("Book B").closest("li");
  expect(bookBItem).toBeInTheDocument();
  expect(within(bookBItem).getByText(/Taken out\s*1/)).toBeInTheDocument();
});