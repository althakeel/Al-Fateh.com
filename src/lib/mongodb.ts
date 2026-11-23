
import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const databaseName =
  process.env.MONGODB_DB_NAME || "alfateh";

type MongoGlobal = typeof globalThis & {
  _alfatehMongoPromise?: Promise<MongoClient>;
};

const globalMongo = globalThis as MongoGlobal;

async function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI environment variable."
    );
  }

  if (!globalMongo._alfatehMongoPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10,
    });

    globalMongo._alfatehMongoPromise =
      client.connect().catch((error) => {
        globalMongo._alfatehMongoPromise = undefined;
        throw error;
      });
  }

  return globalMongo._alfatehMongoPromise;
}

export async function getMongoDb() {
  const client = await getClient();

  return client.db(databaseName);
}
