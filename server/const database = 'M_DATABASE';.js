const database = 'M_DATABASE';
const collection = 'M_COLLECTION';

// Connect to MongoDB.
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://samikshashinde142002:Dan09D12@cluster0.fa0zdry.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Import your data file.
const data = require('./');

// Function to insert data.
const insertData = async () => {
    try {
        await client.connect();
        const db = client.db(database);
        const result = await db.collection(collection).insertMany(data);
        console.log('Successfully inserted data with _ids:', result.insertedIds);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        await client.close();
    }
};

// Call the function to insert data.
insertData();
