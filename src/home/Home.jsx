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
import UserCart from "../components/UserCart";
import LoadingSpinner from "../components/LoadingSpinner";
import HomeNavBar from "./HomeNavBar";

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
      // console.log(users);
      // console.log(userArray.length);
      console.log("====================================");
    } catch (error) {
      console.log(error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <HomeNavBar />
      <div>
        <div className="px-20 max-[768px]:px-10">
          {loading ? (
            <div
              className="flex justify-center items-center   h-screen p-0
          "
            >
              {/* <div class=" flex justify-center items-center">
              <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
            </div> */}
              <LoadingSpinner width={"w-16"} height={"h-16"} />
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
                {users.length === 0 ? (
                  <div className="flex justify-center items-center flex-1 w-1/2 h-1/2 mt-11">
                    <p className="text-3xl">NO USER</p>
                  </div>
                ) : (
                  users
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.userEmail
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((user) => (
                      <UserCart
                        key={user.userID}
                        user={user}
                        users={users}
                        setusers={setusers}
                      />
                    ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
