/** @format */

// const getWikipediaPageDetails = async (title) => {
//     const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info&titles=${encodeURIComponent(title)}&explaintext&inprop=url&origin=*`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         const pageId = Object.keys(data.query.pages)[0];
//         const pageInfo = data.query.pages[pageId];

//         if (pageInfo) {
//             // console.log(`Title: ${pageInfo.title}`);
//             console.log(`URL: ${pageInfo.fullurl}`);
//             // console.log(`Extract: ${pageInfo.extract}`);
//         } else {
//             console.log('Page not found');
//         }
//     } catch (error) {
//         console.error('Error fetching Wikipedia page details:', error);
//     }
// };

// // // Example usage:
// // getWikipediaPageDetails('sex');

// async function fetchEntities(searchTerm, language = "en") {
//     const endpoint = "https://www.wikidata.org/w/api.php";
//     const params = new URLSearchParams({
//         action: "wbsearchentities",
//         format: "json",
//         search: searchTerm,
//         language: language,
//         uselang: language,
//         limit: 7,
//         origin: "*",
//     });

//     try {
//         const response = await fetch(`${endpoint}?${params}`);
//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.statusText}`);
//         }

//         const data = await response.json();

//         // Map through the results to create full URLs
//         const resultsWithUrls = data.search.map(entity => ({
//             id: entity.id,
//             label: entity.label,
//             fullurl: `https://www.wikidata.org/wiki/${entity.id}`,
//             description: entity.description,
//             match: entity.match
//         }));

//         return resultsWithUrls;
//     } catch (error) {
//         console.error('Error fetching entities:', error);
//         throw error;
//     }
// }

// // Example usage
// fetchEntities("Berlin")
//     .then(entities => console.log(entities))
//     .catch(error => console.error('Error in fetching entities:', error));

async function fetchEntities(searchTerm, language = 'en') {
  const endpoint = 'https://www.wikidata.org/w/api.php';
  const params = new URLSearchParams({
    action: 'wbsearchentities',
    format: 'json',
    search: searchTerm,
    language: language,
    uselang: language,
    limit: 7,
    origin: '*',
  });

  try {
    const response = await fetch(`${endpoint}?${params}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    // Map through the results to create Wikipedia URLs
    const resultsWithUrls = data.search.map((entity) => ({
      id: entity.id,
      label: entity.label,
      fullurl: `https://en.wikipedia.org/wiki/${encodeURIComponent(
        entity.label
      )}`,
      all: entity,
    }));

    return resultsWithUrls;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw error;
  }
}

// Example usage
fetchEntities('Berlin')
  .then((entities) => console.log(entities))
  .catch((error) => console.error('Error in fetching entities:', error));
