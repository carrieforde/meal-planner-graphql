const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

const collections = {
  CATALOG: "catalog",
  LISTS: "lists",
  ITEMS: "items",
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

async function getListItems(listId) {
  const collection = await firestore
    .doc(`${collections.LISTS}/${listId}`)
    .collection(collections.ITEMS)
    .get();

  return collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function addItemToCart(itemId) {
  const list = await getLatestList();
  const path = `${collections.LISTS}/${list.id}/${collections.ITEMS}/${itemId}`;

  await firestore.doc(path).update({ inCart: true });

  const document = await firestore.doc(path).get();

  return { id: document.id, ...document.data() };
}

async function addItemToList({ itemId, quantityNeeded, unit = null }) {
  const list = await getLatestList();

  const itemInCollection = await firestore
    .collection(`${collections.LISTS}/${list.id}/${collections.ITEMS}`)
    .get();

  const itemAlreadyOnList = itemInCollection.docs.some(
    (doc) => doc.data().itemId === itemId
  );

  if (itemAlreadyOnList) {
    const item = await getDocument(collections.CATALOG, itemId);
    throw new Error(`${item.name} already on list`);
  }

  const collection = await firestore
    .doc(`${collections.LISTS}/${list.id}`)
    .collection(collections.ITEMS)
    .add({ itemId, quantityNeeded, unit });

  const document = await firestore.doc(collection.path).get();

  return { id: document.id, ...document.data() };
}

module.exports = {
  getCollection,
  getDocument,
  getLatestList,
  getOrderedCatalog,
  addItemToCatalog,
  addItemToCart,
  getListItems,
  addItemToList,
};
