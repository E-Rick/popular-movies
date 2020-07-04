import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useParams } from 'react-router';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	videoWrapper: {
		padding: '25px auto 56.25% auto',
		position: 'relative',
		width: 1000,
		height: '40%',
		margin: '0px auto'
	}
}));

const VideoDetail = props => {
	const [open, setOpen] = useState(false);
	const [url, setUrl] = useState('');
	const classes = useStyles();
	const { year, id, key } = useParams();

	// base urls for videos
	// const vimeo = 'https://vimeo.com/';
	const youtube = `https://www.youtube.com/embed/`;

	// (`${youtube}${videos[0].key}`
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		props.history.push(`/${year}/movie/${id}`);
		setOpen(false);
	};

	const checkUrl = () => {
		if (key) {
			setUrl(`${youtube}${key}`);
			handleOpen();
		}
	};

	useEffect(() => {
		checkUrl();
		return () => {
			handleClose();
		};
	}, []);

	return (
		<Fragment>
			<Modal
				aria-labelledby='modal-movie-video'
				aria-describedby='video-for-selected-movie'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}>
				<Fade in={open} timeout={1000}>
					<div className={classes.videoWrapper}>
						<iframe
							title={'Movie Video'}
							width='100%'
							height='100%'
							src={url}
							frameBorder='0'
							allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
						/>
					</div>
				</Fade>
			</Modal>
		</Fragment>
	);
};

VideoDetail.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string
};

export default withRouter(VideoDetail);
