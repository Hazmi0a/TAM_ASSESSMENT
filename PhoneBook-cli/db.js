var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://sa:Password2021@localhost:27017/?authSource=admin";
const client = new MongoClient(uri);
const database = client.db("Application");
const dbo = database.collection("Phonebook");

const cont = { name: "abdullah", phoneNumbers: ["0506065978"]}

 const addNewContact = async (contact) => {
    try {
         await client.connect();
         
         await dbo.insertOne(contact);
         console.log("Contact Added.. ");
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

 const listAll = async () => {
    try {
        await client.connect();
        const result = dbo.find({});
        return await result.toArray();
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
};

 const find = async (contactName) => {
    try {
        await client.connect();
        const query = {name: contactName}
        const options = {
            // Include only the `title` and `imdb` fields in the returned document
            projection: { _id: 0, name: 1, phoneNumbers: 1 },
          };
        const contact = await dbo.findOne(query, options);
        return contact;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
};

// addNewContact(cont);
const main = async () => {
    await addNewContact(cont);
    const arr = await listAll();
    console.log(arr);
    
    const contact = await find("abdullah");
    console.log(contact);
}
main();

// 