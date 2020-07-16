import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import MoviesListContainer from '../features/moviesList/MoviesListContainer';
import MovieDetails from 'features/movieDetails/MovieDetails';
import VideoDetails from 'features/videoDetails/VideoDetails';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router basename='/popular'>
					<Route exact path='/:year/movie/:id/video/:key' component={VideoDetails} />
					<Route path='/:year/movie/:id' component={MovieDetails} />
					<Switch>
						<Route path='/:year' component={MoviesListContainer} />
						<Route path='/' component={MoviesListContainer} />
					</Switch>
				</Router>
			</ThemeProvider>
		</React.Fragment>
	);
}

export default App;
