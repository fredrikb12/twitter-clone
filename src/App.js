import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {
  const [user] = useAuthState(getAuth());

  console.log(user);

  useEffect(() => {
    console.log(getAuth().currentUser);
  }, []);

  function initFirebaseAuth() {
    //TODO: authStateObserver function
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        
      }
    });
  }

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
