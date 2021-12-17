const http = require("http");
const PORT = process.env.PORT || 3000;
const Contact = require("./controller"); 
const { getReqData } = require("./utils");

const server = http.createServer(async (req, res) => {
    //set the request route
    // /api/todos : GET
    if (req.url === "/api/contacts" && req.method === "GET") {
        // get the todos.
        const contacts = await new Contact().getContacts()
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(contacts));
    }
    // /api/contact/:name : GET
    else if (req.url.match(/\/api\/contact\/([-a-zA-Z]+)/) && req.method === "GET") {
        try {
            // get id from url
            const name = req.url.split("/")[3];
            // get contact name
            const contact = await new Contact().getContactByName(name);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(contact));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }
    // /api/contact/:id : GET
    else if (req.url.match(/\/api\/contact\/([a-f\d]{24}$)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            // get contact name
            const contact = await new Contact().getContactById(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(contact));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }
    // /api/contacts/ : POST
    else if (req.url === "/api/contacts" && req.method === "POST") {
        // get the data sent along
        let contact_data = await getReqData(req);
        // create the todo
        let todo = await new Contact().createContact(JSON.parse(contact_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the todo
        res.end(JSON.stringify(todo));
    }
    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
