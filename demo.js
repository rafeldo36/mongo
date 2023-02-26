const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://rafeldo:Noori36@cluster0.8owbtck.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    // await createListing(client, {
    //     name: "Mustafa",
    //     age: 5
    // })

    await createMultipleListings(client, [
      {
        name: "Finaz",
        age: 30,
      },
      {
        name: "Fuzail",
        age: 27,
      },
    ]);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createMultipleListings(client, newListings) {
  const result = await client
    .db("College")
    .collection("Users")
    .insertMany(newListings);
  console.log(`${result.insertedCount} New listing created with the following id(s):`);
  console.log(result.insertedIds);
}

async function createListing(client, newListing) {
  const result = await client
    .db("College")
    .collection("Users")
    .insertOne(newListing);

  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
