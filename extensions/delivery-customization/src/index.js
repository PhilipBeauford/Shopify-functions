// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").Operation} Operation
*/

// The @shopify/shopify_function package will use the default export as your function entrypoint
export default 
/**
* @param {InputQuery} input
* @returns {FunctionResult}
*/
  (input) => {
    // The message to be added to the delivery option
    const message = "May be delayed due to weather conditions";

    let toRename = input.cart.deliveryGroups
      // Filter for delivery groups with a shipping address containing the affected state or province
      .filter(group => group.deliveryAddress?.provinceCode &&
        group.deliveryAddress.provinceCode == "NC")
      // Collect the delivery options from these groups
      .flatMap(group => group.deliveryOptions)
      // Construct a rename operation for each, adding the message to the option title
      .map(option => /** @type {Operation} */({
        rename: {
          deliveryOptionHandle: option.handle,
          title: option.title ? `${option.title} - ${message}` : message
        }
      }));

    // The @shopify/shopify_function package applies JSON.stringify() to your function result
    // and writes it to STDOUT
    return {
      operations: toRename
    };
  };
