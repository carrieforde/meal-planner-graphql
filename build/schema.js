"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
    type Query {
        "Get items on the shopping list"
        shoppingList: [ListItem!]!
    }

    type ListItem {
        item: InventoryItem!
        unit: String
        quantityNeeded: Int!
        inCart: Boolean
    }

    type InventoryItem {
        itemName: String!
        category: String!
        defaultUnit: String
    }
`;
