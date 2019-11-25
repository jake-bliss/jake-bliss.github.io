# Resource Name
* travel.db
* Table Name: trips
* Table Name: users

# Schema
* Trips:
* CEATE TABLE trips(
* tripid INTEGER PRIMARY KEY,
* location TEXT,
* date TEXT,
* rating TEXT,
* summary TEXT, 
* cost TEXT);

* Users:
* CREATE TABLE users (
* userid INTEGER PRIMARY KEY,
* first_name TEXT NOT NULL,
* last_name TEXT NOT NULL,
* email TEXT NOT NULL UNIQUE,
* enc_pwd TEXT NOT NULL UNIQUE
* );

# Endpoints

### OPTIONS:

### GET:
* path ("http://localhost:8080/trips"):
* path("http://localhost:8080/trips/id"):

### POST:
* path("http://localhost:8080/trips"):
* path("http://localhost:8080/users"):
* path("http://localhost:8080/sessions"):

### PUT:
* path("http://localhost:8080/trips/id"):

### DELETE:
* path("http://localhost:8080/trips/id"):


### Password Hashing
* Using bcrypt with default settings.
