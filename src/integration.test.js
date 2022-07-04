const { ApolloServer } = require("apollo-server-cloud-functions");

const typeDefs = require("./schema");
const { getResolvers } = require("./resolvers");
const {
  getOrderedCatalogMock,
  getLatestListMock,
  addItemToCatalogMock,
  getDocumentMock,
} = require("./service_mocks");

let server = null;

beforeAll(() => {
  const resolvers = getResolvers(
    getOrderedCatalogMock,
    getLatestListMock,
    addItemToCatalogMock,
    getDocumentMock
  ).then((resolvers) => {
    server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });
  });

  return resolvers;
});

it("fetches category list", async () => {
  // create a test server to test against, using our production typeDefs and resolvers
  const res = await server.executeOperation({
    query:
      "query TestQuery {\
              catalog {name, category, defaultUnit}\
            }",
    variables: {},
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toEqual({
    // data: {
    catalog: [
      { name: "avocado", category: "PRODUCE", defaultUnit: null },
      { name: "bacon", category: "MEAT", defaultUnit: "" },
    ],
  });
});

it("fetches shopping list", async () => {
  const res = await server.executeOperation({
    query:
      "query TestQuery {\
            list { \
              items {\
                item {\
                  name,\
                  category\
                }, \
                quantityNeeded, \
                unit\
              }, \
              createdAt, \
              updatedAt \
            }\
          }",
    variables: {},
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toEqual({
    list: {
      createdAt: "2022-07-02T03:53:56.122Z",
      items: [
        {
          item: {
            category: "PRODUCE",
            name: "carrot",
          },
          quantityNeeded: 10,
          unit: null,
        },
        {
          item: {
            category: "PRODUCE",
            name: "lemon",
          },
          quantityNeeded: 5,
          unit: null,
        },
        {
          item: {
            category: "BAKING_SUPPLIES",
            name: "flour",
          },
          quantityNeeded: 2,
          unit: "POUND",
        },
        {
          item: {
            category: "DAIRY",
            name: "blueberry cream cheese",
          },
          quantityNeeded: 2,
          unit: null,
        },
      ],
      updatedAt: "2022-07-02T03:42:46.214Z",
    },
  });
});

it("adds item to category list", async () => {
  // create a test server to test against, using our production typeDefs and resolvers
  const res = await server.executeOperation({
    query:
      "mutation addCatalogItem($item: CatalogInputItem!) {  addCatalogItem(input: $item) { \
        code\
        success,\
        message,\
        catalog {name, category, defaultUnit}, \
      }}",
    variables: {
      item: { name: "test_item", category: "test_category", defaultUnit: null },
    },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toEqual({
    addCatalogItem: {
      catalog: null,
      code: 200,
      message: "test_item successfully added to catalog",
      success: true,
    },
  });
});
