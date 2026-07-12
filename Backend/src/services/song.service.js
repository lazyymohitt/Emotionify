const axios = require("axios");

const BASE_URL = "https://api.jamendo.com/v3.0/tracks";

async function getSongsByMood(mood) {
  try {
   const response = await axios.get(BASE_URL, {
  params: {
    client_id: process.env.JAMENDO_CLIENT_ID,
    format: "json",
    limit: 20,
    tags: mood,
    include: "musicinfo",
  },
});
    return response.data.results;
  } catch (error) {
    console.log("========== ERROR ==========");

    console.log(error.response?.data);

    console.log(error.message);

    throw error;
}
}


async function searchSongs (query){
        try{
            const response = await axios.get(BASE_URL, {
  params: {
    client_id: process.env.JAMENDO_CLIENT_ID,
    format: "json",
    limit: 20,
    search: query,
  },
});
            return response.data.results
        }
        catch (error) {
    console.log("========== ERROR ==========");

    console.log(error.response?.data);

    console.log(error.message);

    throw error;
}
}

module.exports = {
    getSongsByMood,
    searchSongs
}