import { render, screen } from "@testing-library/react";
import * as navigation from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { Navbar } from "../landing/Navbar";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

// Mock the atoms to avoid rendering deep trees if necessary,
// or let them render if they are simple. Atoms are simple.
// But Navbar imports complex things like MegaPanel. We should probably mock them for this test
// if we want to isolate Navbar logic.
// However, I want to test integration.

describe("Navbar", () => {
  it("renders the branding", () => {
    vi.mocked(navigation.usePathname).mockReturnValue("/");
    render(<Navbar />);
    expect(screen.getByText("Lucideus")).toBeInTheDocument();
  });

  // Add more tests as I refactor
});
