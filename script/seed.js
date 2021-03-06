'use strict';

const db = require('../server/db');
const {User, Item} = require('../server/db/models');

const {items} = require('../seed/items');
const {users} = require('../seed/users.json');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  await Promise.all(
    users.map(async user => {
      await User.create(user);
    })
  );

  await Promise.all(
    items.map(async element => {
      await Item.create(element);
    })
  );

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
    console.log('finished seed');
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
  console.log('I ran the seed');
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
