# Einfache Demo-Applikation für NodeJS/Express
============================================

# Verzeichnisse & Dateien
-----------------------

* bin/www ... Starten des Webservers, Error-Handling
* public/ ... statische Inhalte, z.B. CSS und Browser-JavaScript
* routes/ ... Hier stehen die einzelnen Controller
    * index.js ... Erzeugt eine einfache Start-Seite
* src/ ... Datenmodell und Geschäftslogik
    * database.js ... Datenbank und Fixtures mit Beispiel-Daten
    * User.js ... Modell-Klasse
* views/ ... HTML-Templates, zum Erzeugen einfacher HTML-Seiten.
    * layout.hbs ... Basis-Template mit Rahmen-HTML
    * index.hbs ... Einfacher Inhalt für Standard-Seite
    * error.hbs ... Fehlerseite 
* app.js ... Definition & Setup der Express-Applikation
* package.json ... Welche Bibliotheken sonst eingebunden werden sollen

# Functions added in LV
## User.js
```
getAllUsers(request, response)
getSingleUser(request, response)
deleteSingleUser(request, response)
```
# How to access those functions / test them
The functions you added can easily be tested by hand. Just use a Google Chrome Plugin as 
## HTTP Methods
The following HTTP Methods can be tested
```
GET
DELETE
PUT
POST
PATCH
```
We have not discussed till 25.11.2017 the HTTP Methods-
```
PUT
POST
PATCH
```
### GET
* Browser
```
localhost:3000/users
```
* Commandline
```
curl localhost:3000/users/3
```
### DELETE
* Browser
You have to use a Plugin. Postman e.g. for chrome
```
localhost:3000/users
```
* Commandline
```
curl -XDELETE localhost:3000/users/3
```