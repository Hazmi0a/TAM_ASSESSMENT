#! /usr/bin/env node
const db = require("./db");
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});

let name = "";
let phonenumbers = []; 
let finished = false;

console.clear();

const askForNumber = async (answer) => {
    if (answer.toLowerCase() === "n") {
        contact = { name, phonenumbers }
        await db.addContact(contact)
        await main();
    }
    else if (answer.toLowerCase() == "y"){
        rl.question("Enter Phone Number: ", number => {
            if(!isInt(number)) {
            console.log("Please make sure the phone number consist of digits only");
            rl.question("Add more phone numbers? [y,N] ", askForNumber)
        } else {
            phonenumbers.push(number);
            rl.question("Add more phone numbers? [y,N] ", askForNumber)
        }
        })
    } else if (answer == "\n") {
        finished = true;
        rl.close();
    }
    
    else {
        console.log("Please make sure you choose either y or n");
        console.log(answer);
        rl.question("Add more phone numbers? [y,N] ", askForNumber)
    }
}

const choiceMade = async (choice) => {
    switch (choice) {
    case "1":
        name = "";
        phonenumbers = []; 
        rl.question('Contact Name: ', value => {
            name = value;
            rl.question('Contact Phone Number: ', number => {
                if(!isInt(number)) {
                    console.log("Please make sure the phone number consist of digits only");
                    rl.question('Contact Phone Number: ', askForNumber("y"));
                } else {
                    phonenumbers.push(number);
                    rl.question("Add more phone numbers? [y,N] ", askForNumber)
                }
                }
                )
        });
        break;
    case "2":
        await getAllContacts();
        main();
        break;

    default:
        rl.close();
        break;
    }
}
const options = ["1-Add New Contact", "2-Show All Contacts", "3-Show a Contact information"]


const main = async () => {
    // console.clear();
    console.log();
    console.log();
    console.log();
    console.log("PHONEBOOK");
    options.forEach(opt => {
        console.log(opt);
    });

    rl.question("Choose an action (i.e. 1, 2, 3): ", choiceMade);
}

main();

const getAllContacts = async () => {
    console.log("LIST OF ALL CONTACTS: ");
    const result = await db.listAll();
    result.forEach(contact => {
        console.log(contact);
    })
}

function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

  rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    console.log(`Contact Name: ${name}`);
    console.log(`Contact Phone Numbers: ${phonenumbers}`);
    process.exit(0);
});
// rl.on('line', askForNumber("n"));
//