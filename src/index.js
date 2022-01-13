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
                    console.log('знайдено декілька країн');
                    console.log(countries);
                } else {
                    console.log('конкретна країна знайдена');
                    console.log(countries);
                }
            })
            .catch(error =>  console.log('Oops, there is no country with that name'));
    }
    }