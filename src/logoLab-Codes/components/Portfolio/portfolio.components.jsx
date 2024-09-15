import React, { useContext } from 'react';
import { LogoContext } from '../../utilities/context/logos.context.jsx';

const PortfolioLanding = () => {
	const { logos } = useContext(LogoContext);

	console.log(logos);
	return (
		<div className="portfolioContainer">
			{logos.map(logo => {
				const { creatorName, fileUrl } = logo;
				return (
					<div>
						<img src={fileUrl} alt="" />
						<p>{creatorName}</p>
					</div>
				);
			})}
		</div>
	);
};

export default PortfolioLanding;

//TODO: Create the styling and where I can edit the price and description
