import mongoose from 'mongoose';
const { connect, connection } = mongoose;

console.log('[init] db');

connect('mongodb://localhost:27017/dport', {});

connection.on("error", (...args) => {
  console.error("[db] Connection Error: ", args);
});
connection.once("open", (...args) => {
  console.log("[db] Connected Successfully", args);
});
