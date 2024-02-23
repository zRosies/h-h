import { MongoClient } from "mongodb";

export async function initDb() {
  const uri = process.env.URI;

  if (!uri) throw new Error("No URI found");
  try {
    const client = new MongoClient(uri);
    const connection = await client.connect();
    const data = connection.db("handcraft").collection("handcraft");

    return data;
  } catch (error) {
    throw new Error(`failed to stablishc connection to the DB`);
  }
}

export async function initClientDB() {
  const uri = process.env.URI;

  if (!uri) throw new Error("No URI found");
  try {
    const client = new MongoClient(uri);
    const connection = await client.connect();
    const data = connection.db("handcraft").collection("clients");

    return data;
  } catch (error) {
    throw new Error(`failed to stablishc connection to the DB`);
  }
}

export async function initPaymentDB() {
  const uri = process.env.URI;

  if (!uri) throw new Error("No URI found");
  try {
    const client = new MongoClient(uri);
    const connection = await client.connect();
    const data = connection.db("handcraft").collection("payment");

    return data;
  } catch (error) {
    throw new Error(`failed to stablishc connection to the DB`);
  }
}
