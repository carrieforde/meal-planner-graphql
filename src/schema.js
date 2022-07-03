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
    addItemToCart(itemId: String!): AddItemToCartResponse!
  }

  type AddCatalogItemResponse {
    code: Int!
    success: Boolean!
    message: String!
    catalogItem: CatalogItem
  }

  type AddItemToCartResponse {
    code: Int!
    success: Boolean!
    message: String!
    item: ListItem
  }

  input CatalogInputItem {
    name: String!
    category: String!
    defaultUnit: String
  }

  type CatalogItem {
    id: ID!
    name: String!
    category: String!
    defaultUnit: String
  }

  type ListItem {
    item: CatalogItem!
    quantityNeeded: Int!
    unit: String
    inCart: Boolean
  }

  type List {
    items: [ListItem!]!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = typeDefs;
