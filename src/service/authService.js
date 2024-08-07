
// const api = process.env.REACT_APP_BASE_URL
// import {  } from '../constant/constant';
// src/services/api.js

const BASE_URL = 'https://qrcode-api.indicold.in';
// const BASE_URL = 'http://localhost:3011';
// const BASE_URL = 'https://qr-backend-keua.onrender.com';

export const getData = async () => {
  const response = await fetch(`${BASE_URL}/values`);
  const data = await response.json();
  return data.map(item => ({
    url: `${BASE_URL}/redirect/${item.key}`,
    value: item.value,
    company: item.key,
    isNew: false,
  }));
};

export const addValue = async (company, value) => {
  const response = await fetch(`${BASE_URL}/value/${company}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value }),
  });
  return await response.json();
};

export const updateValue = async (company, value) => {
  const response = await fetch(`${BASE_URL}/update/${company}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value }),
  });
  return await response.json();
};

export const addFirm = async (value) => {
  const response = await fetch(`${BASE_URL}/register-firm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  return await response.json();
};
// export const getAllFirm = () => {
//   return fetch(`${BASE_URL}/getAllFirm`)
//     .then(handleResponse)
//     .catch((error) => console.error('Error fetching data:', error));
// };
export const getAllFirm = async () => {
  try {
    // Make API call to your backend endpoint for login
    const response = await fetch(`${BASE_URL}/getAllFirm`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 404) {
      throw new Error('Not_found')
    }

    if (!response.code === 200) {
      // Handle non-200 responses here
      throw new Error("password failed");
    }

    // Return the response data (might contain user information or tokens)
    return response.json();
  } catch (error) {
    // Handle any errors, maybe log them or show an error message
    console.error("password error:", error.message);
    throw error.message;
  }
};
export const login = async (value) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  return await response.json();
};
export const getFirmDetails = async (id) => {
  try {
    // Make API call to your backend endpoint for login
    const response = await fetch(`${BASE_URL}/getFirmAndQRCode/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 404) {
      throw new Error('Not_found')
    }

    if (!response.code === 200) {
      // Handle non-200 responses here
      throw new Error("password failed");
    }

    // Return the response data (might contain user information or tokens)
    return response.json();
  } catch (error) {
    // Handle any errors, maybe log them or show an error message
    console.error("password error:", error.message);
    throw error.message;
  }
};