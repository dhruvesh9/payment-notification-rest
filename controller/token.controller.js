const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Define a function to generate a random string
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

// Define a function to generate a JTI
function generateJTI() {
    return Buffer.from(crypto.randomBytes(32)).toString('base64');
}

// Define a function to encode the JWT payload
function encodeJWT(payload, secretKey) {
    return jwt.sign(payload, secretKey);
}

function generatePayload() {

    const iss = 'Dev Center';
    const cuid = '9BA5008C-08EE-4286-A349-54AF91A621B0';
    const auid = '904A34AF-0CE9-42B1-9C98-B69E6329D154'; // non 3DS
    // const auid = "23ADADC0-DA2D-4DAC-A128-4845A5D71293";
    const amount = '29.00';
    const mref = 'DEV_' + generateRandomString(8);

    const payloadObject = {
        iss: iss,
        cuid: cuid,
        auid: auid,
        amount: amount,
        mref: mref,
        jti: generateJTI(),
        iat: Math.floor(Date.now() / 1000) - 60,
        exp: Math.floor(Date.now() / 1000) + 600
    };

    return payloadObject;
}

function encode(payload, secretKey){
    const token = encodeJWT(payload, secretKey);
    return token;
}

exports.get_token = function (req, res) {
    const secretKey = 'yglTxLCSMm7PEsfaMszAKf2LSRvM2qVW'; // Supplied by Adumo Online
    const data = {}

    const payload = generatePayload();

    data['access_token'] = encode(payload,secretKey);
    data['mref'] = payload.mref

    res.send(data);
}