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
    addItemToList(input: AddListItem!): AddItemToListResponse
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

  type AddItemToListResponse {
    code: Int!
    success: Boolean!
    message: String!
    item: RawListItem
  }

  type RawListItem {
    itemId: ID!
    quantityNeeded: Int!
    unit: String
    inCart: Boolean
  }

  input AddListItem {
    itemId: ID!
    quantityNeeded: Int!
    unit: String
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
    id: ID!
    catalogId: ID!
    name: String!
    category: String!
    defaultUnit: String
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
