import SearchBar from '../searchbar/searchbar.component.jsx';
import './home.styles.less';
import React from 'react';

const Home = () => {
	return (
		<div className="homeContainer">
			<div className="contentContainer">
				<h2>Hi User!</h2>
				<SearchBar />
			</div>
			{/* Sample text */}
			{/* Logos location */}
			<div></div>
		</div>
	);
};

export default Home;
