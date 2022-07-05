const {
  getLatestList,
  getDocument,
  getOrderedCatalog,
  addItemToCatalog,
  addItemToCart,
  getListItems,
  addItemToList,
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
        const result = await addItemToList(args.input);

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
      const items = await getListItems(id);

      const itemsToQuery = items.map((el) => getDocument("catalog", el.itemId));

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
      const catalogItem = await getDocument("catalog", item.itemId);
      return { catalogId: catalogItem.id, ...catalogItem, ...item };
    },
  },
};

module.exports = resolvers;
