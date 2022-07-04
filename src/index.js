require("dotenv").config();
const { ApolloServer } = require("apollo-server-cloud-functions");
const typeDefs = require("./schema");
const { getResolvers } = require("./resolvers");
const {
  getLatestList,
  getDocument,
  getOrderedCatalog,
  addItemToCatalog,
} = require("./service");
const mocks = require("./mocks");

const resolvers = await getResolvers(
  getOrderedCatalog,
  getLatestList,
  addItemToCatalog,
  getDocument
);

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

// server.listen().then(() => {
//   console.log(`
//         🚀 Server is running!
//         🔊 Listening on port 4000
//         📭 Query at https://studio.apollographql.com/dev
//     `);
// });

exports.handler = server.createHandler();
