import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 444,
		maxHeight: 605,
		flexGrow: 1
	},
	noImage: {
		maxWidth: 342,
		maxHeight: 513,
		width: '100%',
		border: '1px solid #d7d7d7',
		backgroundColor: '#dbdbdb',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		objectFit: 'initial'
	}
});

const MovieListItem = ({ id, title, poster_path }) => {
	const classes = useStyles();
	const { year } = useParams();

	return (
		<Slide direction='up' in={!!id} mountOnEnter unmountOnExit>
			<Card className={classes.root}>
				<CardActionArea component={RouterLink} to={`/${year}/movie/${id}`}>
					{!!poster_path ? (
						<CardMedia
							component='img'
							alt={title}
							width='342'
							height='513'
							image={`http://image.tmdb.org/t/p/w342/${poster_path}`}
							title={title}
						/>
					) : (
						<CardMedia
							component='img'
							alt={title}
							width='342'
							height='513'
							className={classes.noImage}
							src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
						/>
					)}

					<CardContent>
						<Typography gutterBottom variant='h5' component='h5' noWrap={true}>
							{title}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Slide>
	);
};

MovieListItem.propTypes = {
	title: PropTypes.string.isRequired,
	poster_path: PropTypes.string
};

export default withRouter(MovieListItem);
