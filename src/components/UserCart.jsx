import React, { useState } from "react";
import spinner from "../assets/output-onlinegiftools.gif";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import LoadingSpinner from "./LoadingSpinner";

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
          // <div className="flex justify-center items-center h-full">
          //   <img src={spinner} alt="" className="w-14" />
          // </div>
          <div
          // className="flex justify-center items-center   h-screen p-0
          // "
          >
            {/* <div class=" flex justify-center items-center">
              <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
            </div> */}
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
