import redis, { createClient } from "redis";
import { promisify } from "util";

const client = createClient();

client.on("connect", function () {
  console.log("Redis client connected to the server");
});

client.on("error", (err) =>
  console.log("Redis client not connected to the server: ERROR_MESSAGE", err)
);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

const get = promisify(client.get).bind(client);

async function displaySchoolValue(schoolName) {
  const response = await get(schoolName).catch((err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
  console.log(response);
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
