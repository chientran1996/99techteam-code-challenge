db = db.getSiblingDB(process.env.MONGO_DB_NAME || "solution5");

db.createCollection("resources");
db.resources.insertMany([
    { name: "Book", type: "document", createdAt: new Date() },
    { name: "Image", type: "media", createdAt: new Date() }
]);

// Index model
db.resources.createIndex({ name: 1 });
db.resources.createIndex({ type: 1 });
db.resources.createIndex({ name: 1, type: 1 });
db.resources.createIndex({ createdAt: -1 });