import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useOutletContext } from "react-router-dom";
import Button from "./Button";

function SignOut({ user }) {
  function signOutUser() {
    signOut(getAuth());
  }

  return user !== null ? (
    <div>
      <Button text={"Sign Out"} onClick={() => signOutUser()}></Button>
    </div>
  ) : null;
}

export default SignOut;
