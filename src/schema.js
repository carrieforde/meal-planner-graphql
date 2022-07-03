const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Get catalog items"
    catalog: [CatalogItem!]!

    "Get a list of shopping items"
    list: List!
  }

  type Mutation {
    addCatalogItem(input: CatalogInputItem!): AddCatalogItemResponse!
  }

  type AddCatalogItemResponse {
    code: Int!
    success: Boolean!
    message: String!
    catalogItem: CatalogItem
  }

  input CatalogInputItem {
    name: String!
    category: String!
    defaultUnit: String
  }

  type CatalogItem {
    id: String!
    name: String!
    category: String!
    defaultUnit: String
  }

  type ListItem {
    item: CatalogItem!
    quantityNeeded: Int!
    unit: String
  }

  type List {
    items: [ListItem!]!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = typeDefs;
