// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";
import isEven from "is-even";

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 * @typedef {import("../generated/api").Target} Target
 */

/**
 * @type {FunctionResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  // Merchant configuration for your function can be stored on discount metafields
  /**
   * @type {{
   *    percentage: number,
   * }}
   */
  const configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? "{}"
  );

  /** @type {Target[]} */
  const targets = input.cart.lines
    // only cart lines with an even quantity
    .filter((line) => isEven(line.quantity))
    // you need a variant id for a product discount
    .filter((line) => line.merchandise.__typename == "ProductVariant")
    .map((line) => /** @type {ProductVariant} */ (line.merchandise))
    .map((variant) => {
      return {
        productVariant: {
          id: variant.id,
        },
      };
    });

  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        targets,
        value: {
          percentage: {
            value: configuration.percentage,
          },
        },
      },
    ],
  };
};
