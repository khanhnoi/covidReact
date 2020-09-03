import React from 'react';
import { Card, Grid, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames'
import styles from './Cards.module.css';

const Cards = props => {
	console.log('props', props);
	const { data} = props;
	const { confirmed, recovered, deaths, lastUpdate} = data;
	if (!confirmed) {
		return 'Loanding....';
	}
	return (
		<div className={styles.container}>
			<Grid container spacing={5} justify="center">
				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{/* Infected */}
							Lây Nhiễm
						</Typography>
						<Typography variant="h5">
							<CountUp start={0} end={confirmed?.value} duration={2} separator="." />
						</Typography>
						<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
						<Typography variant="body2">Sô trường hợp lây nhiễm COVID-19</Typography>
					</CardContent>
				</Grid>

				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{/* Recovered */}
							Phục Hồi
						</Typography>
						<Typography variant="h5">
							<CountUp start={0} end={recovered?.value} duration={3} separator="." />
						</Typography>
						<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
						<Typography variant="body2">Sô trường hợp khỏi bệnh COVID-19</Typography>
					</CardContent>
				</Grid>

				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{/* Deaths */}
							Tử Vong
						</Typography>
						<Typography variant="h5">
							<CountUp start={0} end={deaths?.value} duration={4} separator="." />
						</Typography>
						<Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
						<Typography variant="body2">Sô trường hợp tử vong COVID-19</Typography>
					</CardContent>
				</Grid>
			</Grid>
		</div>
	);
};
export default Cards;
