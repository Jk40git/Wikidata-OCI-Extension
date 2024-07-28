const axios = require('axios');

const getPropertyStatements = async (propertyId) => {
  try {
    const response = await axios.get(`https://wikidata.org/w/rest.php/entities/properties/${propertyId}/statements`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Log the response data
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching the property statements:', error);
  }
};

// Replace 'P123' with the desired property ID
getPropertyStatements('P123');
