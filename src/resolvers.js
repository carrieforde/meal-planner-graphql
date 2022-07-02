const {
  getCollection,
  getLatestList,
  getDocument,
  getOrderedCatalog,
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
