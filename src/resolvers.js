const {
  getLatestList,
  getDocument,
  getOrderedCatalog,
  addItemToCatalog,
  addItemToCart,
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
    addItemToCart: async (_, { itemId }) => {
      try {
        const result = await addItemToCart(itemId);

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
  },
  List: {
    items: async ({ items }) => {
      const itemsToQuery = await items.map((el) =>
        getDocument("catalog", el.item)
      );

      const result = await Promise.all(itemsToQuery);

      const mappedResults = items.map(
        ({ item, quantityNeeded, unit, id, inCart }) => {
          const found = result.find((res) => res.id === item);
          return { id, item: found, quantityNeeded, unit, inCart };
        }
      );

      return mappedResults;
    },
  },
  AddItemToCartResponse: {
    item: async ({ item }) => {
      const catalogItem = await getDocument("catalog", item.item);
      return { ...item, item: catalogItem };
    },
  },
};

module.exports = resolvers;
