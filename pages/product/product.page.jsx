export { Page };

function Page(pageProps) {
  const { product } = pageProps;

  const { title, price, description, category, image } = product;

  return (
    <>
      <h1>{title}</h1>
      <img
        style={{
          width: "100%",
          maxWidth: 400,
        }}
        src={image}
        alt={title}
      />
      <p>{description}</p>
      <p>Category: {category}</p>
      <p>Price: ${price}</p>
    </>
  );
}
