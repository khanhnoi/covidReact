import React from 'react';
import { Cards, Chart, CountryPicker } from './components'
import GoogleMapReact from 'google-map-react';
import { fetchData } from './api'

import styles from './App.module.css'
import shenDoctor from './assets/images/Shen_doctor.jpg'
import covid from './assets/images/covid.png'
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';


class App extends React.Component {
    state = {
        data: {},
        countries: [],
        country: ''
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

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({
            data: fetchedData
        })
    }
    render() {
        const { data, country } = this.state;
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <img className={styles.shen} src={shenDoctor} alt="" srcset="" />
                        <div className={styles.logo}>
                            <img className={styles.covid} src={covid} alt="" srcset="" />
                            <a className={styles.khanhNoi} href="http://khanhnoi.mobie.in" target="_blank">
                                <h5>By Khánh Nòi</h5>
                            </a>
                        </div>
                        <CountryPicker handleCountryChange={this.handleCountryChange} />
                    </div>
                    <Cards data={data} />
                    <Chart data={data} country={country} />

                    {/* <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyD61Lchy4elcU5OtduS23yYrDDBt0cAYFU" }}
                            defaultCenter={{
                                lat: 59.95,
                                lng: 30.33
                            }}
                            defaultZoom={11}
                        >
                            <AnyReactComponent
                                lat={59.955413}
                                lng={30.337844}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div> */}

                </div>
            </>
        )
    }
}

export default App;
