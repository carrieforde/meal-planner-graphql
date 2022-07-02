const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Get catalog items"
    catalog: [CatalogItem!]!

    "Get a list of shopping items"
    list: List!
  }

  type CatalogItem {
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
