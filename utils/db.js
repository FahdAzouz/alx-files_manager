import { MongoClient } from 'mongodb';
import { env } from 'process';
const DB_HOST = env.DB_HOST || 'localhost';
const DB_PORT = env.DB_PORT || 27017;
const DB_DATABASE = env.DB_DATABASE || 'files_manager';
class DBClient {
    constructor() {
        this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, { UseNewUrlParser: true, UseUnifiedTopology: true });
        this.client.connect().then(() => {
            this.db = this.client.db(DB_DATABASE);
        }).catch((err) => {
            console.log(err)
        });
    }

    isAlive() {
        if (this.client.isConnected()) {
            return true;
        } return false;
    }

    // Get the number of documents in the collection users
    async nbUsers() {
        return this.db.collection('users').countDocuments();
    }

    // Get the number of documents in the collection files
    async nbFiles() {
        return this.db.collection('files').countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = dbClient;