var getTrips = function () {
  fetch("https://hidden-badlands-98217.herokuapp.com/trips", {credentials: "include"}).then(function (response) {
    if (response.status == 401) { // Not logged in
      // TODO: show the login/register forms
      closeDataEntry();
      openForm();
      return;
    }
    if (response.status != 200) {
      //confusedMessageShow();
      return;
    }
    response.json().then(function (data) {
      console.log("data received from server:", data);

      //Set incremet to alternate color scheme
      var index = 1

      // loop over the data and display it immediately:
      data.forEach(function (trip, index) {
        // append each trip to a new element in the DOM
        var newDiv
        // li tag: contains everything about one trip
        if (index % 2 == 0) {
          newDiv = document.createElement("div")
          newDiv.classList.add("semitrans")
        } else {
          newDiv = document.createElement("div")
          newDiv.classList.add("white")
        }
        index++

        //Build Div Elements
        var newLocation = document.createElement("h1");
        newLocation.innerHTML = trip.location

        var newDate = document.createElement("h4")
        newDate.innerHTML = trip.date

        var newRating = document.createElement("h5")
        newRating.innerHTML = ("Rating: " + trip.rating)

        var newCost = document.createElement("h5")
        newCost.innerHTML = ("Cost: " + trip.cost)

        var newSummary = document.createElement("p")
        newSummary.innerHTML = trip.summary
        newSummary.className = "summary"

        var editButton = document.createElement("button")
        editButton.value = "Edit"
        editButton.innerHTML = "Edit"
        editButton.style.cssFloat = 'right'
        editButton.className = "button1"

        var deleteButton = document.createElement("button")
        deleteButton.value = "Delete"
        deleteButton.innerHTML = "Delete"
        deleteButton.style.cssFloat = 'right'
        deleteButton.className = "button1"

        openDataEntry();

        var tripList = document.querySelector("#trips")
        tripList.style.display = "block";
        newDiv.appendChild(newLocation)
        newDiv.appendChild(newDate)
        newDiv.appendChild(newRating)
        newDiv.appendChild(newCost)
        newDiv.appendChild(newSummary)
        newDiv.appendChild(editButton)
        newDiv.appendChild(deleteButton)
        tripList.insertBefore(newDiv, tripList.childNodes[2])

        // button tag: the delete button
        deleteButton.onclick = function () {
          console.log("delete clicked:", trip.tripid);

          if(confirm("Are you sure you want to delete " + trip.location +"?")) {
            fetch("https://hidden-badlands-98217.herokuapp.com/trips/" + trip.tripid, {
              // request parameters:
              method: "DELETE",
              credentials: "include"
            }).then(function (response) {
            // handle the response:
              console.log("Server responded!");
              while (tripList.childNodes.length > 2) {
                tripList.removeChild(tripList.lastChild);
              }
              getTrips()
            });  
          }

          
        };
        
        // Setup Edit Button
        editButton.onclick = function () {
          var editDiv = buildEdit(trip)
          newDiv.appendChild(editDiv)

          console.log("edit clicked:", trip.tripid);

          var locationField = document.querySelector("#lf2"+trip.tripid);
          var dateField = document.querySelector("#df2"+trip.tripid);
          var ratingField = document.querySelector("#rf2"+trip.tripid);
          var costField = document.querySelector("#cf2"+trip.tripid)
          var summaryField = document.querySelector("#sf2"+trip.tripid);
          
          var saveEditButton = document.querySelector("#seb" + trip.tripid)

          saveEditButton.onclick = function () {
            var newLocationValue = locationField.value;
            var newDateValue = dateField.value;
            var newRatingValue = ratingField.value;
            var newCostValue = costField.value;
            var newSummaryValue = summaryField.value;

            var bodyStr = "location=" + encodeURIComponent(newLocationValue) + "&date=" + encodeURIComponent(newDateValue) + "&rating=" + encodeURIComponent(newRatingValue) + "&cost=" + encodeURIComponent(newCostValue) + "&summary=" + encodeURIComponent(newSummaryValue) ;

            fetch("https://hidden-badlands-98217.herokuapp.com/trips/" + trip.tripid, {
              // request parameters:
              method: "PUT",
              body: bodyStr,
              credentials: 'include',
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(function (response) {
              // handle the response:
              console.log("Server responded!");
              editDiv.innerHTML=""
              while (tripList.childNodes.length > 2) {
                tripList.removeChild(tripList.lastChild);
              }
              getTrips();
            });  
          };  
        };
      });
    });
  });
};

var locationField = document.querySelector("#location-input");
var dateField = document.querySelector("#date-input");
var ratingField = document.querySelector("#rating-input");
var costField = document.querySelector("#cost-input")
var summaryField = document.querySelector("#summary-input");
var saveButton = document.querySelector("#save");

saveButton.onclick = function () {
  var newLocationValue = locationField.value;
  var newDateValue = dateField.value;
  var newRatingValue = ratingField.value;
  var newCostValue = costField.value;
  var newSummaryValue = summaryField.value;

  var bodyStr = "location=" + encodeURIComponent(newLocationValue) + "&date=" + encodeURIComponent(newDateValue) + "&rating=" + encodeURIComponent(newRatingValue) + "&cost=" + encodeURIComponent(newCostValue) + "&summary=" + encodeURIComponent(newSummaryValue) ;

  fetch("https://hidden-badlands-98217.herokuapp.com/trips", {
    // request parameters:
    method: "POST",
    body: bodyStr,
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    // handle the response:
    console.log("Server responded!");
    locationField.value=''
    dateField.value=''
    ratingField.value=''
    costField.value=''
    summaryField.value=''
    saveButton.value=''
    // while (tripList.childNodes.length > 2) {
    //   tripList.removeChild(tripList.lastChild);
    // }
    getTrips();
  });
};

function buildEdit (trip) {
  var newDiv = document.createElement("div")
  var location = document.createTextNode("Location:")
  var locationField = document.createElement("INPUT")
  locationField.id="lf2"+trip.tripid
  locationField.type="text"
  locationField.value=trip.location
  var date = document.createTextNode("Date:")
  var dateField = document.createElement("INPUT")
  dateField.id="df2"+trip.tripid
  dateField.type="text"
  dateField.value=trip.date
  var rating = document.createTextNode("Rating:")
  var ratingField = document.createElement("INPUT")
  ratingField.id="rf2"+trip.tripid
  ratingField.type="text"
  ratingField.value=trip.rating
  var cost = document.createTextNode("Cost:")
  var costField = document.createElement("INPUT")
  costField.id="cf2"+trip.tripid
  costField.type="text"
  costField.value=trip.cost
  var summary = document.createTextNode("Summary:")
  var summaryField = document.createElement("textarea")
  summaryField.id="sf2"+trip.tripid
  summaryField.rows="4"
  summaryField.cols="50"
  summaryField.value=trip.summary
  var saveEditButton = document.createElement("button")
  saveEditButton.id=("seb" + trip.tripid)
  saveEditButton.className="button1"
  saveEditButton.innerHTML="Save"

  newDiv.appendChild(location)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(locationField)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(date)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(dateField)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(rating)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(ratingField)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(cost)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(costField)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(summary)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(summaryField)
  newDiv.appendChild(document.createElement("br"))
  newDiv.appendChild(saveEditButton)
  return newDiv
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openForm2() {
  document.getElementById("myForm2").style.display = "block";
}

function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}

function openDataEntry() {
  document.getElementById("newTrip").style.display = "block";
  document.getElementById("trips").style.display = "block";
}

function closeDataEntry() {
  document.getElementById("newTrip").style.display = "none";
}

var loginSubmit = document.querySelector("#login_submit")
var loginRegister = document.querySelector("#login_register")

loginRegister.onclick = function () { 
  closeForm();
  openForm2();
}

loginSubmit.onclick = function () {
  loginUser();
}

// login a single user
var loginUser = function () {
  var loginEmailField = document.querySelector("#login_email");
  var loginPasswordField = document.querySelector("#login_password");

  var data = "email=" + encodeURIComponent(loginEmailField.value);
  data += "&password=" + encodeURIComponent(loginPasswordField.value);
  console.log(data);

  fetch(`https://hidden-badlands-98217.herokuapp.com/sessions`, {
    method: 'POST',
    credentials: 'include',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
      if (response.status == 401 || data == "") { // Not logged in
          alert("Invalid Login Please Try again.")
          openForm()
          return;
      }
      if (response.status != 201) {
          alert("Something unexpected has happened please try again or notifiy the administrator.")
          return;
      }
      console.log("user logged in.")
      //loginSuccessShow();
      closeForm();
      getTrips();
  });
};

var registerSubmit = document.querySelector("#register_register")

registerSubmit.onclick = function () {
  createUser();
}

// create a user
var createUser = function() {
  var registerfNameField = document.querySelector("#register_fname");
  var registerlNameField = document.querySelector("#register_lname");
  var registerEmailField = document.querySelector("#register_email");
  var registerPasswordField = document.querySelector("#register_password");

  var data = "fname=" + encodeURIComponent(registerfNameField.value);
  data += "&lname=" + encodeURIComponent(registerlNameField.value);
  data += "&email=" + encodeURIComponent(registerEmailField.value);
  data += "&password=" + encodeURIComponent(registerPasswordField.value);

  fetch("https://hidden-badlands-98217.herokuapp.com/users", {
      method: 'POST',
      credentials: 'include',
      body: data,
      headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
  }).then(function (response) {
      if (response.status == 401) { // Not logged in
          // TODO: show the login/register forms
          openForm();
          return;
      }
      else if (response.status == 422) {
          alert("Email already in Use. Please enter another.")
          return;
      }
      else if (response.status != 201) {
          alert("Something unexpected has happened please try again or notifiy the administrator.")
          return;
      }
      else {
        console.log("user created.");
        closeForm2();
        openForm();
      }
  });
};

getTrips();