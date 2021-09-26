
// JavaScript Fetch, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//(free version) API key from  https://newsapi.org/
const apiKey = '6ad374741184420585d9ffc877f25a28';

// HTTP request settings
const headers = new Headers();
const reqInit = { method: 'GET', headers: headers, mode: 'cors', cache: 'default' };

// default news source
const defaultSource = 'the-irish-times';


// Asynchronous Function to call API and get data
// note parameter value default (in case it is missing)
async function getNewsData(source = defaultSource) {

  const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
  try {

    // call the api - await indicates an async call
    // this call is non blocking and will return a promise
    const response = await fetch(url, reqInit);
    
    // get json data from the response - when it arrives
    const json = await response.json();
    
    // log raw json result
    console.log(json);
    
    // display the articles
    displayData(json.articles);

    // catch any errors
  } catch (err) {
    console.log(err);
  }
}

// Function accepts an array of news articles
// Articles are parsed and displayed
function displayData(articles) {

  // log the articles in the console
  console.log(articles);

  // Set the source element of the page to display news source (from the first [0] article)
  document.getElementById('source').innerHTML = articles[0].source.name;

  // Get articles and add each one to the root element
  // the array map function iterates trough each object element in an array
  // read as 'for each article in articles, do this...'
  let output = articles.map(article => {
    // returns a template string for each article, values are inserted using ${ }
    // <article> is an HTML5 semantic elememt which matches our needs but div could also be used
    return `<article>
              <h4>${article.title}</h4>
              <p>${article.author}</p>
              <p>${article.publishedAt}</p>
              <img src=${article.urlToImage} alt='article image'>
              <p>${article.description}</p>
              <p><a href='http://#'>Read More</a></p>
            </article>`;
  });
  
  // output, the result of the previous step, is an array of formatted articles
  // Set the innerHTML of the articles root element = output
  let articlesElement = document.getElementById('articles')
  articlesElement.innerHTML = output;

} // end function


// Call the function immediatly after script is loaded
getNewsData('the-irish-times');

// Will this message display before or after the JSON data and why?
console.log('Has getNewsData() finished yet?');

