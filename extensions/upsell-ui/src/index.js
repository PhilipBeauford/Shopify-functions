import {
	extend,
	Text,
	InlineLayout,
	BlockStack,
	Divider,
	Image,
	Banner,
	Heading,
	Button,
	SkeletonImage,
	SkeletonText,
} from "@shopify/checkout-ui-extensions";

// Set up the entry point for the extension
extend("Checkout::Dynamic::Render", (root, { lines, applyCartLinesChange, query, i18n }) => {
	// App logic goes here
	extend(
		"Checkout::Dynamic::Render",
		(root, { lines, applyCartLinesChange, query, i18n }) => {
		  // Set up the states
		  let products = [];
		  let loading = true;
		  ...
		  // Use the `query` API method to send GraphQL queries to the Storefront API
		  query(
			`query ($first: Int!) {
			  products(first: $first) {
				nodes {
				  id
				  title
				  images(first:1){
					nodes {
					  url
					}
				  }
				  variants(first: 1) {
					nodes {
					  id
					  price {
						amount
					  }
					}
				  }
				}
			  }
			}`,
			{
			  variables: {first: 5},
			},
		  )
			.then(({data}) => {
			  // Set the product variants
			  products = data.products.nodes;
			})
			.catch((err) => console.error(err))
			.finally(() => {
			  loading = false;
			  // Call the `renderApp()` helper to filter, data-bind, and render the products on offer
			  renderApp();
			});
		  ...
		}
	  );
	  
  })