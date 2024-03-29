import React, { useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import LoadingSpinner from "./LoadingSpinner";

function UserCart({ user, users, setusers }) {
  const [loadingUpdate, setloadingUpdate] = useState(false);
  let total = 0;
  user.userInvested.forEach((item) => {
    total += item;
  });
  return (
    <div className="m-4 border p-7 w-80 rounded-2xl">
      <p>{user.userPack}</p>
      <p>{user.userName}</p>
      <p>{user.userEmail}</p>
      <p className="font-bold mb-10">Invested: {user.userInvested} $</p>
      <button
        disabled={total === 0}
        className={`
        ${total === 0 && "bg-red-800"}
        w-full p-4 button-background-register border-white  text-white  text-base
        rounded-none hover:border-white bg-blue-900`}
        onClick={async () => {
          try {
            setloadingUpdate(true);
            await updateDoc(doc(collection(db, "users"), `${user.userID}`), {
              userIsAccepted: true,
            });
            alert("The user has been accepted");
            setusers(users.filter((user2) => user2 !== user));
          } catch (error) {
            console.log(error);
            alert("Error happened , please try again");
          } finally {
            setloadingUpdate(false);
          }
        }}
      >
        {loadingUpdate ? (
          <div>
            <LoadingSpinner width={"w-5"} height={"h-5"} text={"Loading ..."} />
          </div>
        ) : (
          <p>Accept</p>
        )}
      </button>
    </div>
  );
}

export default UserCart;
