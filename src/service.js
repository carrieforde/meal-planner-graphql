const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

const collections = {
  CATALOG: "catalog",
  LISTS: "lists",
};

async function getCollection(collectionName) {
  const collection = await firestore.collection(collectionName).get();

  return collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getDocument(collectionName, documentName) {
  const document = await firestore
    .doc(`${collectionName}/${documentName}`)
    .get();
  return { id: document.id, ...document.data() };
}

async function getLatestList() {
  const collection = await firestore
    .collection(collections.LISTS)
    .orderBy("createdAt", "desc")
    .get();

  return collection.docs.map((doc) => ({ id: doc.id, ...doc.data() })).at(0);
}

async function getOrderedCatalog(field = "name", order = "asc") {
  const collection = await firestore
    .collection(collections.CATALOG)
    .orderBy(field, order)
    .get();

  return collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function addItemToCatalog(item) {
  const itemInCollection = await firestore
    .collection(collections.CATALOG)
    .where("name", "==", item.name)
    .get();

  const itemAlreadyInCatalog = !!itemInCollection.docs.find(
    (doc) => doc.data().name === item.name
  );

  if (itemAlreadyInCatalog) {
    throw new Error(`${item.name} already exists in catalog`);
  }

  const collection = await firestore.collection(collections.CATALOG).add(item);
  const document = await collection.get();

  return { id: document.id, ...document.data() };
}

module.exports = {
  getCollection,
  getDocument,
  getLatestList,
  getOrderedCatalog,
  addItemToCatalog,
};
