import HTTP from "../Service/http";
const BASE_URL =  import.meta.env.VITE_API_DEV_URL;
const api2 = 'https://bgi.bitevns.org/api/v1/'

import { methods } from "../Constant";
import Notifier from "../Utils/notify";


// Create data

export const Postdata = async (url, data) => {
  try {
    const fullUrl = BASE_URL + url;
    const response = await HTTP.Request(methods.POST, fullUrl, data);
    return response;
  } catch (error) {
    console.error("❌ Error in Postdata:", error);
    return { error: error.message || error };
  }
};



export const getData = async (url) => {
  try {
       const fullUrl = BASE_URL + url;
    const response = await HTTP.Request(methods.GET, fullUrl);
    return response;
  } catch (error) {
    console.error("❌ Error in getData:", error);
    Notifier.error(error?.error || "Failed to fetch data.");
    return null;
  }
};


