const Axios = require('axios');

async function client() {
    const response = await Axios.get('http://localhost:3000/users/2');
    console.log(response.status);
    console.log(response.data);
}

client().then(erfolgreich).catch(fehler);

function erfolgreich() {
    console.log("Request erfolgreich");
}

function fehler(exception) {
    console.log("Fehler!");
    console.log(exception);
}