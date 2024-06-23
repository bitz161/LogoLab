import React, { useState, useContext } from 'react';
import Posts from '../posts/posts.component.jsx';
import Sidebar from '../sidebar/sidebar.component.jsx';
import './postPage.styles.less';
import { CommunityContext } from '../../utilities/context/community.context.jsx';
import { UserContext } from '../../utilities/context/user.context.jsx';

const PostPage = () => {
	const [communityPosts, setCommunityPosts] = useState('home');
	const [postDescription, setPostDescription] = useState('');
	const { postData, setPostData } = useContext(CommunityContext);
	const { currentUser } = useContext(UserContext);

	const handleInputChange = event => {
		setPostDescription(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();

		const newPost = {
			ID: postData.length + 1, // assuming postData is an array and IDs are sequential
			postDescription: postDescription,
			dateCreated: new Date().toISOString(),
			status: 'active',
			commentStatus: false,
			createdBy: {
				userID: currentUser.uid, // assuming a static user ID for the creator
				username: currentUser.displayName,
				displayProfile: currentUser.photoURL,
			},
			likedBy: [],
		};

		setPostData([...postData, newPost]);
		console.log(newPost);
		setPostDescription(''); // Clear the input field after submission
	};

	return (
		<div className="postpageContainer">
			<Sidebar setCommunityPosts={setCommunityPosts} />
			<section>
				<div className="post">
					<form onSubmit={handleSubmit}>
						<input
							placeholder="Enter Post"
							value={postDescription}
							onChange={handleInputChange}
							disabled={!currentUser}
						/>
						<div className="postButtonContainer">
							<button className="rounded-none" type="submit" disabled={!currentUser}>
								Submit
							</button>
							<button type="button" onClick={() => setPostDescription('')} disabled={!currentUser}>
								Clear
							</button>
						</div>
					</form>
				</div>
				<Posts communityPosts={communityPosts} />
			</section>
		</div>
	);
};

export default PostPage;
