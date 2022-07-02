const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        "Get catalog items"
        catalog: [CatalogItem!]!
    }

    type CatalogItem {
        name: String!
        category: String!
        defaultUnit: String
    }
`

module.exports = typeDefs
