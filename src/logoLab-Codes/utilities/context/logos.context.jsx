import React, { createContext, useEffect, useState } from 'react';
import { getFilesByUser } from '../firebase/firebase';

export const LogoContext = createContext({
	logos: null,
	setLogos: () => null,
});

export const LogoProvider = ({ children }) => {
	const [logos, setLogos] = useState([]);

	//TODO: Creating a logo http request

	const value = { logos, setLogos };
	return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
};

//Temporary HTTP request

// const [searchField, setSearchField] = useState("");
// const [monsters, setMonsters] = useState([]);
// const [filteredMonsters, setFilteredMonsters] = useState(monsters);

// useEffect(() => {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((users) => {
//       setMonsters(users);
//     });
// }, []);

// useEffect(() => {
//   const newFilteredMonster = monsters.filter((monster) => {
//     return monster.name.toLocaleLowerCase().includes(searchField);
//   });
//   setFilteredMonsters(newFilteredMonster);
// }, [monsters, searchField]);

// const onSearchChange = (event) => {
//   const searchFieldString = event.target.value.toLocaleLowerCase();
//   setSearchField(searchFieldString);
// };
