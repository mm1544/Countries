// DOM elements
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Will search through 'countries.json'
const searchCountry = async searchInput => {
  // Reading data from Json file
  const response = await fetch('../data/countries.json');
  const countries = await response.json();

  // Matching to the text input
  let matches = countries.filter(country => {
    /*
    Regular expression; '^' - meaning: it has to start with, so it matches the beginning; 'g'-global, 'i'-case insensitive
    */
    const regex = new RegExp(`^${searchInput}`, 'gi');
    return (
      country.capital.toString().match(regex) ||
      country.name.common.match(regex)
    );
  });

  // If input field is empty then 'matches' array is empty
  if (searchInput.length === 0 || matches.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  // Creating html
  resultHtml(matches);
};

// Results in html
const resultHtml = matches => {
  if (matches.length > 0) {
    /*
    Will map throught 'matches' array and for each 'match' will make html and will put to the array. Later will join this array to the string.
    */

    const html = matches
      .map(
        match => `
   <div class="card card-body mb-4">
      <h4>${match.name.common} <span class="text-primary">
      ${match.capital}
      </span></h4>
      <small>Flag: <img src="https://www.countryflags.io/${
        match.cca2
      }/flat/64.png">
        <div>Area: ${match.area} km<sup>2</sup></div>
        <div>Curency: ${currency(match)}</div>
      </small>
   </div>
   `
      )
      .join('');

    matchList.innerHTML = html;
  }
};

// Everytime there is an input in the input box, the event is triggered, which calls the function
search.addEventListener('input', () => searchCountry(search.value));

const currency = match => {
  let key = Object.keys(match.currencies);
  if (match.currencies[key]) {
    return (cur = match.currencies[key].name);
  }
};
