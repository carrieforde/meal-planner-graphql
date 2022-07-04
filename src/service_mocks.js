async function getCollectionMock(collectionName) {
  return [
    {
      id: "cVACp992BGJL3Pu5hNK7",
      name: "avocado",
      defaultUnit: null,
      category: "PRODUCE",
    },
    {
      id: "f0QbQE2UFnutNHJ29rbF",
      name: "bacon",
      category: "MEAT",
      defaultUnit: "",
    },
  ];
}

async function getDocumentMock(collectionName, documentName) {
  if (collectionName === "catalog") {
    switch (documentName) {
      case "3xlep01NAlqXN7hFvAAo":
        return {
          id: "3xlep01NAlqXN7hFvAAo",
          inCart: true,
          category: "PRODUCE",
          name: "carrot",
        };

      case "Z2WubDuyfZDxwngpmHCJ":
        return {
          id: "Z2WubDuyfZDxwngpmHCJ",
          category: "BAKING_SUPPLIES",
          name: "flour",
        };

      case "6mxM4E2iqgzni2EDGY4o":
        return {
          id: "6mxM4E2iqgzni2EDGY4o",
          name: "blueberry cream cheese",
          category: "DAIRY",
        };

      case "itIGvwLV0Jkk9jwUfF9h":
        return {
          id: "itIGvwLV0Jkk9jwUfF9h",
          name: "lemon",
          category: "PRODUCE",
        };
    }
  }
}

async function getLatestListMock() {
  return {
    id: "uM6OOuIVS02yBkZL7Wnr",
    createdAt: "2022-07-02T03:53:56.122Z",
    items: [
      { quantityNeeded: 10, item: "3xlep01NAlqXN7hFvAAo" },
      { item: "itIGvwLV0Jkk9jwUfF9h", quantityNeeded: 5 },
      { quantityNeeded: 2, item: "Z2WubDuyfZDxwngpmHCJ", unit: "POUND" },
      { quantityNeeded: 2, item: "6mxM4E2iqgzni2EDGY4o" },
    ],
    updatedAt: "2022-07-02T03:42:46.214Z",
  };
}

async function getOrderedCatalogMock(field = "name", order = "asc") {
  return [
    {
      id: "cVACp992BGJL3Pu5hNK7",
      name: "avocado",
      defaultUnit: null,
      category: "PRODUCE",
    },
    {
      id: "f0QbQE2UFnutNHJ29rbF",
      name: "bacon",
      category: "MEAT",
      defaultUnit: "",
    },
  ];
}

async function addItemToCatalogMock(item) {
  if (
    item === { name: "test_item", category: "test_category", defaultUnit: null }
  ) {
    return [
      {
        id: "rSlQIDB2CZzvz4Klamug",
        defaultUnit: "",
        name: "Parmesan cheese",
        category: "DAIRY",
      },
      {
        id: "cVACp992BGJL3Pu5hNK7",
        category: "PRODUCE",
        name: "avocado",
        defaultUnit: null,
      },
      {
        id: "f0QbQE2UFnutNHJ29rbF",
        category: "MEAT",
        defaultUnit: "",
        name: "bacon",
      },
      {
        id: "7ron8dYBgH6zjBuYOpeT",
        name: "baking powder",
        defaultUnit: "",
        category: "BAKING_SUPPLIES",
      },
      {
        id: "1cBER9Mj8fBKW8BGtews",
        category: "BAKING_SUPPLIES",
        defaultUnit: null,
        name: "baking soda",
      },
      {
        id: "q9Csu45w7Fyh5Cm0uMmT",
        category: "PRODUCE",
        defaultUnit: "",
        name: "banana",
      },
      {
        id: "f7dyjnjzWQ8Ux3FA5S5u",
        defaultUnit: null,
        category: "BEVERAGES",
        name: "berry LaCroix",
      },
      {
        id: "Lw3J99XpF3OOUsTJbnLh",
        defaultUnit: null,
        category: "PRODUCE",
        name: "blueberries",
      },
      {
        id: "1hBNvHktdcVrAZw1J10C",
        name: "blueberry bagels",
        category: "BAKED_GOODS",
        defaultUnit: "",
      },
      {
        id: "6mxM4E2iqgzni2EDGY4o",
        category: "DAIRY",
        name: "blueberry cream cheese",
      },
      { id: "3xlep01NAlqXN7hFvAAo", category: "PRODUCE", name: "carrot" },
      {
        id: "u5Vj7AdvP9PXvfoaWi2D",
        defaultUnit: null,
        name: "chicken breast",
        category: "MEAT",
      },
      {
        id: "EuBXMkEVVsY6MVcbr8jt",
        name: "chili poweder",
        defaultUnit: "",
        category: "SPICES",
      },
      {
        id: "AugbR128XIY95AI2Gxqp",
        category: "BAKING_SUPPLIES",
        name: "chocolate chips",
        defaultUnit: null,
      },
      {
        id: "Aoz1zxEsr2rpCGboTPGs",
        category: "SPICES",
        name: "cumin",
        defaultUnit: "",
      },
      {
        id: "Z2WubDuyfZDxwngpmHCJ",
        category: "BAKING_SUPPLIES",
        name: "flour",
      },
      {
        id: "53eOawTxFwPQshJskTPV",
        defaultUnit: "POUND",
        category: "MEAT",
        name: "ground beef",
      },
      { id: "itIGvwLV0Jkk9jwUfF9h", name: "lemon", category: "PRODUCE" },
      {
        id: "xFOR62w6IfBZY6LUBngo",
        name: "maple & brown sugar oatmeal",
        defaultUnit: "",
        category: "CEREAL",
      },
      {
        id: "Yu27O8MTACbPfBzMsIRs",
        defaultUnit: "GALLON",
        name: "milk",
        category: "DAIRY",
      },
      {
        id: "tuuRy5IUelqEQTbT2jXR",
        category: "CEREAL",
        name: "old fashioned rolled oats",
        defaultUnit: "",
      },
      {
        id: "5pOC0APbK403uutHvgap",
        defaultUnit: null,
        name: "pizza rolls",
        category: "FROZEN_FOODS",
      },
      {
        id: "gmNkPgPJEtJiWHMXVpu9",
        category: "SNACKS",
        name: "pretzels",
        defaultUnit: null,
      },
      {
        id: "ia7C2e22ENpLIW9NnpDu",
        defaultUnit: "",
        category: "BAKED_GOODS",
        name: "sourdough bread",
      },
      {
        id: "bVjnAMxfniankQFncjeb",
        category: "PRODUCE",
        name: "strawberries",
        defaultUnit: "",
      },
      {
        id: "skVss3H452VlHvv54WLD",
        category: "BAKING_SUPPLIES",
        name: "sugar",
        defaultUnit: null,
      },
      {
        id: "m0NpO4LzrpBiiBhiTs5g",
        defaultUnit: null,
        category: "test_category",
        name: "test_item",
      },
      {
        id: "7fYoYsm8ANhri7YsbAH0",
        category: "DAIRY",
        name: "unsalted butter",
        defaultUnit: null,
      },
      {
        id: "ThwgxB5sgGCExsV4RQtE",
        category: "BAKING_SUPPLIES",
        defaultUnit: null,
        name: "vanilla",
      },
    ];
  }
}

module.exports = {
  getCollectionMock,
  getOrderedCatalogMock,
  getLatestListMock,
  addItemToCatalogMock,
  getDocumentMock,
};
