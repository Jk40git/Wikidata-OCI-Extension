const axios = require('axios');

const fetchEntities = async (searchTerm, language = 'en') => {
  const endpoint = 'https://www.wikidata.org/w/api.php';
  
  const params = {
    action: 'wbsearchentities',
    format: 'json',
    search: searchTerm,
    language: language,
    limit: 7,  // You can adjust the limit as needed
  };
  
  try {
    const response = await axios.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw error;
  }
};

// Example usage
fetchEntities('Cat', 'en')
  .then(data => console.log(data))
  .catch(error => console.error(error));
