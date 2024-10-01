import fetch from "node-fetch";

export async function onBeforeRender(pageContext) {
  // The route parameter of `/star-wars/@movieId` is available at `pageContext.routeParams`
  const { id } = pageContext.routeParams;

  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  let product = await response.json();

  // Our render and hydrate functions we defined earlier pass `pageContext.pageProps` to
  // the root React component `Page`; this is where we define `pageProps`.
  const pageProps = { product };

  // Set meta tags dynamically using product information
  const documentProps = {
    title: product.title,
    description: product.description,
    metaTags: [
      { property: "og:title", content: product.title },
      { property: "og:description", content: product.description },
      { property: "og:image", content: product.image },
      { name: "description", content: product.description },
    ],
  };

  // We make `pageProps` available as `pageContext.pageProps`
  return {
    pageContext: {
      pageProps,
      documentProps,
    },
  };
}

// By default `pageContext` is available only on the server. But our hydrate function
// we defined earlier runs in the browser and needs `pageContext.pageProps`; we use
// `passToClient` to tell `vite-plugin-ssr` to serialize and make `pageContext.pageProps`
// available to the browser.
export const passToClient = ["pageProps"];
