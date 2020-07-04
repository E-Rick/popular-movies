import React from 'react';
import PropTypes from 'prop-types';
import MovieListItem from './MovieListItem';
import Grid from '@material-ui/core/Grid';

const MoviesList = ({ movies }) => {
	const renderedMovies = movies.map(movie => (
		<Grid item xs={6} md={4} lg={3}>
			<MovieListItem key={movie.id} {...movie} />
		</Grid>
	));

	return (
		<Grid container spacing={2}>
			{renderedMovies}
		</Grid>
	);
};

MoviesList.propTypes = {
	movies: PropTypes.array.isRequired
};

export default MoviesList;
