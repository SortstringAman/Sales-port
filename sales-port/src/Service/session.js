/**
 * Represents a session object for managing data in local storage.
 */
export default class Session {

    /**
     * Retrieves the value associated with the specified key from local storage.
     * @param {string} key - The key to retrieve the value for.
     * @returns {string|null} The value associated with the key, or null if the key does not exist.
     */
    static get(key) {
        const value = localStorage.getItem(key);
        if (value === 'true' || value === 'false') {
            return JSON.parse(value);
        }
        return value;
    }

    /**
     * Retrieves the object associated with the specified key from local storage.
     * @param {string} key - The key to retrieve the object for.
     * @returns {object|null} The object associated with the key, or null if the key does not exist.
     */
    static getObject(key){
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    }
    
    /**
     * Sets the value for the specified key in local storage.
     * @param {string} key - The key to set the value for.
     * @param {string} value - The value to set.
     */
    static set(key, value) {
        if (typeof value === 'boolean') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }

    /**
     * Sets the object for the specified key in local storage.
     * @param {string} key - The key to set the object for.
     * @param {object} value - The object to set.
     */
    static setObject(key, value){
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
    }

    /**
     * Removes the value associated with the specified key from local storage.
     * @param {string} key - The key to remove the value for.
     */
    static remove(key){
        localStorage.removeItem(key);
    }

    /**
     * Sets the registered phone number in local storage.
     * @param {string} phoneNumber - The phone number to set as registered.
     */
    // static setRegisteredPhoneNumber(phoneNumber){
    //     localStorage.setItem('phoneNumber', phoneNumber);
    //     console.log('no'+phoneNumber);
    // }

    /**
     * Retrieves the registered phone number from local storage.
     * @returns {string|null} The registered phone number, or null if it is not set.
     */
    // static getRegisteredPhoneNumber(){
    //     const storedPhoneNumber = localStorage.getItem('phoneNumber');
    //     return storedPhoneNumber;
    // }
}