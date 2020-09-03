import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = props => {
	const { data, country } = props;
	const [dailyData, setDailyData] = useState([]);
	// const [arrLabel, setArrLabel] = useState([]);
	// const [arrConfirmed, setArrConfirmed] = useState([]);
	// const [arrDeaths, setArrDeaths] = useState([]);

	const lineChart = () => {
		console.log('dailyData');
		const arrLabel = dailyData.map(({ date }) => date.split('-').reverse().join('-'));
		const arrConfirmed = dailyData.map(({ confirmed }) => confirmed);
		const arrDeaths = dailyData.map(({ deaths }) => deaths);
		if (dailyData.length && arrLabel.length && arrConfirmed.length && arrDeaths.length)
			return (
				<Line
					data={{
						labels: arrLabel,
						datasets: [
							{
								data: arrConfirmed,
								label: 'Lây Nhiễm',
								borderColor: 'rgb(226, 226, 27)',
								backgroundColor: 'rgba(226, 226, 27, 0.5)',
								fill: true
							},
							{
								data: arrDeaths,
								label: 'Tử Vong',
								borderColor: 'red',
								backgroundColor: 'rgba(255, 0,0, 0.5)',
								fill: true
							}
						]
					}}
				/>
			);
		return null;
	};

	const barChart = () => data.confirmed ? (
		<Bar
			data={{
				labels: ['Lây Nhiếm', 'Hồi Phục', ' Tử Vong'],
				datasets: [
					{
						label: "Số Người:",
						backgroundColor: ['rgb(226, 226, 27)', 'rgb(0, 255, 0)', 'rgb(216, 76, 11)'],
						data: [data?.confirmed?.value, data?.recovered?.value, data?.deaths?.value]
					}
				]
			}}
			options={{
				legend: { display: false },
				title: {
					display: false,
					text: `Sơ Đồ Thống kê`
				}
			}}
		/>
	) : null;

	useEffect(() => {
		const fetchAPI = async () => {
			const dailyDataFetched = await fetchDailyData();
			setDailyData(dailyDataFetched);
			// const arrLabel = dailyDataFetched.map(({ date }) => date);
			// const arrConfirmed = dailyDataFetched.map(({ confirmed }) => confirmed);
			// const arrDeaths = dailyDataFetched.map(({ deaths }) => deaths);
		};
		// console.log('dailyData');
		// console.log(dailyData);
		fetchAPI();
	}, []);
	return (
		<>
			<div className={styles.container}>{country && country !=='' && country !=='global' ? barChart() : lineChart()}</div>
		</>
	);
};

export default Chart;
