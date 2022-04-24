import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import uniqid from "uniqid";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDB } from "./firebase";
import StyledMainContainer from "./components/styled/StyledMainContainer";
import StyledHomepageContainer from "./components/styled/StyledHomepageContainer";
import StyledLeftSidebar from "./components/styled/StyledLeftSidebar";
import StyledRightSidebar from "./components/styled/StyledRightSidebar";
import RightSidebar from "./components/RightSidebar";
import LeftSidebar from "./components/LeftSidebar";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./components/styled/GlobalStyle";

function App() {
  const [user] = useAuthState(getAuth());

  const [blueTheme, setBlueTheme] = useState(true);

  const theme = {
    clr: {
      textPrimary: blueTheme ? "#f9f9f9" : "#c9e2f2",
      textSecondary: blueTheme ? "#cbc8c8" : "#c4ced4",
      buttonBg: blueTheme ? "#0698f9" : "#60bdfb",
      buttonText: blueTheme ? "#d7eefe" : "#b1defb",
      background: blueTheme ? "#15202B" : "#0a0f15",
    },
  };

  function initFirebaseAuth() {
    //TODO: authStateObserver function
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const db = getDB();
        //const usersRef = collection(getDB(), "users");
        // const q = query(usersRef, where("uid", "==", user.uid))
        const usersRef = doc(db, "users", user.uid);
        const usersSnap = await getDoc(usersRef);
        if (usersSnap.exists()) {
        } else {
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            tag: uniqid(),
            tweets: [],
            following: [],
            followers: [],
            bio: "",
          });
          const data = await getDoc(usersRef);
          console.log(data.data());
        }
      } else {
        console.log("no user");
      }
    });
  }

  useEffect(() => {
    initFirebaseAuth();
  }, []);

  // Triggers when the auth state change for instance when the user signs-in or signs-out.
  function authStateObserver(user) {
    console.log(user);
    if (user) {
      console.log(user, "is signed in");
      // User is signed in!
      // Get the signed-in user's profile pic and name.
      /*var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');*/
    }
  }
  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledHomepageContainer>
          <LeftSidebar user={user} />
          <div>
            <StyledMainContainer>
              {user && <Outlet context={[user]} />}
            </StyledMainContainer>
          </div>
          <StyledRightSidebar>
            <RightSidebar user={user} />
          </StyledRightSidebar>
        </StyledHomepageContainer>
      </ThemeProvider>
    );
  } else {
    return <SignIn />;
  }
}

export default App;
