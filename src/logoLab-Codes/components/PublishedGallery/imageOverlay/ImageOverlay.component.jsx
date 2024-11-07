import React, { useState, useEffect, useContext } from 'react';
import { addComment, getCommentsByImage } from '../../../utilities/firebase/firebase';
import { LogoContext } from '../../../utilities/context/logos.context.jsx';
import { UserContext } from '../../../utilities/context/user.context.jsx';
import './ImageOverlay.styles.less';

const ImageOverlay = ({ logo, onClose }) => {
	const [newComment, setNewComment] = useState('');
	const { imageComments, setImageComments } = useContext(LogoContext);
	const { currentUser } = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchComments = async () => {
			if (logo) {
				setLoading(true);
				setError(null);
				try {
					console.log('Fetching comments for logo:', logo.id);
					const commentsData = await getCommentsByImage(logo.id);
					console.log('Fetched comments data:', commentsData);
					setImageComments(commentsData);
				} catch (error) {
					console.error('Error fetching comments:', error);
					setError('Failed to load comments. Please try again later.');
				} finally {
					setLoading(false);
				}
			}
		};
		fetchComments();
	}, [logo, setImageComments]);

	const handleSubmitComment = async e => {
		e.preventDefault();
		if (!newComment.trim() || !currentUser) return;

		try {
			setLoading(true);
			await addComment(logo.id, newComment.trim());
			const updatedComments = await getCommentsByImage(logo.id);
			setImageComments(updatedComments);
			setNewComment('');
		} catch (error) {
			console.error('Error adding comment:', error);
			setError('Failed to post comment. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (!logo) return null;

	return (
		<div className="image-overlay">
			<div className="comment-overlay-content">
				<button className="close-button" onClick={onClose}>
					✕
				</button>

				<div className="image-section">
					<img src={logo.fileUrl} alt={logo.fileName} />
				</div>

				<div className="details-section">
					<h2>{logo.fileName}</h2>
					<p>
						<strong>Creator:</strong> {logo.creatorName}
					</p>
					<p>
						<strong>Description:</strong> {logo.description || 'No description provided'}
					</p>

					<div className="comments-container">
						<h3>Comments</h3>

						{loading ? (
							<div className="loading-spinner">Loading comments...</div>
						) : error ? (
							<div className="error-message">{error}</div>
						) : imageComments && imageComments[0]?.imageComments ? (
							<>
								{imageComments[0].imageComments.length > 0 ? (
									imageComments[0].imageComments.map(comment => {
										const { commentId, userPhoto, userName, timestamp, text } = comment;
										return (
											<div key={commentId} className="comment-card">
												<div className="comment-header">
													<img
														src={userPhoto || '/default-avatar.png'}
														alt={userName}
														className="user-avatar"
													/>
													<span className="user-name">{userName}</span>
													<span className="comment-date">
														{new Date(timestamp).toLocaleDateString()}
													</span>
												</div>
												<p className="comment-text">{text}</p>
											</div>
										);
									})
								) : (
									<p className="no-comments">No comments yet.</p>
								)}
							</>
						) : (
							<p className="no-comments">No comments available.</p>
						)}

						{currentUser && (
							<div className="comment-form-container">
								<textarea
									value={newComment}
									onChange={e => setNewComment(e.target.value)}
									placeholder="Add a comment..."
									className="comment-input"
									disabled={loading}
								/>
								<button
									onClick={handleSubmitComment}
									disabled={loading || !newComment.trim()}
									className="post-button"
								>
									{loading ? 'Posting...' : 'Post Comment'}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageOverlay;

// import React, { useState, useEffect, useContext } from 'react';
// import { addComment, getCommentsByImage } from '../../../utilities/firebase/firebase';
// import { LogoContext } from '../../../utilities/context/logos.context.jsx';
// import { UserContext } from '../../../utilities/context/user.context.jsx';
// import './ImageOverlay.styles.less';

// const ImageOverlay = ({ logo, onClose }) => {
// 	const [newComment, setNewComment] = useState('');
// 	const { imageComments, setImageComments } = useContext(LogoContext);
// 	const { currentUser } = useContext(UserContext);
// 	const [loading, setLoading] = useState(true);

// 	console.log(logo.id);

// 	useEffect(() => {
// 		const fetchComments = async () => {
// 			if (logo) {
// 				try {
// 					console.log('Fetching comments for logo:', logo.id); // Trace fetch initiation
// 					const commentsData = await getCommentsByImage(logo.id);
// 					console.log('Fetched comments data:', commentsData); // Log fetched data
// 					setImageComments(commentsData);

// 					setTimeout(() => {
// 						setLoading(false);
// 						console.log('Loading completed. Current comments:', commentsData);
// 					}, 2000);
// 				} catch (error) {
// 					console.error('Error fetching comments:', error);
// 					setLoading(false);
// 				}
// 			}
// 		};
// 		fetchComments();
// 	}, [logo, setImageComments]);

// 	const handleSubmitComment = async e => {
// 		e.preventDefault();
// 		if (!newComment.trim() || !currentUser) return;

// 		try {
// 			await addComment(logo.id, newComment.trim());
// 			const updatedComments = await getCommentsByImage(logo.id);
// 			setImageComments(updatedComments);
// 			setNewComment('');
// 		} catch (error) {
// 			console.error('Error adding comment:', error);
// 		}
// 	};

// 	if (!logo) return null;

// 	return (
// 		<div className="image-overlay">
// 			<div className="comment-overlay-content">
// 				<button className="close-button" onClick={onClose}>
// 					✕
// 				</button>

// 				<div className="image-section">
// 					<img src={logo.fileUrl} alt={logo.fileName} />
// 				</div>

// 				<div className="details-section">
// 					<h2>{logo.fileName}</h2>
// 					<p>
// 						<strong>Creator:</strong> {logo.creatorName}
// 					</p>
// 					<p>
// 						<strong>Description:</strong> {logo.description || 'No description provided'}
// 					</p>

// 					<div className="comments-container">
// 						<h3>Comments</h3>

// 						{imageComments[0].imageComments.map(comment => {
// 							const { commentId, userPhoto, userName, timestamp, text } = comment;
// 							return (
// 								<div key={commentId} className="comment-card">
// 									<div className="comment-header">
// 										<img
// 											src={userPhoto || '/default-avatar.png'}
// 											alt={userName}
// 											className="user-avatar"
// 										/>
// 										<span className="user-name">{userName}</span>
// 										<span className="comment-date">{new Date(timestamp).toLocaleDateString()}</span>
// 									</div>
// 									<p className="comment-text">{text}</p>
// 								</div>
// 							);
// 						})}
// 						{imageComments[0].imageComments.length === 0 && <p className="no-comments">No comments yet.</p>}

// 						{currentUser && (
// 							<div className="comment-form-container">
// 								<textarea
// 									value={newComment}
// 									onChange={e => setNewComment(e.target.value)}
// 									placeholder="Add a comment..."
// 									className="comment-input"
// 								/>
// 								<button
// 									onClick={handleSubmitComment}
// 									disabled={!newComment.trim()}
// 									className="post-button"
// 								>
// 									Post Comment
// 								</button>
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ImageOverlay;
