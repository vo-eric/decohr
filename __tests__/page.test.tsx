import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SplashPage from "../src/components/ui/splash-page";
import { ImageRatingPage } from "../src/components/ImageRatingPage";

// Mock tRPC
vi.mock("~/app/_trpc/client", () => ({
  trpc: {
    users: {
      getUser: {
        useQuery: () => ({
          data: { id: "1", name: "Test User" },
          isLoading: false,
        }),
      },
      updateUserLikes: {
        useMutation: () => ({
          mutate: vi.fn(),
        }),
      },
    },
    images: {
      getImages: {
        useQuery: () => ({
          data: [
            {
              id: "1",
              imageUrl:
                "https://decohr.s3.us-east-2.amazonaws.com/pexels-emrecan-2079246.webp",
              styles: [{ style: "modern" }],
            },
            {
              id: "2",
              imageUrl:
                "https://decohr.s3.us-east-2.amazonaws.com/Natural-Lighting-and-Soft-Ambiance.webp",
              styles: [{ style: "modern" }],
            },
          ],
          isPending: false,
        }),
      },
    },
    likes: {
      recordImageResponse: {
        useMutation: () => ({
          mutate: vi.fn(),
        }),
      },
    },
  },
}));

test("Splash Page", () => {
  render(<SplashPage />);
  expect(screen.getByText("decohr")).toBeDefined();
});

describe("Image Rating Page", () => {
  describe("A user is logged in", () => {
    render(<ImageRatingPage userId="1" />);

    test("Image is displayed", () => {
      const image = screen.getByRole("img");
      expect(image).toBeDefined();
    });

    test("Buttons are displayed", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });

    test("A user can like an image", () => {
      const likeButton = screen.getByRole("button", { name: "Like" });
      fireEvent.click(likeButton);
      const image = screen.getByRole("img");
      expect(image.getAttribute("src")).toContain("pexels-emrecan-2079246");
    });

    test("A user can dislike an image", () => {
      const dislike = screen.getByRole("button", { name: "Dislike" });
      fireEvent.click(dislike);
      const image = screen.getByRole("img");
      expect(image.getAttribute("src")).toContain("pexels-emrecan-2079246");
    });
  });
});
