const {
  getLatestList,
  getDocument,
  getOrderedCatalog,
  addItemToCatalog,
} = require("./service");

const resolvers = {
  Query: {
    catalog: async () => {
      return await getOrderedCatalog();
    },
    list: async () => {
      return await getLatestList();
    },
  },
  Mutation: {
    addCatalogItem: async (_, args) => {
      const { name, category, defaultUnit = null } = args.input;

      try {
        const catalogItem = await addItemToCatalog({
          name,
          category,
          defaultUnit,
        });

        return {
          code: 200,
          success: true,
          message: `${name} successfully added to catalog`,
          catalogItem,
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
        getDocument("catalog", el.item)
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

module.exports = resolvers;
