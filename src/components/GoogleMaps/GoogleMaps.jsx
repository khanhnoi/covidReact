import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { fetchMapCountries } from '../../api';
import { Button, Tooltip, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styles from './GoogleMaps.module.css';
import { css } from '@emotion/core';
import CircleLoader from 'react-spinners/CircleLoader';

const override = css`
	display: block;
	margin: 20px auto;
	border-color: red;
`;

const HtmlTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: '#0000',
		color: 'rgba(255, 255, 255, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: 'thin solid #000000'
	}
}))(Tooltip);

const stylesCustomMaps = [
	{ featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e9e9e9' }, { lightness: 17 }] },
	{ featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 20 }] },
	{ featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }, { lightness: 17 }] },
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }]
	},
	{ featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 18 }] },
	{ featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 16 }] },
	{ featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 21 }] },
	{ featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dedede' }, { lightness: 21 }] },
	{ elementType: 'labels.text.stroke', stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }] },
	{ elementType: 'labels.text.fill', stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }] },
	{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
	{ featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#f2f2f2' }, { lightness: 19 }] },
	{ featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#fefefe' }, { lightness: 20 }] },
	{
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }]
	}
];

const GoogleMaps = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchData() {
			const dataFetch = await fetchMapCountries();
			// console.log('dataFetch', dataFetch);
			setData(dataFetch);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
		fetchData();
	}, []);
	if (loading) {
		return (
			<div style={{ height: '100vh', width: '100%' }}>
				<CircleLoader css={override} size={150} color={'#123abc'} />
			</div>
		);
	} else
		return (
			<>
				<div style={{ height: '100vh', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: 'AIzaSyAiQX1yfcvHCeM98e6asi-Wi-Y_H4-V1Qw' }}
						defaultCenter={{
							lat: 16.071804859689813,
							lng: 108.14859628194488
						}}
						defaultZoom={5}
						options={
							{
								styles: stylesCustomMaps
							}
						}
					>
						{data.map(country => (
							<div
								className={styles.location}
								lat={country.lat}
								lng={country.lng}
								style={
									{
										// width: .007*country.deaths,
										// height: .007*country.deaths,
									}
								}
							>
								{/* <div className={styles.info}></div> */}
								<HtmlTooltip
									title={
										<React.Fragment>
											<Typography color="inherit">Thông Sô Covid</Typography>
											<h2 style={{ color: 'rgb(226, 226, 27)' }}>Nhiễm: {country.active}</h2>
											<h2 style={{ color: 'red' }}>Chết: {country.deaths}</h2>
										</React.Fragment>
									}
								>
									<Button>
										<img src={country.image} alt="" />
									</Button>
								</HtmlTooltip>
							</div>
						))}
					</GoogleMapReact>
				</div>
			</>
		);
};

export default GoogleMaps;
