const url = "http://localhost:3000/api/"
var phoneNumberCount = 1;

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


const addNewContact = () => {
  var xhr = new XMLHttpRequest();
  // xhr.open("POST", url+"contacts");

  // xhr.setRequestHeader("Accept", "application/json");
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.setRequestHeader("Origin", null);

  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4) {
  //       console.log(xhr.status);
  //       console.log(xhr.responseText);
  //   }};

  // const form = document.getElementById('newContact');
  // const name = form.elements['name'].value;
  // const phone = form.elements['phone'].value;

  const name = document.getElementById("name").value
  const phone = document.getElementById("phone").value
  let phoneNumbers = [phone];
  for (let i = 2; i <= phoneNumberCount; i++) {
    let phoneValue = document.getElementById(`phone${i}`).value
    phoneNumbers.push(phoneValue)
    
  } 
  
  const data = {
    name: name,
    phoneNumbers: phoneNumbers
  }

  postData( url+"contacts", data)

  alert("data is sent");
}

const getAllContacts =   () => {
    // const contacts = await fetch(url+"contacts")
    // console.log("here");
    // console.log(`contacts: ${contacts}`);

  fetch(url+"contacts").then(
  res => {
    res.json().then(
      data => {
        console.log(data);
        if (data.length > 0) {

          var temp = "";
          data.forEach((itemData) => {
            console.log(itemData);
            temp += "<tr>";
            // temp += "<td>" + itemData._id + "</td>";
            temp += "<td>" + itemData.name + "</td>";
            temp += "<td>" + printPhoneNumbers(itemData.phoneNumbers)+"</td></tr>";
          });
          document.getElementById('data').innerHTML = temp;
        }
      }
    )
  }
)
} 


// little helper function to print numbers array
const printPhoneNumbers = (arr) => {
  temp=""
  if (arr.length > 1) {
      arr.forEach((phone, index)=> {
        if (index == arr.length -1) {
          temp+=phone
        } else {

          temp+=phone+", "
        }
      })
    return temp;
  } else {
    return arr[0];
  }
  }
  
  

document.getElementById("submit").addEventListener("click", function(event){
  event.preventDefault();
  addNewContact();
  location.reload();
});

getAllContacts();


const addAnotherField = () => {
  var temp = "";
  phoneNumberCount++
  temp += `<div class="input-box"><span class="details">Phone number ${phoneNumberCount}</span><input id="phone${phoneNumberCount}" type="text" placeholder="Enter Phone number" required></div>`
  document.getElementById('phonenumber').insertAdjacentHTML("afterEnd",temp);// temp;
}



