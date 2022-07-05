require("dotenv").config();

googleCloud = process.env.MENU_PLANNER_GOOGLE_CLOUD == "TRUE" ? true : false;

function getServerDeps() {
  if (googleCloud) {
    return require("./index_cloud");
  } else {
    return require("./index_local");
  }
}

const { startService } = getServerDeps();

const typeDefs = require("./schema");
const { getResolvers } = require("./resolvers");
const {
  getLatestList,
  getDocument,
  getOrderedCatalog,
  addItemToCatalog,
} = require("./service");
const mocks = require("./mocks");
const { servicesVersion } = require("typescript");

async function startApolloService(typeDefs) {
  const resolvers = await getResolvers(
    getOrderedCatalog,
    getLatestList,
    addItemToCatalog,
    getDocument
  );

  return startService(typeDefs, resolvers);
}

const server = startApolloService(typeDefs);

if (googleCloud) {
  exports.handler = server.createHandler();
} else {
  server.then(() => {
    console.log(`
        🚀 Server is running!
        🔊 Listening on port 4000
        📭 Query at https://studio.apollographql.com/dev
    `);
  });
}
