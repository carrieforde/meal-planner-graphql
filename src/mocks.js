const mocks = {
  Query: () => ({
    catalog: [...new Array(5)],
  }),
  CatalogItem: () => ({
    name: () => "carrot",
    category: () => "PRODUCE",
    defaultUnit: () => null,
  }),
};

module.exports = mocks;
