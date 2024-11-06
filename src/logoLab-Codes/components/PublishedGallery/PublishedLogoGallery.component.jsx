import React, { useContext, useMemo, useEffect, useState } from 'react';
import './PublishedLogoGallery.styles.less';
import { LogoContext } from '../../utilities/context/logos.context.jsx';
import { getFilesByUser, getAllFiles } from '../../utilities/firebase/firebase';
import ImageOverlay from './imageOverlay/ImageOverlay.component.jsx';

const PublishedLogoGallery = () => {
	const { logos, logoChanger, setLogos, setImageComments, imageComments } = useContext(LogoContext);
	const [selectedLogo, setSelectedLogo] = useState(null);

	useEffect(() => {
		const fetchLogos = async () => {
			const files = await getAllFiles();
			setLogos(files);
		};
		fetchLogos();
	}, [logoChanger, setLogos]);

	const publishedLogos = useMemo(() => {
		return logos
			.filter(logo => logo.status === 'published')
			.sort((a, b) => new Date(b.uploadTimestamp).getTime() - new Date(a.uploadTimestamp).getTime());
	}, [logos]);

	const handleLogoClick = logo => {
		setSelectedLogo(logo);
	};

	const closeOverlay = () => {
		setSelectedLogo(null);
	};

	return (
		<div className="published-logo-gallery">
			{publishedLogos.map(logo => (
				<div className="logo-container" key={logo.id} onClick={() => handleLogoClick(logo)}>
					<img src={logo.fileUrl} alt={logo.fileName} />
					<p>{logo.fileName}</p>
				</div>
			))}
			{selectedLogo && <ImageOverlay logo={selectedLogo} onClose={closeOverlay} />}
		</div>
	);
};

export default PublishedLogoGallery;
