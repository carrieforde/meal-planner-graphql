const { getCollection, getDocument } = require("./service");

const resolvers = {
  Query: {
    catalog: async () => {
      return await getCollection("catalog");
    },
  },
};

module.exports = resolvers;
