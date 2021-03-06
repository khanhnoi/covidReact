import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const urlMaps = 'https://corona.lmao.ninja/v3/covid-19/countries'

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country && country!=='global') {
        changeableUrl = `${url}/countries/${country}`
    }
    try {
        const response = await axios.get(changeableUrl);
        // console.log('response' , response);
        const { data: { confirmed, countryDetail, dailyTimeSeries, deaths, recovered, lastUpdate } } = response;
        const modifiedData = {
            confirmed,
            countryDetail,
            dailyTimeSeries,
            deaths,
            recovered,
            lastUpdate
        }
        return modifiedData;
    } catch (error) {

    }
}

export const fetchDailyData = async () => {
    try {
        const response = await axios.get(`${url}/daily`);
        const { data } = response;
        const modifiedData = data.map((dailyData) => (
            {
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            }
        ))
        // console.log(modifiedData);
        return modifiedData;

    } catch (error) {

    }
}

export const fetchCountries = async () => {
    try {
        const response = await axios.get(`${url}/countries`);
        const { data } = response;
        const { countries} = data;
        const arrCountries = countries.map(country => country.name);
        console.log('arrCountries:', arrCountries);
        return arrCountries;
    } catch (error) {

    }
}

//map
export const fetchMapCountries = async () => {
    try {
        const response = await axios.get(`${urlMaps}`);
        const {data} = response; 
        console.log('mapsdata', data);
        const modifiedData = data.map(country => ({
            lat : country.countryInfo?.lat,
            lng: country.countryInfo?.long,
            image: country.countryInfo?.flag,
            deaths: country.deaths,
            active: country.active
        }))
        return modifiedData;
    } catch (error) {
        
    }
}