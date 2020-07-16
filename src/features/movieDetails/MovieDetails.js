import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';

// The Movie DB API
import { fetchById } from '../../api/tmbdAPI';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: '80px auto 40px auto'
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: 342,
		maxHeight: 513,
		width: '100%'
	},
	noImage: {
		width: 342,
		height: 513,
		maxWidth: '100%',
		display: 'block',
		margin: 'auto',
		backgroundColor: '#dbdbdb',
		border: '1px solid #d7d7d7'
	},
	playButton: {
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	button: {
		marginBottom: theme.spacing(1)
	}
}));

const MovieDetailContainer = props => {
	const classes = useStyles();
	const [movie, setMovie] = useState({});
	const [videoKey, setVideoKey] = useState('');
	let { year, id } = useParams();
	let history = useHistory();
	let location = useLocation();

	// image url for image placeholder
	const noImageUrl =
		'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

	// Note: The API /discovery has poster urls that /details doesn't
	const fetchMovieById = useCallback(
		async () => {
			try {
				const payload = await fetchById(id);
				document.title = payload.title;
				history.replace(location);
				setMovie(payload);

				// array of videos
				const videos = payload.videos.results;

				// reset video state
				setVideoKey('');

				// check for a valid video
				if (videos[0]) setVideoKey(`${videos[0].key}`);
			} catch (error) {
				console.log(error);
			}
		},
		[id]
	);

	useEffect(
		() => {
			fetchMovieById();
		},
		[fetchMovieById]
	);

	const renderMoviePoster = () => {
		const posterPath = !!movie.poster_path ? movie.poster_path : '';
		return !!movie.poster_path ? (
			<img className={classes.img} alt={movie.title} src={`http://image.tmdb.org/t/p/w342/${posterPath}`} />
		) : (
			<img className={classes.noImage} alt='No Poster' src={noImageUrl} />
		);
	};

	return (
		<React.Fragment>
			<Container fixed>
				<Grow in={!!movie} timeout={500}>
					<Paper className={classes.paper}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={'auto'}>
								{renderMoviePoster()}
							</Grid>
							<Grid item xs={12} sm container>
								<Grid item xs container direction='column' spacing={2}>
									<Grid item xs>
										<Typography variant='h3'>{movie.title}</Typography>
										<Typography variant='h5' gutterBottom>
											Average Rating: {movie.vote_average}
										</Typography>
										<Typography variant='h6'>Overview</Typography>
										<Typography variant='body1' color='textSecondary'>
											{movie.overview}
										</Typography>
									</Grid>
									{videoKey && (
										<Fade in={!!videoKey} timeout={500}>
											<Button
												component={RouterLink}
												to={`/${year}/movie/${id}/video/${videoKey}`}
												variant='contained'
												className={classes.button}
												color='primary'
												aria-label='play video'>
												<Typography variant='body1'>Play Video</Typography>
												<PlayArrowRoundedIcon fontSize='large' />
											</Button>
										</Fade>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Grow>
			</Container>
		</React.Fragment>
	);
};

MovieDetailContainer.propTypes = {};

export default MovieDetailContainer;
