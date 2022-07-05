async function getResolvers(
  getLatestListFn,
  getDocumentFn,
  getOrderedCatalogFn,
  addItemToCatalogFn,
  addItemToCartFn,
  getListItemsFn,
  addItemToListFn
) {
  const revolvers_impl = {
    Query: {
      catalog: async () => {
        return await getOrderedCatalogFn();
      },
      list: async () => {
        return await getLatestListFn();
      },
    },
    Mutation: {
      addCatalogItem: async (_, args) => {
        const { name, category, defaultUnit = null } = args.input;

        try {
          const catalog = await addItemToCatalogFn({
            name,
            category,
            defaultUnit,
          });

          return {
            code: 200,
            success: true,
            message: `${name} successfully added to catalog`,
            catalog,
          };
        } catch (err) {
          return {
            code: 403,
            success: false,
            message: err.message,
            catalogItem: null,
          };
        }
      },
      addItemToCart: async (_, { itemId }) => {
        try {
          const result = await addItemToCartFn(itemId);
          console.log(result);

          return {
            code: 200,
            success: true,
            message: `Item successfully added to cart`,
            item: { ...result },
          };
        } catch (err) {
          return {
            code: 403,
            success: false,
            message: `Error occurred while adding item to cart`,
            item: null,
          };
        }
      },
      addItemToList: async (_, args) => {
        try {
          const result = await addItemToListFn(args.input);

          return {
            code: 200,
            success: true,
            message: `Item successfully added to list`,
            item: result,
          };
        } catch (err) {
          return {
            code: 403,
            success: false,
            message: err.message,
            item: null,
          };
        }
      },
    },
    List: {
      items: async ({ id }) => {
        const items = await getListItemsFn(id);

        const itemsToQuery = items.map((el) =>
          getDocumentFn("catalog", el.itemId)
        );

        const result = await Promise.all(itemsToQuery);

        const mappedResults = items.map(({ itemId, ...item }) => {
          const found = result.find((res) => res.id === itemId);
          return { catalogId: found.id, ...found, ...item };
        });

        return mappedResults;
      },
    },
    AddItemToCartResponse: {
      item: async ({ item }) => {
        const catalogItem = await getDocumentFn("catalog", item.itemId);
        return { catalogId: catalogItem.id, ...catalogItem, ...item };
      },
    },
  };

  return revolvers_impl;
}

module.exports = { getResolvers };
