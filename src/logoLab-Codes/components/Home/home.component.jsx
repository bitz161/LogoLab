import SearchBar from '../searchbar/searchbar.component.jsx';
import './home.styles.less';
import React, { useContext } from 'react';
import { UserContext } from '../../utilities/context/user.context.jsx';
import PublishedLogoGallery from '../PublishedGallery/PublishedLogoGallery.component.jsx';

const Home = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div className="homeContainer">
			<div className="contentContainer">
				<h2>
					{currentUser ? (
						`Hi ${currentUser.displayName}!`
					) : (
						<p>
							Elevate your brand with custom logos designed to make a lasting impact. Connect with top
							designers and start crafting your unique identity today.
						</p>
					)}
				</h2>
				{/* <SearchBar /> */}
			</div>
			{/* Sample text */}

			<div>
				<PublishedLogoGallery />
			</div>
		</div>
	);
};

export default Home;
