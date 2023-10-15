import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import spinner from "../assets/output-onlinegiftools.gif";
import UserCart from "../component/UserCart";

const Home = () => {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const q = query(
    collection(db, "users"),
    where("userIsAccepted", "==", false)
  );

  const userArray = [];

  const getdata = async () => {
    try {
      setloading(true);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (!userArray.includes(doc.data())) {
          userArray.push(doc.data());
        }
      });
      setusers(userArray);
      console.log("====================================");
      console.log(users);
      // console.log(userArray.length);
      console.log("====================================");
    } catch (error) {
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div className="px-20 max-[768px]:px-10">
        {loading ? (
          <div className="flex justify-center items-center h-full flex-1">
            <div>
              <img src={spinner} alt="" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-3xl pt-4 flex justify-center max-[768px]:text-xl">
              Number of users : {users?.length}
            </div>
            {/* <input
              type="text"
              onChange={(e) => setsearch(e.target.value)}
              className="border p-5 outline-none"
              placeholder="Search ...."
            /> */}

            <div className="flex flex-wrap justify-center items-center">
              {users
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.userEmail.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((user) => (
                  // <div
                  //   key={user.userID}
                  //   className="m-4 border p-7 w-80 rounded-2xl"
                  // >
                  //   <p>{user.userName}</p>
                  //   <p>{user.userEmail}</p>
                  //   <p className="font-bold mb-10">
                  //     Invested: {user.userInvested} $
                  //   </p>
                  //   <button
                  //     className="w-full p-4 button-background-register border-white   text-white  text-base
                  //   rounded-none  hover:border-white bg-blue-900"
                  //     onClick={async () => {
                  //       try {
                  //         setloadingUpdate(true);
                  //         await updateDoc(
                  //           doc(collection(db, "users"), `${user.userID}`),
                  //           {
                  //             userIsAccepted: true,
                  //           }
                  //         );
                  //         alert("The user has been accepted");
                  //         setusers(users.filter((user2) => user2 !== user));
                  //       } catch (error) {
                  //         console.log(error);
                  //         alert("Error happened , please try again");
                  //       } finally {
                  //         setloadingUpdate(false);
                  //       }
                  //     }}
                  //   >
                  //     {loadingUpdate ? (
                  //       <div className="flex justify-center items-center h-full">
                  //         <img src={spinner} alt="" className="w-14" />
                  //       </div>
                  //     ) : (
                  //       <p>Accept</p>
                  //     )}
                  //   </button>
                  // </div>
                  <UserCart
                    key={user.userID}
                    user={user}
                    users={users}
                    setusers={setusers}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
