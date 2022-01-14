import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// console.log(fetchCountries("peru"));


const searchField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list')


searchField.addEventListener('input', debounce((countryInput), DEBOUNCE_DELAY));

function countryInput(evt) {
    const countryName = evt.target.value;
    const normalCountryName = countryName.trim();
   if(!normalCountryName){
    countryList.innerHTML = "";
    } else {
        fetchCountries(normalCountryName)
            .then(countries => {
                if (countries.length > 10) {
                    console.log("Too many matches found. Please enter a more specific name.");

                } else if (countries.length >= 2 && countries.length <= 10) {
                     renderFewCountries  (countries)
                    // console.log('знайдено декілька країн');
                } else {
                    renderOneCountry(countries)
                    // console.log('конкретна країна знайдена');
                }
            })
            .catch(error =>  console.log('Oops, there is no country with that name'));
    }
}

function renderOneCountry(countries) {
 const markup = countries.map((country) => {
     return `<li class="country-item">
            <div class="country-part"><img class="country-img" src="${country.flags.svg}" width= "50mpx"  alt="${country.name.official}"/>
            <h2 class="country-name"><b>${country.name.official}</b></h2></div>
            <p><b>Capital</b> : ${country.capital}</p>
            <p><b>Population</b> : ${country.population}</p>
            <p><b>Languages</b> : ${Object.values(country.languages)}</p>
            </li>`
 }).join('')

countryList.innerHTML = markup;
}

function renderFewCountries (countries) {
const fewCountries = countries.map((country) => {
    return `<li class="country-item">
            <div class="country-part"><img class="country-img" src="${country.flags.svg}" width= "50mpx"  alt="${country.name.official}"/>
            <h2 class="country-name"><b>${country.name.official}</b></h2></div>
            </li>`
}).join('')

countryList.innerHTML = fewCountries;
}