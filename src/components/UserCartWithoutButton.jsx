import React, { useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import LoadingSpinner from "./LoadingSpinner";

function UserCartWithoutButton({ user }) {
  const [loadingUpdate, setloadingUpdate] = useState(false);
  var totalInvested = 0
  user.userInvested.forEach(element => {
    totalInvested +=Number(element)
  });

  return (
    <div
    className="m-4 border p-7 w-80 rounded-2xl"
    key={user.userID}
  >
    <p>{user.userID}</p>
    <p>{user.userName}</p>
    <p>{user.userEmail}</p>
    <p className="font-bold mb-10">
      Invested: {totalInvested} $
    </p>
  </div>
  );
}

export default UserCartWithoutButton;
