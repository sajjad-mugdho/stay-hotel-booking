import { describe, it, expect } from "vitest";

describe("Math functions", () => {
  it("should add two numbers correctly", () => {
    const sum = 1 + 2;
    expect(sum).toBe(3);
  });

  it("should subtract two numbers correctly", () => {
    const difference = 5 - 3;
    expect(difference).toBe(2);
  });

  it("should multiply two numbers correctly", () => {
    const product = 2 * 3;
    expect(product).toBe(6);
  });

  it("should divide two numbers correctly", () => {
    const quotient = 6 / 2;
    expect(quotient).toBe(3);
  });
});
