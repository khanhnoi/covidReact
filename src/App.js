import React from 'react';
import { Cards, Chart, CountryPicker } from './components'
import GoogleMapReact from 'google-map-react';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { fetchData } from './api'

import styles from './App.module.css'
import shenDoctor from './assets/images/Shen_doctor.jpg'
import covid from './assets/images/covid.png'
import GoogleMaps from './components/GoogleMaps/GoogleMaps';
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

class App extends React.Component {
    state = {
        data: {},
        countries: [],
        country: '',
        loading: true,
        theme: true,
        crazy: false
    }

    handleCountryChange = async (country) => {
        console.log("country", country);
        //fetch data
        const fetchedData = await fetchData(country);
        this.setState({
            data: fetchedData,
            country: country
        })
    }
    handleChangeTheme = () => {
        if(this.state.theme) {
            document.querySelector('html').style.filter = 'invert(1)';
        }
        else {
            document.querySelector('html').style.filter = ''
        }
        this.setState({
            theme: !this.state.theme
        })
    }
    handleCrazy = () => {
        var intervalId = null
        let turn = false;
        var intervalId = setInterval(() => {
            turn ?
            document.querySelector('html').style.filter = 'invert(1)'
            :
            document.querySelector('html').style.filter = ''
            turn = !turn
            const crazyCurrent = this.state.crazy
            if(!crazyCurrent) {
                clearInterval(intervalId);
            }
        }, 300);
        this.setState({
            crazy: !this.state.crazy
        })
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({
            data: fetchedData,
        })

        console.log(fetchedData);
        var size = Object.keys(fetchedData).length;
        // console.log(size);
        if (size > 0) {
            // console.log(size)
            setTimeout(() => {
                this.setState({
                    loading: false
                })
            }, 500);
        }
    }
    render() {
        const { data, country, loading } = this.state;
        // if(loading)
        // return (
        //     <BarLoader/>
        // )
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <img className={styles.shen} src={shenDoctor} alt="Shen Khanh noi" srcset="" onClick={this.handleChangeTheme} />
                        <div className={styles.logo} onClick={this.handleCrazy} >
                            <img className={styles.covid} src={covid} alt="" srcset="" />
                            <a className={styles.khanhNoi} href="http://khanhnoi.mobie.in" target="_blank">
                                <h5>By Khánh Nòi</h5>
                            </a>
                        </div>
                        <CountryPicker handleCountryChange={this.handleCountryChange} />
                    </div>
                    {loading ? (
                        <div className={styles.loading}>
                            <BounceLoader css={{
                                display: 'block',
                                margin: '0 auto',
                                borderColor: 'red'
                            }}
                                size={150}
                                color={"red"} />
                        </div>  

                    ) : (
                            <>
                                <Cards data={data} />
                                <Chart data={data} country={country} />
                                <GoogleMaps/>
                            </>
                        )}


                </div>
            </>
        )
    }
}

export default App;
