const yesterday = new Date(Date.now() - 86400000);

const apiToLocalStorage = (key, apiKey) => {
  return new Promise(function (resolve) {
    let data = JSON.parse(localStorage.getItem(key));

    if (!data || data.time < yesterday) {
      setTimeout(() => {
        fetch(`/${apiKey}.js`)
          .then((r) => r.json())
          .then((r) => r.data)
          .then((r) => {
            localStorage.setItem(
              key,
              JSON.stringify({
                items: r,
                time: new Date(),
              })
            );
            resolve(r);
          });
      }, 1500);
    } else {
      resolve(data.items);
    }
  });
};

const fetchForProductsVisible = (products, productId, resolve) => {
  // fetch(`/api/products/${productId}`)
  //   .then((r) => r.json())
  //   .then((r) => r.data)
  //   .then((r) => {
  //     products.push(r);
  //     localStorage.setItem(
  //       "VisibleProductList",
  //       JSON.stringify({
  //         items: products,
  //         time: new Date(),
  //       })
  //     );
  //     return resolve(r);
  //   });
  setTimeout(() => {
    fetch(`/products.js`)
      .then((r) => r.json())
      .then((r) => r.data)
      .then((r) => {
        const product = r.find((product) => product.id === Number(productId));
        products.push(product);
        localStorage.setItem(
          "VisibleProductList",
          JSON.stringify({
            items: products,
            time: new Date(),
          })
        );
        return resolve(product);
      });
  }, 2000);
};

const apiToLocalStorageArrProducts = (productId) => {
  return new Promise(function (resolve) {
    let data = JSON.parse(localStorage.getItem("VisibleProductList"));
    let products = data ? data.items : [];

    if (!data || data.time < yesterday) {
      fetchForProductsVisible(products, productId, resolve);
    } else {
      const product = products.find((item) => item.id === Number(productId));

      if (product) {
        resolve(product);
      } else {
        fetchForProductsVisible(products, productId, resolve);
      }
    }
  });
};

export { apiToLocalStorage, apiToLocalStorageArrProducts };
