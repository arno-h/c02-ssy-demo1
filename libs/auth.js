const crypto = require('crypto');

// should be in some configuration file/env var/etc.
const secretKey = "top-secret-key"

function verify(tokenString) {
    // tokenString == string (JSON.stringify(....))    "Token {...}"
    try {
        // tokenParts[0]=="Token", tokenParts[1]==macValue, tokenParts[2]=="{...}"
        const tokenParts = tokenString.split(' ');
        if (tokenParts[0] !== "Token") {
            return null;
        }

        const mac = crypto.createHmac('sha256', secretKey);
        mac.update(tokenParts[2]);
        const macValue = mac.digest('hex');
        if (tokenParts[1] !== macValue) {
            return null;
        }

        const tokenObject = JSON.parse(tokenParts[2]);

        if (tokenObject.version === "1.0")
            return tokenObject;
    } catch (e) {
        return null; // Fehler bei Validierung
    }

    // Token-Validierung fehlgeschlagen
    return null;
}

function generateToken(auth) {
    const tokenString = JSON.stringify({
        user: auth.$loki,
        role: auth.role,
        version: "1.0"
    });

    // MAC ... message authentication code
    const mac = crypto.createHmac('sha256', secretKey);
    mac.update(tokenString);
    const macValue = mac.digest('hex');

    return macValue + " " + tokenString;
}

module.exports = {
    verify: verify,
    generateToken: generateToken
};
