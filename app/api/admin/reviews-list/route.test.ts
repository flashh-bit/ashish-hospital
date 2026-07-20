import { GET } from "./route";
import fs from "fs";
import { NextResponse } from "next/server";

jest.mock("fs");

describe("GET /api/admin/reviews-list", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return parsed JSON when file read is successful", async () => {
    const mockReviews = [
      { id: 1, name: "Alice", rating: 5, review: "Great hospital!" },
      { id: 2, name: "Bob", rating: 4, review: "Good experience." },
    ];
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockReviews));

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json).toEqual(mockReviews);
  });

  it("should return empty array when file read throws error (e.g. file not found)", async () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File not found");
    });

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json).toEqual([]);
  });

  it("should return empty array when file content is invalid JSON", async () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("invalid json content");

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json).toEqual([]);
  });
});
