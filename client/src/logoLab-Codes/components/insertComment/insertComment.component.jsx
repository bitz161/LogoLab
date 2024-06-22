import React, { useContext, useState } from 'react';
import './insertComment.styles.less';
import { CommunityContext } from '../../utilities/context/community.context.jsx';
import { UserContext } from '../../utilities/context/user.context.jsx';
import sendIcon from '../../resources/images/send.svg';

const InsertComment = ({ postID }) => {
	const [postComment, setPostComment] = useState('');
	const { commentData, setCommentData } = useContext(CommunityContext);
	const { currentUser } = useContext(UserContext);

	const handleInputChange = event => {
		setPostComment(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();

		const newComment = {
			commentID: commentData.length + 1,
			postID: postID,
			commentText: postComment,
			dateCreated: new Date().toISOString(),
			createdBy: {
				userID: currentUser.uid,
				username: currentUser.displayName,
				displayProfile: currentUser.photoURL,
			},
		};

		setCommentData([...commentData, newComment]);
		// console.log(newComment);
		setPostComment(''); // Clear the input field after submission
	};

	return (
		<div className="insertCommentContainer">
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Enter Comment"
					value={postComment}
					onChange={handleInputChange}
					disabled={!currentUser}
				/>
				<div className="CommentButtonContainer">
					<button type="submit" disabled={!postComment}>
						<img
							src={sendIcon}
							alt=""
							className="rounded-none"
							// type="submit"
							disabled={!currentUser}
						/>
						{/* TODO: if submitted, automatically open comment section*/}
					</button>
				</div>
			</form>
		</div>
	);
};

export default InsertComment;
