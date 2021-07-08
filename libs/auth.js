function verify(tokenString) {
    // tokenString == string (JSON.stringify(....))    "Token {...}"
    try {
        // tokenParts[0]=="Token", tokenParts[1]=="{...}"
        const tokenParts = tokenString.split(' ');
        if (tokenParts[0] !== "Token") {
            return null;
        }
        const tokenObject = JSON.parse(tokenParts[1]);

        if (tokenObject.version === "1.0")
            return tokenObject;
    } catch (e) {
        return null; // Fehler bei Validierung
    }

    // Token-Validierung fehlgeschlagen
    return null;
}

module.exports = {
    verify: verify,
};
