

  let apiUrl = 'https://restcountries.com/v3.1/';
  let selectedRegion = "";
let searchedCountry = "";
  let names = [];
  let countriesData = [];
  const countryContainer = document.querySelector('.display-cont');
  let filter = document.querySelector('#regions');
let search = document.querySelector('.search-cont input')
search.addEventListener('change', ()=>{
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

  function display_countries() {
    // display the countries and their components.
    countriesData.forEach(el => {
    const countryElement = document.createElement('div')
    const flagOf = document.createElement('img')
    const nameOf = document.createElement('h2')
    const capitalCity = document.createElement('h3')
    const currencyOf = document.createElement('p')
    const populationOf = document.createElement('p')
                         // countryElement.classList.add('size');                    // countryElement.style.width = '150px'
    flagOf.src = el.flags.png
    nameOf.textContent = el.name.common
    capitalCity.textContent = `Capital:${el.capital[0]}`
    currencyOf.textContent = `Currency: ${Object.values(el.currencies)[0].name} (${Object.values(el.currencies)[0].symbol})`;
      populationOf.textContent = `Population: ${el.population}`
      
      countryContainer.appendChild(countryElement)
      countryElement.appendChild(flagOf)
      countryElement.appendChild(nameOf)
      countryElement.appendChild(capitalCity)
      countryElement.appendChild(populationOf)
      countryElement.appendChild(currencyOf)
    })
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
