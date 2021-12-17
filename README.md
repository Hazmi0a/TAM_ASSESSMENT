# TAM_ASSESSMENT
This is the required assessment by tam

## Installation
first make sure you have the leastest docker version. 

To run the application (database, backend, and web ui)

```bash
docker compose up
```
## Usage
Once everything is installed and up and running, open the following url in the browser: 

```bash
http://localhost:8080/
```

## Api (backend)
the following are the list of avilable apis: 
1 - GET all: 
```bash
http://localhost:3030/api/contacts
```
2- GET by name: 
```bash
http://localhost:3030/api/contact/:name
```

3- GET by id: 
```bash
http://localhost:3030/api/contact/:id
```
4- POST contact: 
```bash
http://localhost:3030/api/contacts
```
the body of the request is like: 
```javascript
{
    name: "contact Name",
    phoneNumbers: ["0555500555"] 
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)