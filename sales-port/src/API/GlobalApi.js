 
import HTTP from "./Http";
import { methods } from "./Methods";
 const BASE_URL =  import.meta.env.VITE_API_DEV_URL;


//  const BASE_URL='192.168.1.19:9000/api/v1/administration/'
// Create data
export const Postdata = async (url, data) => {
  const fullUrl = BASE_URL + url;
  return await HTTP.Request(methods.POST, fullUrl, data); 
};



export const GetData = async (url) => {
  const fullUrl = BASE_URL + url;
  return await HTTP.Request(methods.GET, fullUrl);
};



