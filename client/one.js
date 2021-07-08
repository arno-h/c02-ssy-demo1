const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

async function main() {
    const resp = await axios.post('http://localhost:3000/auth/login',
        {
            username: "sleipnir@example.com",
            password: "password123"
        }
    );

    const token = resp.data.token;

    const resp2 = await axios.get('http://localhost:3000/users/', {
        headers: {
            Authorization: "Token " + token
        }
    });

    console.log(resp2.data);
}

main().then();