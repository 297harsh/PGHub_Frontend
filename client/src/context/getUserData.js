import axios from "axios";
const serverapiUrl = import.meta.env.VITE_API_URL;

export const getUserData = async (accesstoken) => {
  if (!accesstoken) {
    return null;
  }

  try {
    const response = await axios.get(`${serverapiUrl}/auth/getUserData`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });

    if (response && response.data && response.data.userData) {
      return response.data.userData;
    }

    return null;
  } 
  catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};
