const mocks = {
  Query: () => ({
    catalog: [...new Array(5)],
  }),
  CatalogItem: () => ({
    name: () => "carrot",
    category: () => "PRODUCE",
    defaultUnit: () => null,
  }),
  ListItem: () => ({
    item: () => ({
      name: "carrot",
      category: "PRODUCE",
      defaultUnit: null,
    }),
    quantityNeeded: () => 2,
    unit: () => null,
  }),
  List: () => ({
    items: () => [
      {
        item: {
          name: "carrot",
          category: "PRODUCE",
          defaultUnit: null,
        },
        quantityNeeded: 2,
        unit: null,
      },
      {
        item: {
          name: "lemon",
          category: "PRODUCE",
          defaultUnit: null,
        },
        quantityNeeded: 23,
        unit: null,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
};

module.exports = mocks;
