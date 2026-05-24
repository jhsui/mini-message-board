#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
INSERT INTO messages (message, username, date) 
VALUES
    ($1, $2, $3),
    ($4, $5, $6)
    ;
`;

async function main() {
  console.log("seeding...");
  console.log("DATABASE_URL exists:", Boolean(process.env.DATABASE_PUBLIC_URL));
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });
  await client.connect();
  await client.query(SQL, [
    "Hi there2, Amando2!",
    "Amando",
    new Date(),
    "Hello World2, Charles2!",
    "Charles",
    new Date(),
  ]);
  await client.end();
  console.log("done");
}

main();
