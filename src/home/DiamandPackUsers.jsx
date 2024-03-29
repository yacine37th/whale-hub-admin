import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import LoadingSpinner from "../components/LoadingSpinner";
import HomeNavBar from "./HomeNavBar";
import UserCartWithoutButton from "../components/UserCartWithoutButton";

function DiamandPackUsers() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);

  const [totalin, settotalin] = useState(0);
  const q = query(
    collection(db, "users"),
    where("userIsAccepted", "==", true),
    where("userPack", "==", "DIAMAND PACK")
  );
  const [loadingUpdate, setloadingUpdate] = useState(false);

  const userArray = [];
  var userTotalInvested = 0;

  const getdata = async () => {
    try {
      setloading(true);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (!userArray.includes(doc.data())) {
          userArray.push(doc.data());
        }
        doc.data().userInvested.forEach((element) => {
          userTotalInvested += Number(element);
        });
        console.log(userTotalInvested);
      });
      setusers(userArray);
      settotalin(userTotalInvested.toFixed(2));
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
      <div className="px-20 max-[768px]:px-10">
        {loading ? (
          <div
            className="flex justify-center items-center   h-screen p-0
              "
          >
            <LoadingSpinner width={"w-16"} height={"h-16"} />
          </div>
        ) : (
          <>
            <div className=" pt-4 flex  max-[768px]:text-xl flex-col items-center">
              <p className="text-3xl max-md:text-lg">
                {" "}
                Number of users Accepted DIAMAND PACK : {users?.length}
              </p>
              <p className="m-4 font-semibold text-3xl max-md:text-lg">
                TOTAL INVESTED : {totalin} ${" "}
              </p>
              <div className="w-1/2 max-md:w-full">
                <input
                  type="text"
                  onChange={(e) => {
                    setAmount((Number(e.target.value) * totalin) / 100);
                    setAmount2(Number(e.target.value));
                  }}
                  className="border p-5 outline-none w-full"
                  placeholder="Percentage% ..."
                />
              </div>
              <p className="text-xl my-6">{amount} $</p>
              <button
                className="w-1/4 max-md:w-1/2 p-4 button-background-register border-white   text-white  text-base
                  rounded-none  hover:border-white bg-blue-900"
                onClick={async () => {
                  if (amount === 0) {
                    alert("Please fill the input with a valid Percentage");
                  } else {
                    try {
                      setloadingUpdate(true);
                      users.forEach(async (user) => {
                        var totalInvest = 0;
                        user.userInvested.forEach((element2) => {
                          totalInvest += element2;
                        });
                        await updateDoc(
                          doc(collection(db, "users"), `${user.userID}`),
                          {
                            userEarnedTotal: arrayUnion(
                              Number(((totalInvest * amount2) / 100).toFixed(2))
                            ),
                            userInvested: arrayUnion(
                              Number(((totalInvest * amount2) / 100).toFixed(2))
                            ),
                          }
                        );
                      });
                      alert("Success");
                    } catch (error) {
                      console.log(error);
                      alert("Error happened , please try again");
                    } finally {
                      setloadingUpdate(false);
                    }
                  }
                }}
              >
                {loadingUpdate ? (
                  <div>
                    <LoadingSpinner
                      width={"w-5"}
                      height={"h-5"}
                      text={"Confirmation ..."}
                    />
                  </div>
                ) : (
                  <p>Confirm</p>
                )}
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center">
              {users.length === 0 ? (
                <div className="flex justify-center items-center flex-1 w-1/2 h-1/2 mt-11">
                  <p className="text-3xl">NO USER ACCEPTED</p>
                </div>
              ) : (
                users
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
                    <UserCartWithoutButton key={user.userID} user={user} />
                  ))
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DiamandPackUsers;
