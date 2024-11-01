import React, { useState, useContext } from 'react';
import { LogoContext } from '../../utilities/context/logos.context.jsx';
import EditOverlay from './edit-overlay/editOverlay.components.jsx';
import { updateImageInfo } from '../../utilities/firebase/firebase.js';
import './portfolio.styles.less';
import { UserContext } from '../../utilities/context/user.context.jsx';

const PortfolioLanding = () => {
	const { logos, setLogoChanger, logoChanger } = useContext(LogoContext);
	const { currentUser } = useContext(UserContext);

	const [selectedLogo, setSelectedLogo] = useState(null);
	const [filterStatus, setFilterStatus] = useState('all');

	const handleOpenOverlay = logo => {
		setSelectedLogo(logo);
	};

	const handleCloseOverlay = () => {
		setSelectedLogo(null);
	};

	const handlePublish = updatedFields => {
		if (selectedLogo && selectedLogo.id) {
			updateImageInfo(selectedLogo.id, { ...updatedFields, status: 'published' })
				.then(() => {
					console.log('Document updated successfully');
					handleCloseOverlay();
				})
				.catch(error => {
					console.error('Error updating document:', error);
				});
		} else {
			console.error('No document ID provided for publishing.');
		}
		setLogoChanger(!logoChanger);
	};

	const filteredLogos = filterStatus === 'all' ? logos : logos.filter(logo => logo.status === filterStatus);

	return (
		<div className="portfolio-container">
			<h2>CREATE IMPACT</h2>

			<div className="filter-container">
				<label>
					<input
						type="radio"
						name="filter"
						value="all"
						checked={filterStatus === 'all'}
						onChange={() => setFilterStatus('all')}
					/>
					All
				</label>
				<label>
					<input
						type="radio"
						name="filter"
						value="published"
						checked={filterStatus === 'published'}
						onChange={() => setFilterStatus('published')}
					/>
					Published
				</label>
				<label>
					<input
						type="radio"
						name="filter"
						value="not-published"
						checked={filterStatus === 'not-published'}
						onChange={() => setFilterStatus('not published')}
					/>
					Not Published
				</label>
			</div>

			{filteredLogos.map((logo, index) =>
				logo.creatorID === currentUser.uid ? (
					<div className="logo-container" key={index} onClick={() => handleOpenOverlay(logo)}>
						{logo.status === 'published' && <span className="published-label">Published</span>}
						<img src={logo.fileUrl} alt={`${logo.creatorName}'s logo`} />
						<p>{logo.fileName}</p>
					</div>
				) : null,
			)}

			{selectedLogo && <EditOverlay logo={selectedLogo} onClose={handleCloseOverlay} onPublish={handlePublish} />}
		</div>
	);
};

export default PortfolioLanding;

// import React, { useState, useContext } from 'react';
// import { LogoContext } from '../../utilities/context/logos.context.jsx';
// import EditOverlay from './edit-overlay/editOverlay.components.jsx';
// import { updateImageInfo } from '../../utilities/firebase/firebase.js'; // Ensure this path matches your project structure
// import './portfolio.styles.less';

// const PortfolioLanding = () => {
// 	const { logos } = useContext(LogoContext);
// 	const [selectedLogo, setSelectedLogo] = useState(null);

// 	const handleOpenOverlay = logo => {
// 		setSelectedLogo(logo);
// 	};

// 	const handleCloseOverlay = () => {
// 		setSelectedLogo(null);
// 	};

// 	const handlePublish = updatedFields => {
// 		if (selectedLogo && selectedLogo.id) {
// 			// Update Firestore with new fields and set status to "published"
// 			updateImageInfo(selectedLogo.id, { ...updatedFields, status: 'published' })
// 				.then(() => {
// 					console.log('Document updated successfully');
// 					handleCloseOverlay();
// 				})
// 				.catch(error => {
// 					console.error('Error updating document:', error);
// 				});
// 		} else {
// 			console.error('No document ID provided for publishing.');
// 		}
// 	};

// 	return (
// 		<div className="portfolio-container">
// 			<h2>CREATE IMPACT</h2>

// 			{logos.map((logo, index) => (
// 				<div className="logo-container" key={index} onClick={() => handleOpenOverlay(logo)}>
// 					{logo.status === 'published' && <span className="published-label">Published</span>}
// 					<img src={logo.fileUrl} alt={`${logo.creatorName}'s logo`} />
// 					<p>{logo.fileName}</p>
// 				</div>
// 			))}

// 			{selectedLogo && <EditOverlay logo={selectedLogo} onClose={handleCloseOverlay} onPublish={handlePublish} />}
// 		</div>
// 	);
// };

// export default PortfolioLanding;

//TODO: Create the styling and where I can edit the price and description
//TODO: Create a sorting for unpublish, publish and all
// TODO: Create a overlay if user decided to publish so they can edit the name and description

// 1. If status is equals to "published" then there should be a text inside the image at the upper left of it saying "Published"
// 2. Create a sorting system for Publish, not publish and all
// 3. I'm planning on creating a UI with a feature that when you click the image it will zoom in the image and show some text box where I can edit the price, status, filename and description
