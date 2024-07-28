const axios = require('axios');

const getItemData = async (itemId) => {
  try {
    const response = await axios.get(`https://wikidata.org/w/rest.php/entities/items/${itemId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Log the response data
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching the item data:', error);
  }
};

// Replace 'Q42' with the desired item ID
getItemData('Q42');
