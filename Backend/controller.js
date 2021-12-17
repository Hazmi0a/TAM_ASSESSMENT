
const db = require("./db");

class Controller {
    // getting all contacts
    async getContacts() {
        // return all contacts
        return await db.listAll();
    }

    // getting a single contact by name 
    async getContactByName(name) {
        return await db.findByName(name);
    }
     // getting a single contact by id
    async getContactById(id) {
        return await db.findById(id);
    }

    // creating a new contact
    async createContact(contact) {

        return await db.addContact(contact);
    }

}
module.exports = Controller;