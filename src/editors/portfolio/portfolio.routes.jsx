import React, { useContext, useEffect } from 'react';
import { LogoContext } from '../../logoLab-Codes/utilities/context/logos.context.jsx';
import { getFilesByUser } from '../../logoLab-Codes/utilities/firebase/firebase.js';
import PortfolioLanding from '../../logoLab-Codes/components/Portfolio/portfolio.components.jsx';

const Portfolio = () => {
	const { setLogos } = useContext(LogoContext);

	useEffect(() => {
		const fetchLogos = async () => {
			const files = await getFilesByUser();
			setLogos(files);
		};

		fetchLogos();
	}, []);

	return <PortfolioLanding />;
};

export default Portfolio;
