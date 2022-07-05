require("dotenv").config();
const { ApolloServer } = require("apollo-server");

// const { verify } = require("./auth");

async function startService(resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req }) => {
      // // Get the user token from the headers.
      // const token = req.headers.authorization || "";
      // // Try to retrieve a user with the token
      // const user = verify(token);
      // // optionally block the user
      // // we could also check user roles/permissions here
      // if (!user) {
      //   throw new AuthenticationError("you must be logged in");
      // }
      // // Add the user to the context
      // return { user };
    },
  });

  await server.listen();

  return server;
}

module.exports = { startService };
