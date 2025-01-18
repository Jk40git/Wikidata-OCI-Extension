## Wikidata One Click Info Extension

<p>It's always tedious to open a new tab or take up your dictionary to look for words' meanings or explanations while reading your favorite article, books, PDFs or when browsing and coming across a word you want to know about.
</br>
Wikidata OCI(One-Click-Info) Extension is here to help, WOCI is a multilingual extension that enables you to search for any item or word that you come across while reading or browsing online. This extension improves the accessibility and searchability of Wikidata's data. 
The languages implemented are from wikidata, the user gets the data in the language selected from the structured data language available.</p>
</br>

**Wikidata OCI Extension** is an extension built with Wikidata API, when activated, will allow the user to select a word and click the extension to get a quick summary of the wikidata item or label selected or highlighted.

This extension operates with the action API and Wikidata's sitelinks. This [article](https://medium.com/@esaukondo/wikidata-one-click-info-extension-woci-7b65c74a70bc) is a good resource for learning more about the extension.

## Usage


https://github.com/user-attachments/assets/9a5a0316-ab46-48b4-b444-42af4e4928b3

</br>

<i> Select Text </i>: Highlight any word you want to know or learn more about.
</br>
<i> Click Extension Icon</i>: Click the Wikidata OCI Extension icon in your browser’s toolbar.
</br>
<i>View Summary </i>: A pop-up will appear, displaying a short description of the selected word from Wikidata.
</br>
<i> Read more about a particular item</i>: Click on any item that you want to know more about.

## Features

 - Highlight any word on a webpage and instantly retrieve a summary from wikidata.
 - Click on any result on the popup to read more information on the item clicked on Wikipedia through its sitelink.
 - Supports multiple languages (based on Wikidata's language availability), switch to the convenient language from the language option.
 - Works with Chrome and Firefox.
    

## Installation

#### Chrome

1. Download the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/wikidata-one-click-info/ooedcbicieekcihnnalhcmpenbhlfmnj).
2. Click on the extension icon in the top-right corner to pin it.
3. Highlight any word or phrase, click the extension icon, and see the summary!

#### Firefox

1. Download the extension from the [Firefox Add-ons Store](https://addons.mozilla.org/addon/wikidata-one-click-info/).
2. Pin the extension to your toolbar for quick access.
3. Select a word or phrase, click the extension, and view the Wikidata summary!

## How it works

The extension utilizes the Wikidata API to retrieve concise summaries of the selected text and the Wikipedia endpoint for the sitelinks URLS  

The user highlights a word on a webpage. </br>
The extension sends a request to the Wikidata API to find the matching entity. </br>
If an entity is found, the extension retrieves and displays the summary in a pop-up with their corresponding sitelinks. </br>
An Internet connection is needed for fetching data from Wikidata.

The seamless data in Wikidata OCI is possible, Thanks to the wonderful [Wikidata Action API](https://www.wikidata.org/w/api.php)

## Contributing
We welcome contributions! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

  #### To Run the extension on your local machine :
  1. [fork this repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) your fork
     </br>
  2. Open your browser and navigate to extensions from the three dots close to your profile picture click on the extensons then manage extensions.
  3. Navigate to load unpacked from the top of My extensions and load the extension that you have just cloned from your PC folders.
     
  #### Open an issue detailing your contribution, Make your contribution and open a pull request with a clear title and description.
  #### No package or build is required to run the extension locally or to contribute to this repo.
## License
This project is licensed under the BSD 3-Clause License . See the [LICENSE](https://github.com/Jk40git/Wikidata-OCI-Extension/blob/main/LICENSE) file for details.
