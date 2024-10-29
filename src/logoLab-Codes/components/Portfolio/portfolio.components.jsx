import React, { useContext } from 'react';
import { LogoContext } from '../../utilities/context/logos.context.jsx';
import './portfolio.styles.less';

const PortfolioLanding = () => {
	const { logos } = useContext(LogoContext);

	return (
		<div className="portfolio-container">
			<h2>CREATE IMPACT</h2>
			{logos.map((logo, index) => {
				const { creatorName, fileUrl, fileName } = logo;
				return (
					<div className="logo-container" key={index}>
						<img src={fileUrl} alt={`${creatorName}'s logo`} />
						<p>{fileName}</p>
					</div>
				);
			})}
		</div>
	);
};

export default PortfolioLanding;

//TODO: Create the styling and where I can edit the price and description
//TODO: Create a sorting for unpublish, publish and all
// TODO: Create a overlay if user decided to publish so they can edit the name and description
