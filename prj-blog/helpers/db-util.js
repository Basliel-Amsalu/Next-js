import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect("mongodb://0.0.0.0:27017/contact");
  return client;
}

export async function inserDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}
export async function getDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
