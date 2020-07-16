import React, { useState, useEffect, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';
import { useParams, useHistory } from 'react-router';

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

const VideoDetail = () => {
	const [open, setOpen] = useState(false);
	const [url, setUrl] = useState('');
	const classes = useStyles();
	const { year, id, key } = useParams();
	let history = useHistory();

	// base urls for videos
	// const vimeo = 'https://vimeo.com/';
	const youtube = `https://www.youtube.com/embed/`;

	const handleClose = () => {
		setOpen(false);
		history.push(`/${year}/movie/${id}`);
	};

	// (`${youtube}${videos[0].key}`
	const handleOpen = useCallback(
		() => {
			setUrl(`${youtube}${key}`);
			setOpen(true);
		},
		[youtube, key]
	);

	useEffect(
		() => {
			document.title = `Movie Video`;
			handleOpen();
		},
		[handleOpen]
	);

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
				<Zoom in={open} timeout={300}>
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
				</Zoom>
			</Modal>
		</Fragment>
	);
};

VideoDetail.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string
};

export default VideoDetail;
