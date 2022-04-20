import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useOutletContext } from "react-router-dom";

function SignOut({user}) {
  function signOutUser() {
    signOut(getAuth());
  }

  return user !== null ? (
    <div>
      <button onClick={() => signOutUser()}>Sign Out</button>
    </div>
  ) : null;
}

export default SignOut;
