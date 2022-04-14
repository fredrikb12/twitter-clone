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

function App() {
  const [user] = useAuthState(getAuth());

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
          console.log("doc data:", usersSnap.data());
        } else {
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            tag: uniqid(),
            tweets: [],
            following: [],
            followers: [],
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

  return (
    <div>
      {user ? null : <SignIn />}
      <h1 onClick={() => console.log(user)}>App component</h1>
      {user && <Outlet context={[user]} />}
    </div>
  );
}

export default App;
