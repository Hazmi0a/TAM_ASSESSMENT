# TAM_ASSESSMENT

This is the required assessment by tam which is to Create a phonebook app without using any framework. stack used is:
Frontend: HTML, CSS, and Javascript
Backend: Javascript apis
Database: Mongo

## Bounes

after completing the assessment, i have decided to also include another application built with the following stack.
in this project i have used my experince in the below stacks plus ive reused components i have from other projects.

if you'd like to view the whole process of creating those please find the project link below. in this project also you will find full CI/CD pipline setup to be deployed to Microsoft Azure.

P.S.
update is not working currently due to time constraint..

Project link: https://dev.azure.com/alhazmiabdullah/Cmds
Frontend : React with Redux using Typescript
Backend: .NET, with authorization and authenication.
Database: Postgres

## Installation

first make sure you have the leastest docker version.

To run the application (database, backend, and web ui)

```bash
docker compose up
```

## Usage Main assessment

Once everything is installed and up and running, open the following url in the browser:

```bash
http://localhost:8080/
```

### Api (backend)

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

## Usage Main Bounes

### React Frontend using browser:

```bash
http://localhost:3000/
```

### .NET Api (backend)

please visit below url for api documentation using swagger

```bash
http://localhost:5001/swagger/index.html
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
