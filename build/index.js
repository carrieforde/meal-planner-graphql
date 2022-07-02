"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
console.log(process.env);
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const mocks = {
    Query: () => ({
        shoppingList: [...new Array(6)]
    }),
    ListItem: () => ({
        item: () => ({
            itemName: 'carrot',
            category: 'PRODUCE',
            defaultUnit: null
        }),
        unit: () => null,
        quantityNeeded: () => 2,
        inCart: () => null
    }),
    InventoryItem: () => ({
        itemName: 'carrot',
        category: 'PRODUCE',
        defaultUnit: null
    })
};
const server = new apollo_server_1.ApolloServer({ typeDefs: schema_1.typeDefs, mocks });
server.listen().then(() => {
    console.log(`
        🚀 Server is running!
        🔊 Listening on port 4000
        📭 Query at https://studio.apollographql.com/dev
    `);
});
