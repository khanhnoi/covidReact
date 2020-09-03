import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel, FormHelperText, makeStyles } from '@material-ui/core';
import styles from './Country.module.css';
import { fetchCountries } from '../../api';

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));
const CountryPicker = props => {
	// const classes = useStyles();
	const { handleCountryChange } = props;
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			const countriesFetched = await fetchCountries();
			setCountries(countriesFetched);
		};
		fetchAPI();
	}, [setCountries]);
	// console.log('xxx', countries);
	return (
		<>
			<FormControl className={styles.formControl}>
				<h3>CHỌN VÙNG DỊCH:</h3>
				<NativeSelect  className={styles.nativeSelect} defaultValue="" onChange={e => handleCountryChange(e.target.value)}>
					<option value={'global'}>&nbsp; Toàn Cầu</option>
					{countries.map((country, index) => (
						<option key={index} value={country}>
							&nbsp; {country}
						</option>
					))}
				</NativeSelect>
			</FormControl>

			{/* <FormControl className={classes.formControl}>
				<InputLabel htmlFor="uncontrolled-native">Name</InputLabel>
				<NativeSelect
					defaultValue={30}
					inputProps={{
						name: 'name',
						id: 'uncontrolled-native'
					}}
				>
					<option value={10}>Ten</option>
					<option value={20}>Twenty</option>
					<option value={30}>Thirty</option>
				</NativeSelect>
				<FormHelperText>Uncontrolled</FormHelperText>
			</FormControl> */}
		</>
	);
};

export default CountryPicker;
