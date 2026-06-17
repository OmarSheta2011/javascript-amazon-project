import formatCurrency from "../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("converts cents to dollars", () => {
    expect(formatCurrency(9025)).toEqual("90.25");
  });

  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("rounds to the nearst cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
