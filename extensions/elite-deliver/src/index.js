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
	  
	if(input.cart.buyerIdentity?.customer.tagged == true ) {
		const bopisOption = input.cart.deliveryGroups
        .flatMap((group) => group.deliveryOptions)
        .find((option) => option.title === "Pickup In-Store");

		const standardOption = input.cart.deliveryGroups
        .flatMap((group) => group.deliveryOptions)
        .find((option) => option.title === "Standard");
		
		const expressOption = input.cart.deliveryGroups
        .flatMap((group) => group.deliveryOptions)
        .find((option) => option.title === "Express");


			return {
			  operations: [
				/** @type {Operation} */ ({
				  hide: {
					deliveryOptionHandle: bopisOption.handle,
				  },
				}),
				/** @type {Operation} */ ({
					hide: {
						deliveryOptionHandle: standardOption.handle,
					},
				}),
				/** @type {Operation} */ ({
					hide: {
						deliveryOptionHandle: expressOption.handle,
					},
				}),
			  ],
			};

	};

  };
