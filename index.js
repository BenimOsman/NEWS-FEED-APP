fetch(
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=4049525922de49b1a80df6daf4ce8bee"
  )
  .then(function (response)     
  {
      return response.json();         // This returns a promise that resolves to a JSON Object.
  })
  .then(function (data)
  {
    console.log(data);              // This logs the JSON object to the console.
    if (data.articles.length > 10) 
    {
      data.articles.length = 10;
      displayNews(data);
      return data;                  // This returns a promise that resolves to the JSON object.
    }                               // DisplayPagination(data)
      
  });
  
  // Create a function to create a card for each article and append it to the DOM to display the news.
  function createCard(article) {      // Where is article coming from? It's a parameter that is passed to the function.
    // Create a div element to hold the card
    var card = document.createElement("div");
    card.classList.add("card");
    // Create a div element to hold the card image
    var cardImage = document.createElement("div");
    cardImage.classList.add("card-image");
    // Create an image element to hold the image
    var image = document.createElement("img");
    image.src = article.urlToImage;
    // Create a div element to hold the card content
    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    // Create a span element to hold the title
    var title = document.createElement("span");
    title.classList.add("card-title");
    title.textContent = article.title;
    // Create a p element to hold the description
    var description = document.createElement("p");
    description.textContent = article.description;
    // Create a div element to hold the card action
    var cardAction = document.createElement("div");
    cardAction.classList.add("card-action");
    // Create an anchor element to hold the link to the article
    var link = document.createElement("a");
    link.textContent = "Read More";
    link.href = article.url; // article.url will be the value of the href attribute
    // Append the elements to the DOM
    cardAction.appendChild(link);
    cardContent.appendChild(title);
    cardContent.appendChild(description);
    cardImage.appendChild(image);
    card.appendChild(cardImage);
    card.appendChild(cardContent);
    card.appendChild(cardAction);
    document.querySelector("#news").appendChild(card);
  }
  
  // Create a function to display the news
  function displayNews(data) {
    // Loop through the articles and create a card for each article
    for (var i = 0; i < data.articles.length; i++) {
      createCard(data.articles[i]);
    }
  }
  // Create a function to clear the news
  function clearNews() {
    // Select the news div and set its innerHTML to an empty string
    document.querySelector("#news").innerHTML = "";
  }
    // Infinite scroll news function
  var page = 1;
  var pageSize = 10;
  var category = "top-headlines";
  var language = "en";
  var country = "in";
  var sortBy = "publishedAt";
  var apiKey = "4049525922de49b1a80df6daf4ce8bee";
  var loading = false;
  var finished = false;
  var news = document.querySelector("#news");
  var loadingElement = document.querySelector("#loading");
  var finishedElement = document.querySelector("#finished");
  window.addEventListener("scroll", function () {
    if (
      window.scrollY + window.innerHeight >= document.body.offsetHeight - 100 &&
      !loading &&
      !finished
    ) {
      loading = true;
      loadingElement.style.display = "block";
      page++;
      url =
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=4049525922de49b1a80df6daf4ce8bee&page=" +
        page +
        "&language=" +
        language +
        "&country=" +
        country +
        "&sortBy=" +
        sortBy +
        "&apiKey=" +
        apiKey +
        "";
        console.log(url)
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.articles.length === 0) {
            finished = true;
            finishedElement.style.display = "block";
          } else {
            displayNews(data);
          }
          loading = false;
          loadingElement.style.display = "none";
        });
    }
  });
  