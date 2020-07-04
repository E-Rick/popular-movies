import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

// Material UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

// Components
import MoviesList from './MoviesList';

// The Movie DB API
import { fetchByYear } from '../../api/tmbdAPI';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: 300
	},
	margin: {
		height: theme.spacing(3)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 140,
		maxHeight: 56
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

const MoviesListContainer = props => {
	const [movies, setMovies] = useState([]);
	const [sortBy, setSortBy] = useState('desc');
	const [year, setYear] = useState('2020');
	const classes = useStyles();

	const fetchMoviesByYear = async (year, sortValue) => {
		try {
			props.history.push(`/${year}`);
			const payload = await fetchByYear(year, sortValue);
			setMovies(payload);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(
		() => {
			fetchMoviesByYear(year, sortBy);
		},
		[year, sortBy]
	);

	const handleSortChange = event => {
		setSortBy(event.target.value);
	};
	const handleYearChange = event => {
		setYear(event.target.value);
	};

	const renderMovieFilter = () => {
		return (
			<Grid justify={'flex-end'} container style={{ margin: '8px auto 16px auto' }}>
				<Grid item xs={6} sm={'auto'}>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel id='filter-release-year-label'>Release Year</InputLabel>
						<Select
							labelId='filter-release-year-label'
							id='filter-release-year'
							value={year}
							onChange={handleYearChange}
							label='Release Year'>
							<MenuItem value={2020}>
								<Typography variant='subtitle1'>2020</Typography>
							</MenuItem>
							<MenuItem value={2019}>
								<Typography variant='subtitle1'>2019</Typography>
							</MenuItem>
							<MenuItem value={2018}>
								<Typography variant='subtitle1'>2018</Typography>
							</MenuItem>
							<MenuItem value={2017}>
								<Typography variant='subtitle1'>2017</Typography>
							</MenuItem>
							<MenuItem value={2016}>
								<Typography variant='subtitle1'>2016</Typography>
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} sm={'auto'}>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel id='filter-sort-order-label'>Sort Order</InputLabel>
						<Select
							labelId='filter-sort-order-label'
							id='filter-release-year'
							value={sortBy}
							onChange={handleSortChange}
							label='Sort Order'>
							<MenuItem value={'desc'}>
								<ArrowDownwardIcon />
							</MenuItem>
							<MenuItem value={'asc'}>
								<ArrowUpwardIcon />
							</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		);
	};

	return (
		<React.Fragment>
			<Container fixed style={{ marginBottom: '80px' }}>
				<Typography variant='h3' component='h2' style={{ margin: '40px 0px 16px 0px' }}>
					Popular Movies
				</Typography>
				{renderMovieFilter()}
				<MoviesList movies={movies} />
			</Container>
		</React.Fragment>
	);
};

MoviesListContainer.propTypes = {};

export default withRouter(MoviesListContainer);
