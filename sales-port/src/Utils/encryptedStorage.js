// utils/encryptedStorage.js
import CryptoJS from "crypto-js";

  
 
const EncryptedStorage = {
  set: (key, value) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), import.meta.env.VITE_ENCRYPTED_SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  },
  get: (key) => {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, import.meta.env.VITE_ENCRYPTED_SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("❌ Decryption error:", error);
      return null;
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
};

export default EncryptedStorage;
