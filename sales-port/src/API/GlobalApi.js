import HTTP from "../Service/http";
const BASE_URL =  import.meta.env.VITE_API_DEV_URL;
const api2 = 'https://bgi.bitevns.org/api/v1/'
const token = localStorage.getItem('token');
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




export const updateData = async (url, updatedData) => {
  try {
    const fullUrl = BASE_URL + url;
    const response = await HTTP.Request(methods.PUT, fullUrl, updatedData);
    return response;
  } catch (error) {
    console.error("❌ Error updating data:", error);
    Notifier.error(error?.error || "Failed to update data.");
    return null;
  }
};



export const PostdataWithJson = async (Url, data) => {
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         ...(token && { 'Authorization': `Token ${token}` }),
      },
      body: JSON.stringify(data),
      //   mode: 'no-cors',s
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating data:", error);
  }
};


export const Postdataform = async (Url, data) => {
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'POST',
      headers: {
   
        ...(token && { 'Authorization': `Token ${token}` }),
      },
      body:data,
      //   mode: 'no-cors',s
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

export const UpdateDataForm = async (Url, data) => {
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'PUT',
      headers: {
   
        ...(token && { 'Authorization': `Token ${token}` }),
      },
      body:data,
      //   mode: 'no-cors',s
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

export const UpdateDataFormWithJson = async (Url, data) => {
    
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       'Authorization': `Token ${token}`

      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result?.detail || 'Unknown error' };
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
    return { error: 'Network or server error' };
  }
};

// Get all data

export const getDataformap = async (Url) => {
  try {
    const response = await fetch(`${api2}${Url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` }),
      },
      
      //   mode: 'no-cors',s
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};











export const getDatalink = async (Url,tokenfromlink) => {
  try {
    const response = await fetch(`${window.api}${Url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(tokenfromlink && { 'Authorization': `Token ${tokenfromlink}` }),
      },
      
      //   mode: 'no-cors',s
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Get data by ID
export const getDataById = async (Url, id) => {
  try {
    const response = await fetch(`${Url}/data/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data by ID:", error);
  }
};



// Delete data by ID
export const deleteData = async (Url, id) => {
  try {
    const response = await fetch(`${Url}/data/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

// src/api.js

// Patch data by ID (Partial update)
export const patchData = async (Url, updatedData) => {
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` }),
      },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error patching data:", error);
  }
};

// Get a file (blob) like Excel/PDF
export const getBlob = async (Url) => {
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Token ${token}` })
      }
    });
    if (!response.ok) throw new Error("Network error or unauthorized");
    return await response.blob();
  } catch (error) {
    console.error("❌ Error downloading blob:", error);
    throw error;
  }
};


export const postBlob = async (Url, bodyData = {}) => {
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` })
      },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) throw new Error("Network error or unauthorized");
    return await response.blob();
  } catch (error) {
    console.error("❌ Error downloading blob:", error);
    throw error;
  }
};



export const getBloblive = async (Url) => {
  try {
    const response = await fetch(`${api2}${Url}`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Token ${token}` })
      }
    });
    if (!response.ok) throw new Error("Network error or unauthorized");
    return await response.blob();
  } catch (error) {
    console.error("❌ Error downloading blob:", error);
    throw error;
  }
};
export const postDataWithToken = async (Url, data, customToken) => {
  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(customToken && { Authorization: `Token ${customToken}` })
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error posting data with token:", error);
    throw error;
  }
};




 export const PostFileData = async (Url, fileFieldName, file) => {
  const formData = new FormData();
  formData.append(fileFieldName, file);

  try {
    const response = await fetch(`${api}${Url}`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Token ${token}` })
      },
      body: formData
    });

    const data = await response.json(); // parse JSON even on error

    if (!response.ok) {
      console.error("❌ Upload failed:", data);
      throw data; // Throw full error response to handle in UI
    }

    return data;
  } catch (error) {
    console.error("❌ Error uploading file:", error);
    throw error; // Bubble it up to show in UI
  }
};

