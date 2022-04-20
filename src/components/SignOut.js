import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "./styled/Button.styled";

function SignOut({user}) {
  function signOutUser() {
    signOut(getAuth());
  }

  return user !== null ? (
    <div>
      <Button onClick={() => signOutUser()}>Sign Out</Button>
    </div>
  ) : null;
}

export default SignOut;
