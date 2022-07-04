async function getResolvers(
  getOrderedCatalogFn,
  latestListFn,
  addItemToCatalogFn,
  getDocumentFn
) {
  const revolvers_impl = {
    Query: {
      catalog: async () => {
        return await getOrderedCatalogFn();
      },
      list: async () => {
        return await latestListFn();
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
    },
    List: {
      items: async ({ items }) => {
        const itemsToQuery = await items.map((el) =>
          getDocumentFn("catalog", el.item)
        );

        const result = await Promise.all(itemsToQuery);

        const mappedResults = items.map(({ item, quantityNeeded, unit }) => {
          const found = result.find((res) => res.id === item);

          return { item: { ...found }, quantityNeeded, unit };
        });

        return mappedResults;
      },
    },
  };

  return revolvers_impl;
}

module.exports = { getResolvers };
