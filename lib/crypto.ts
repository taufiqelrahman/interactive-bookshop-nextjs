import CryptoJS from 'crypto-js';
import Crypto from 'crypto';

// for server
const secretKey = process.env.SECRET_KEY || '';
const secretIv = process.env.SECRET_IV || '';
// for client
const parsedKey = CryptoJS.enc.Utf8.parse(secretKey);
const parsedIv = CryptoJS.enc.Utf8.parse(secretIv);

export function encryptTokenClient(token) {
  const options = { mode: CryptoJS.mode.CBC, iv: parsedIv };
  const json = CryptoJS.AES.encrypt(token, parsedKey, options);
  return json.ciphertext.toString(CryptoJS.enc.Hex);
}

export const decryptTokenClient = cryptedToken => {
  const options = { mode: CryptoJS.mode.CBC, iv: parsedIv };
  const json = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Hex.parse(cryptedToken),
    },
    parsedKey,
    options,
  );
  return json.toString(CryptoJS.enc.Utf8);
};

export const decryptTokenServer = cryptedToken => {
  const decipher = Crypto.createDecipheriv('aes-256-cbc', secretKey, secretIv);
  const dec = decipher.update(cryptedToken, 'hex', 'utf8');
  return dec + decipher.final('utf8');
};

export default {
  encryptTokenClient,
  decryptTokenClient,
  decryptTokenServer,
};
