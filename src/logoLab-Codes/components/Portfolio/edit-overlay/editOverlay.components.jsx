import React, { useContext, useState } from 'react';
import './edit-overlay.styles.less';

const EditOverlay = ({ logo, onClose, onPublish }) => {
	const [price, setPrice] = useState(logo.price || '');
	const [fileName, setFileName] = useState(logo.fileName || '');
	const [description, setDescription] = useState(logo.description || '');

	const handlePublishClick = () => {
		onPublish({ price, fileName, description });
	};

	return (
		<div className="edit-overlay">
			<div className="overlay-content">
				<img className="overlay-image" src={logo.fileUrl} alt={logo.fileName} />
				<div className="edit-fields">
					<input
						type="text"
						value={fileName}
						onChange={e => setFileName(e.target.value)}
						placeholder="File Name"
					/>
					<input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
					<textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder="Description"
					></textarea>
				</div>
				<div className="buttons">
					<button onClick={handlePublishClick}>Publish</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</div>
	);
};

export default EditOverlay;
