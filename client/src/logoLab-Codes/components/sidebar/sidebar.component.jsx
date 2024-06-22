import './sidebar.styles.less';
import React from 'react';

const Sidebar = ({ setCommunityPosts }) => {
	const currentPosts = postsList => {
		console.log(postsList);
		setCommunityPosts(postsList);
	};

	return (
		<div className="sidebarContainer">
			<div onClick={() => currentPosts('home')}>Home</div>
			<div onClick={() => currentPosts('popular')}>Popular</div>
			<div onClick={() => currentPosts('mine')}>My Posts</div>
			<hr />
		</div>
	);
};

export default Sidebar;
