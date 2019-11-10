

let api = "https://api.edamam.com/search?q="
let id = "&app_id=$590fe5b0&app_key=$675b5a02077391477744369154977f18"
let entry;

let output = document.getElementById('output');
let foodChoice = document.getElementById('foodChoice');
let calorieMin = document.getElementById('calorieMin');
let calorieMax= document.getElementById('calorieMax');
let submitButton = document.getElementById('submit');

var urls = new Array();
var titles= new Array();

submitButton.addEventListener('click', getURL);

function getURL(e){
  e.preventDefault();
  output.innerHTML = "";
  entry = foodChoice.value;
  let url= api + entry+ id+ "";
  display(url);
}

function display(url){
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {

      // Work with JSON data here
      getRecipe(data);
      getTitles(data);

      for(recipe = 0; recipe < urls.length; recipe++){

        //var link = document.createElement('a');
        var url = urls[recipe];

        // Create the text node for anchor element.
        var link = document.createElement('a');
        var title = document.createTextNode(titles[recipe] + "");

        // Append the text node to anchor element.
        link.appendChild(title);

        // Set the href property.
        link.href = url + "";

        // Append the anchor element to the body.
        var li = document.createElement('li');
        li.appendChild(link);
        output.appendChild(li);
      }


    })
    .catch(err => {
    })
}

function getRecipe(data){

  var minCal = calorieMin.value;
  var maxCal = calorieMax.value;
  var index = 0
  //console.log(data.hits[1].recipe.url);
  for(recipe = 0; recipe < data.hits.length; recipe++){

    if (data.hits[recipe].recipe.calories >= minCal && data.hits[recipe].recipe.calories <= maxCal){
      urls[index] = data.hits[recipe].recipe.url;
      index++;
    }
  }

  return;
}

function getTitles(data){

  var minCal = calorieMin.value;
  var maxCal = calorieMax.value;

  var index = 0;
  for(recipe = 0; recipe < data.hits.length; recipe++){
    if (data.hits[recipe].recipe.calories >= minCal && data.hits[recipe].recipe.calories <= maxCal){
      titles[index] = data.hits[recipe].recipe.label;
      index++;
    }
  }

  return;
}
