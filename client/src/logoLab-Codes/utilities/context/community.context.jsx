import React, { createContext, useState } from 'react';
import postDatas from '../../resources/postData.json';
import commentDatas from '../../resources/commentData.json';

export const CommunityContext = createContext({
	postData: null,
	setPostData: () => null,
	commentData: null,
	setCommentData: () => null,
});

export const CommunityProvider = ({ children }) => {
	const [postData, setPostData] = useState([...postDatas]);
	const [commentData, setCommentData] = useState([...commentDatas]);
	const value = { postData, setPostData, commentData, setCommentData };

	return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};
