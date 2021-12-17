const http = require("http");
const PORT = process.env.PORT || 3000;
const Contact = require("./controller"); 
const { getReqData } = require("./utils");

const server = http.createServer(async (req, res) => {
    //set the request headers: 
   
    if (req.headers.origin != undefined) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
        var headers = {
                "Access-Control-Allow-Origin": req.headers.origin,
                "Access-Control-Allow-Methods":  "POST, GET, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Credentials": false,
                "Access-Control-Allow-Headers": "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
                "Access-Control-Max-Age": "86400"

            };
    }
    
    //set the request route
    // /api/contacts : GET
    if (req.url === "/api/contacts" && req.method === "GET") {
        // get the contacts.
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
        let data = await getReqData(req);
        console.log(`Add new contact: ${data}`);
        const contact_data = JSON.parse(data);
        if (contact_data.name.trim.length == 0) {
            res.writeHead(400, "empty name");
            res.end();
        }
        if (contact_data.phoneNumbers.length == 0) {
            res.writeHead(400, "empty phone");
            res.end();
        }
        // create the contact
        try {
            const newContactId = await new Contact().createContact(JSON.parse(contact_data));
            // set the status code and content-type
            res.writeHead(201, { "Content-Type": "application/json" });
            //send back contact
            const contact = await new Contact().getContactById(newContactId);
            res.end(JSON.stringify(contact));
        } catch (err) {
            console.error(err);
            res.writeHead(500);
            res.end();
        }
        
        
    }
    // OPTIONS
    else if (req.method === "OPTIONS") {
        console.log('!OPTIONS');
        res.writeHead(204, headers);
        res.end();
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
