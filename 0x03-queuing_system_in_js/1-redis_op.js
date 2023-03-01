import redis, { createClient } from "redis";

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

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => console.log(reply));
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
