const countryName = new URLSearchParams(location.search).get('name')
console.log(countryName)
let apiUrl = 'https://restcountries.com/v3.1/';
let selectedCountry = [];
let countryContainer = document.querySelector('.country-displayed')
const flag = document.querySelector('.flag')
// const flagClas = document.querySelector('.flag-cla')
const firstDetails = document.querySelector('.first-details')
const secondDetails = document.querySelector('.second-details')
const darkbtn = document.querySelector('.dark')
const wholeBody = document.querySelector('.body')
const first = document.querySelector('.first')
const second = document.querySelector('.second')
const backBtn = document.querySelector('.back-btn')

darkbtn.addEventListener("click", ()=>{
  if(darkbtn.classList.contains('darkenedBtn')){
  wholeBody.classList.remove('darkened')
  first.classList.remove('darkened')
  second.classList.remove('darkened')
  darkbtn.classList.remove('darkenedBtn')
  backBtn.classList.remove('darkenedBtn')
  }else{
    wholeBody.classList.add('darkened')
    first.classList.add('darkened')
    second.classList.add('darkened')
    darkbtn.classList.add('darkenedBtn')
    backBtn.classList.add('darkenedBtn')
  }
 })

getDetails()
.then(() => {
    // delete_this();
    display_countries();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


function getDetails(){
    return new Promise((resolve, reject) => {
        fetch(apiUrl+`name/${countryName}`)
        .then(result => result.json())
        .then(real => {
            selectedCountry = real;
            console.log(selectedCountry);
            resolve()
        })
        .catch((error)=>{
            console.log("failed to reach process", error)
            reject()
        })
    })
}
function addLabelAndData(container, labelText, dataText, elementTag = 'span') {
    const labelElement = document.createElement('strong');
    labelElement.textContent = labelText;
  
    const dataElement = document.createElement(elementTag);
    dataElement.textContent = dataText;
  
    container.appendChild(labelElement);
    container.appendChild(dataElement);
  }

  function display_countries(){

    const flagOf = document.createElement("img")
    flagOf.src = selectedCountry[0].flags.png
    flagOf.style.width= '100%'
    flag.appendChild(flagOf)


    const nameOf = document.querySelector('.name')
    nameOf.textContent = selectedCountry[0].name.common

    const nativeNameOf = document.querySelector('.native-name')
    addLabelAndData(nativeNameOf, 'Native Name: ', `${Object.values(selectedCountry[0].name.nativeName)[0].official}`)

    const populationOf = document.querySelector('.population')
    addLabelAndData(populationOf, 'Population: ',selectedCountry[0].population )

    const regionOf = document.querySelector('.region')
    addLabelAndData(regionOf, 'Region: ', selectedCountry[0].region)

    const subRegionOf = document.querySelector('.sub-region')
    addLabelAndData(subRegionOf, 'Sub Region: ', selectedCountry[0].subregion)

    const capital = document.querySelector('.capital')
    addLabelAndData(capital, 'Capital: ', selectedCountry[0].capital[0])

    
    // nativeNameOf.textContent = selectedCountry[0].name.official
    // populationOf.textContent = selectedCountry[0].population
    // regionOf.textContent = selectedCountry[0].region
    // capital.textContent = selectedCountry[0].capital[0]
    // subRegionOf.textContent = selectedCountry[0].subregion
    firstDetails.appendChild(nameOf)
    firstDetails.appendChild(nativeNameOf)
    firstDetails.appendChild(populationOf)
    firstDetails.appendChild(regionOf)
    firstDetails.appendChild(subRegionOf)
    firstDetails.appendChild(capital)

    const topLevel = document.querySelector('.top-level')
    addLabelAndData(topLevel, 'Top Level Domain: ', selectedCountry[0].tld[0])
    const currency = document.querySelector('.Currencies')
    addLabelAndData(currency, 'Currency: ', `${Object.values(selectedCountry[0].currencies)[0].name} (${Object.values(selectedCountry[0].currencies)[0].symbol})`)
    const language = document.querySelector('.languages')
    let languagesArr = getLang()
    addLabelAndData(language, 'Language: ', languagesArr.join(','))
// topLevel.textContent = selectedCountry[0].tld[0]
// currency.textContent =  `${Object.values(selectedCountry[0].currencies)[0].name} (${Object.values(selectedCountry[0].currencies)[0].symbol})`
// language.textContent = selectedCountry[0].languages.eng
    secondDetails.appendChild(topLevel)
    secondDetails.appendChild(currency)
    secondDetails.appendChild(language)
  }
  
  function getLang(){
    let arr = []
    for(let i in selectedCountry[0].languages){
      arr.push(selectedCountry[0].languages[i])
    }
    return arr
  }
