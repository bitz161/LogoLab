import React, { createContext, useEffect, useState } from 'react';
import { getFilesByUser } from '../firebase/firebase';

export const LogoContext = createContext({
	logos: null,
	setLogos: () => null,
	logoChanger: null,
	setLogoChanger: () => null,
});

export const LogoProvider = ({ children }) => {
	const [logos, setLogos] = useState([]);
	const [logoChanger, setLogoChanger] = useState(false);

	//TODO: Creating a logo http request

	const value = { logos, setLogos, logoChanger, setLogoChanger };
	return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
};
