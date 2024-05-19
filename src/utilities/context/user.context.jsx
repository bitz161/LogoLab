import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  db,
} from "../../utilities/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  listUser: null,
  setListUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          setCurrentUser({
            uid: user.uid,
            ...userSnapshot.data(),
          });
        }
      } else {
        setCurrentUser(null);
      }
    };

    const unsubscribe = onAuthStateChangedListener((user) => {
      fetchUserData(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
