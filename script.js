

let apiUrl = 'https://restcountries.com/v3.1/';
let selectedRegion = "";
let searchedCountry = "";
let names = [];
let countriesData = [];
const countryContainer = document.querySelector('.display-cont');
let filter = document.querySelector('#regions');
let search = document.querySelector('.search-cont input')
const darkbtn = document.querySelector('.dark')
const first = document.querySelector('.first')
const second = document.querySelector('.second')
const wholeBody = document.querySelector('.body')

darkbtn.addEventListener("click", ()=>{
 darkbtn.classList.add('darkenedBtn')
  first.classList.add('darkened')
 wholeBody.classList.add('darkened')
 countryContainer.classList.add('darkened')
})

search.addEventListener('keyup', ()=>{
searchedCountry = search.value;
console.log(searchedCountry)
searchCountry()
.then(() => {
    delete_this();
    display_countries();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
})

filter.addEventListener('change', async () => {
  selectedRegion = filter.value;
  console.log(selectedRegion);

  try {
    await filterByRegion();
    delete_this();
    display_countries();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


home_page()
  .then(() => {
    delete_this();
    display_countries();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  

// this is the function used when filtering by regions
async function filterByRegion() {
  let result = await fetch(apiUrl + `region/${selectedRegion}`);
  let real = await result.json();
  console.log(real);
  countriesData = real;

}

function addLabelAndData(container, labelText, dataText, elementTag = 'span') {
  const labelElement = document.createElement('strong');
  labelElement.textContent = labelText;

  const dataElement = document.createElement(elementTag);
  dataElement.textContent = dataText;

  container.appendChild(labelElement);
  container.appendChild(dataElement);
}

function display_countries() {


  countriesData.forEach(el => {
    const countryLink = document.createElement('a');
    countryLink.setAttribute('href', `country.html?name=${encodeURIComponent(el.name.common)}`);
    // countryLink.setAttribute('target', '_blank');
    countryLink.classList.add('links');
  
    const countryElement = document.createElement('div');
    countryElement.style.textAlign = 'left';
    countryElement.classList.add('country')
  
    var contr = document.createElement('div');
    contr.classList.add('yrount')

    const flagOf = document.createElement('img');
    flagOf.style.height = '150px';
    flagOf.style.width = '250px';
    flagOf.src = el.flags.png;
  
    const nameOf = document.createElement('h2');
    nameOf.style.fontSize = '20px'
    nameOf.textContent = el.name.common;
  
    const capitalCity = document.createElement('p');
    addLabelAndData(capitalCity, 'Capital:', el.capital[0]);
  
    const currencyOf = document.createElement('p');
    addLabelAndData(currencyOf, 'Currency:', `${Object.values(el.currencies)[0].name} (${Object.values(el.currencies)[0].symbol})`);
  
    const populationOf = document.createElement('p');
    addLabelAndData(populationOf, 'Population:', `${el.population}`);
  
    countryContainer.appendChild(countryLink);
    countryLink.appendChild(countryElement);
    countryElement.appendChild(flagOf);
    countryElement.appendChild(nameOf);
    countryElement.appendChild(capitalCity);
    countryElement.appendChild(currencyOf);
    countryElement.appendChild(populationOf);
    countryElement.appendChild(contr)
    contr.appendChild(nameOf)
    contr.appendChild(capitalCity)
    contr.appendChild(currencyOf)
    contr.appendChild(populationOf)
  });
}

function delete_this() {
  // Remove all children from the countryContainer div
  while (countryContainer.firstChild) {
    countryContainer.removeChild(countryContainer.firstChild);
  }
}

function home_page() {
  return new Promise((resolve, reject) => {
    fetch(apiUrl + "all")
      .then(result => result.json())
      .then(real => {
        console.log(real);
      countriesData = real
      resolve(); 
        })
      .catch(error => {
        reject(error);
      })
        // Resolve the promise once data is fetched and processed
      });
}

function searchCountry(){
  
  return new Promise((resolve, reject) => {
    fetch(apiUrl + `name/${searchedCountry}`)
    .then(result => result.json())
       .then(real => {
         console.log(real);
       countriesData = real
       resolve(); 
         })
       .catch(error => {
         reject(error);
       });
  });

}


