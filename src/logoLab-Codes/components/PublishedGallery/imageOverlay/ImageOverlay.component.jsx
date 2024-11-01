// ImageOverlay.jsx
import React from 'react';
import './ImageOverlay.styles.less';

const ImageOverlay = ({ logo, onClose }) => {
	if (!logo) return null;

	return (
		<div className="image-overlay">
			<div className="overlay-content">
				<button className="close-button" onClick={onClose}>
					✕
				</button>
				<div className="image-container">
					<img src={logo.fileUrl} alt={logo.fileName} />
				</div>
				<div className="details-container">
					<h2>{logo.fileName}</h2>
					<p>
						<strong>Creator:</strong> {logo.creatorName}
					</p>
					<p>
						<strong>Description:</strong> {logo.description || 'No description provided'}
					</p>
					<div className="comments-section">
						<h3>Comments</h3>
						{/* Placeholder for comments */}
						<p>This is where comments will go.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageOverlay;
