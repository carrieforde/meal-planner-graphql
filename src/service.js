const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

async function getCollection(collectionName) {
  const collection = await firestore.collection(collectionName).get();

  return collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getDocument(collectionName, documentName) {
  const document = await firestore
    .doc(`${collectionName}/${documentName}`)
    .get();
  return document.data();
}

module.exports = {
  getCollection,
  getDocument,
};
