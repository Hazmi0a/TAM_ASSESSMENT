var MongoClient = require('mongodb').MongoClient;
var OID = require('mongodb').ObjectID;


const uri = "mongodb://sa:Password2021@localhost:27017/?authSource=admin";
const client = new MongoClient(uri);
const database = client.db("Application");
const dbo = database.collection("Phonebook");

const cont = { name: "abdullah", phoneNumbers: ["0506065978"]}

 const addContact = async (contact) => {
    try {
         await client.connect();
         
         const result = await dbo.insertOne(contact);
         console.log("Contact Added.. ");
         return result.insertedId.toString()
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

 const findByName = async (contactName) => {
    try {
        await client.connect();
        const query = {name: contactName}
        const options = {
            projection: { _id: 1, name: 1, phoneNumbers: 1 },
          };
        const contact = await dbo.findOne(query, options);
        return contact;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
};

const findById = async (id) => {
    try {
        await client.connect();
        const objId = new OID(id); 
        const query = {_id: objId}
        const options = {
            projection: { _id: 1, name: 1, phoneNumbers: 1 },
          };
        const contact = await dbo.findOne(query, options);
        return contact;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
};

// const main = async () => {
//     // await addContact(cont);
//     const arr = await listAll();
//     console.log(arr);
    
//     const contact = await findByName("abdullah");
//     console.log(contact);

//     const contact2 = await findById("61bbc0bd5ef3639ffe8e8b60");
//     console.log(contact2);
// }
// main();

module.exports = {listAll, findByName, findById, addContact};
// 