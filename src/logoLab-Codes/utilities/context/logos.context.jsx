import React, { createContext, useEffect, useState } from 'react';
import { getFilesByUser } from '../firebase/firebase';

export const LogoContext = createContext({
	logos: null,
	setLogos: () => null,
	logoChanger: null,
	setLogoChanger: () => null,
	imageComments: null,
	setImageComments: () => null,
});

export const LogoProvider = ({ children }) => {
	const [logos, setLogos] = useState([]);
	const [logoChanger, setLogoChanger] = useState(false);
	const [imageComments, setImageComments] = useState([]);

	//TODO: Creating a logo http request

	const value = { logos, setLogos, logoChanger, setLogoChanger, imageComments, setImageComments };
	return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
};
