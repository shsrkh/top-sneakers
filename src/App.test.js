import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

const axios = require("axios").default;

function mockInitialRequests() {
  axios.get.mockImplementation((url) => {
    if (url.includes("/cart")) return Promise.resolve({ data: [] });
    if (url.includes("/favorites")) return Promise.resolve({ data: [] });
    if (url.includes("/sneakers"))
      return Promise.resolve({
        data: [{ id: 1, name: "Nike Air Max", imageURL: "/img/sneakers/1.jpeg", price: 120 }],
      });
    return Promise.resolve({ data: [] });
  });
}

test("renders catalog and opens cart", async () => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
  mockInitialRequests();

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // Wait for data to load (skeleton -> cards)
  await screen.findByText("Nike Air Max");

  fireEvent.click(screen.getByRole("button", { name: /open cart/i }));

  await waitFor(() => {
    const overlay = document.querySelector('[class*="overlayVisible"]');
    expect(overlay).toBeTruthy();
  });
});

