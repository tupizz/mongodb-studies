/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const { MongoClient } = require('mongodb');
const data = require('./data.json');

/**
 * Initial config properties
 */
const config = {
  CONNECTION_URL: 'mongodb://localhost:27017',
  DB_NAME: 'training',
  COLLECTION_NAME: 'people',
  CAN_DROP_ALL_DATA: true,
};

async function run() {
  const dbClient = await MongoClient.connect(config.CONNECTION_URL, {
    useNewUrlParser: true,
  });

  const collection = dbClient.db(config.DB_NAME).collection(config.COLLECTION_NAME);
  if (config.CAN_DROP_ALL_DATA) {
    await collection.deleteMany();
  }

  for (const item of data) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const inserted = await collection.insertOne(item);
      console.log('[ OK ] Inserção de registro', inserted.insertedId);
    } catch (error) {
      console.log('[ ERRO ] Inserção de registro');
    }
  }

  process.exit(0);
}

run();
