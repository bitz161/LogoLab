import React, { useState, useEffect, useContext } from 'react';
import './posts.styles.less';
import Comments from '../comments/comments.components.jsx';
import { CommunityContext } from '../../utilities/context/community.context.jsx';
import { UserContext } from '../../utilities/context/user.context.jsx';
import InsertComment from '../insertComment/insertComment.component.jsx';

const Posts = ({ communityPosts }) => {
	const { postData, commentData, setPostData } = useContext(CommunityContext);
	const [sortedPosts, setSortedPosts] = useState([]);
	const { currentUser } = useContext(UserContext);

	useEffect(() => {
		let sortedPosts;

		if (communityPosts === 'home') {
			sortedPosts = postData.slice().sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
		} else if (communityPosts === 'popular') {
			sortedPosts = postData.slice().sort((a, b) => {
				// Sort first by the number of likes (descending)
				const likesComparison = b.likedBy.length - a.likedBy.length;
				if (likesComparison !== 0) {
					return likesComparison;
				}
				// If likes are equal, sort by dateCreated (descending)
				return new Date(b.dateCreated) - new Date(a.dateCreated);
			});
		} else {
			// Assuming the condition is for posts created by the current user
			sortedPosts = postData
				.slice()
				.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
				.filter(data => data.createdBy.userID === currentUser.uid);
		}

		setSortedPosts(sortedPosts);
	}, [postData, communityPosts, currentUser]);

	//change the status of the comment if show or not
	const enableComment = id => {
		const updatedPostData = postData.map(post =>
			post.ID === id ? { ...post, commentStatus: !post.commentStatus } : post,
		);
		setPostData(updatedPostData);
	};

	const likePost = id => {
		if (!currentUser) {
			return;
		}

		const updatedPostData = postData.map(post => {
			// console.log(post.likedBy.length);
			if (post.ID === id) {
				const likedIndex = post.likedBy.findIndex(like => like.userID === currentUser.uid);
				if (likedIndex !== -1) {
					// User already liked the post, remove the like
					const updatedLikedBy = post.likedBy.filter(like => like.userID !== currentUser.uid);
					return {
						...post,
						likedBy: updatedLikedBy,
					};
				} else {
					// User hasn't liked the post yet, add the like
					return {
						...post,
						likedBy: [
							...post.likedBy,
							{
								userID: currentUser.uid,
								username: currentUser.displayName,
								displayProfile: currentUser.displayProfile,
							},
						],
					};
				}
			} else {
				return post;
			}
		});
		setPostData(updatedPostData);
	};

	return (
		<div className="postsContainer">
			{sortedPosts.map((data, index) => {
				return (
					<div className="postsContentsContainer" key={data.ID}>
						<div className="posterInfoContainer">
							<img
								src={
									data.createdBy.displayProfile
										? data.createdBy.displayProfile
										: `https://robohash.org/${data.createdBy.userID}?set=set2`
								}
								alt="Poster Avatar"
							/>
							<div>{data.createdBy.username}</div>
						</div>
						<p>{data.postDescription}</p>
						<hr />
						<div>
							<div onClick={() => likePost(data.ID)}>
								{data.likedBy.length} Liked
								{/* TODO: Fix like counting */}
							</div>
							<div onClick={() => enableComment(data.ID)}>Comment</div>
						</div>
						<div>
							{data.commentStatus && (
								<Comments commentDatas={commentData} postID={data.ID} enableComment={enableComment} />
							)}
						</div>

						<InsertComment postID={data.ID} />
					</div>
				);
			})}
		</div>
	);
};

export default Posts;
