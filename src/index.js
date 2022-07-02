require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mocks = require("./mocks");

const server = new ApolloServer({
  typeDefs,
  // mocks,
  // mockEntireSchema: false,
  resolvers,
});

server.listen().then(() => {
  console.log(`
        🚀 Server is running!
        🔊 Listening on port 4000
        📭 Query at https://studio.apollographql.com/dev
    `);
});
