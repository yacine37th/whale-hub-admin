import React, { useState } from "react";
import spinner from "../assets/output-onlinegiftools.gif";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function UserCart({ user, users, setusers }) {
  const [loadingUpdate, setloadingUpdate] = useState(false);

  return (
    <div className="m-4 border p-7 w-80 rounded-2xl">
      <p>{user.userName}</p>
      <p>{user.userEmail}</p>
      <p className="font-bold mb-10">Invested: {user.userInvested} $</p>
      <button
        className="w-full p-4 button-background-register border-white   text-white  text-base
    rounded-none  hover:border-white bg-blue-900"
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
          <div className="flex justify-center items-center h-full">
            <img src={spinner} alt="" className="w-14" />
          </div>
        ) : (
          <p>Accept</p>
        )}
      </button>
    </div>
  );
}

export default UserCart;
