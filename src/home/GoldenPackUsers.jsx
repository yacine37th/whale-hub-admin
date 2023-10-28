// eslint-disable-next-line no-unused-vars
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
import UserCart from "../components/UserCart";
import LoadingSpinner from "../components/LoadingSpinner";
import HomeNavBar from "./HomeNavBar";
import UserCartWithoutButton from "../components/UserCartWithoutButton";
import GoldPackUsersChosen from "../components/GoldPackUsersChosen";

function GoldenPackUsers() {
  const [users, setusers] = useState([]);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [selectedUsersToWithdraw, setselectedUsersToWithdraw] = useState([]);

  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [withdrewPercentage, setwithdrewPercentage] = useState(0);
  const [withdrewPercentage2, setwithdrewPercentage2] = useState(0);

  const [totalin, settotalin] = useState(0);
  const q = query(
    collection(db, "users"),
    where("userIsAccepted", "==", true),
    where("userPack", "==", "GOLDEN PACK")
  );
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [loadingUpdate2, setloadingUpdate2] = useState(false);

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
        });      });
      setusers(userArray);
      //   console.log("====================================");
      //   console.log(users);
      //   // console.log(userArray.length);
      //   console.log("====================================");
      // console.log(userTotalInvested);
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
                Number of users Accepted GOLDEN PACK: {users?.length}
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
              <p className="text-xl my-6">{amount.toFixed(2)} $</p>
              <button
                className="w-1/4 max-md:w-1/2 p-4 button-background-register border-white   text-white  text-base
                  rounded-none  hover:border-white bg-blue-900"
                // onClick={() => {
                //   selectedUsers.forEach((user) => {
                //     let profit = (user.userInvested * amount2) / 100;
                //     console.log(profit);
                //   });
                // }}
                // onClick={async () => {
                //   if (amount === 0 || selectedUsers.length === 0) {
                //     alert(
                //       "Please fill the input with a valid Percentage and select the users"
                //     );
                //   } else {
                //     try {
                //       setloadingUpdate(true);
                //       selectedUsers.forEach(async (user) => {
                // let profit = (user.userInvested * amount2) / 100;
                //         await updateDoc(
                //           doc(collection(db, "users"), `${user.userID}`),
                //           {
                //             userEarnedTotal: arrayUnion(
                //               Number(profit.toFixed(2))
                //             ),
                //             userInvested: arrayUnion(Number(profit.toFixed(2))),
                //           }
                //         );
                //       });
                //       alert("Success");
                //     } catch (error) {
                //       console.log(error);
                //       alert("Error happened , please try again");
                //     } finally {
                //       setloadingUpdate(false);
                //     }
                //   }
                // }}
                onClick={async () => {
                  if (amount === 0 || selectedUsers.length === 0) {
                    alert(
                      "Please fill the input with a valid Percentage and select the users"
                    );
                  } else {
                    try {
                      setloadingUpdate(true);
                      selectedUsers.forEach(async (user) => {
                        var totalInvested = 0;
                        user.userInvested.forEach((element) => {
                          totalInvested += Number(element);
                        });
                        console.log((totalInvested * amount2) / 100);
                        await updateDoc(
                          doc(collection(db, "users"), `${user.userID}`),
                          {
                            userEarnedTotal: arrayUnion(
                              Number(
                                ((totalInvested * amount2) / 100).toFixed(2)
                              )
                            ),
                            userInvested: arrayUnion(
                              Number(
                                ((totalInvested * amount2) / 100).toFixed(2)
                              )
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

              {/* 
             
             //WITHDERW ////////////////////
             
             
             */}
              <div className="w-1/2 max-md:w-full mt-14">
                <input
                  type="text"
                  onChange={(e) => {
                    setwithdrewPercentage((Number(e.target.value) * totalin) / 100);
                    setwithdrewPercentage2(Number(e.target.value));
                  }}
                  className="border p-5 outline-none w-full"
                  placeholder="Percentage WITHDREW ..."
                />
              </div>
              <p className="text-xl my-6">{withdrewPercentage.toFixed(2)} $</p>
              <button
                className="w-1/4 max-md:w-1/2 p-4 button-background-register border-white   text-white  text-base
                  rounded-none  hover:border-white bg-blue-900"
                // withdrewPercentage2
                // onClick={() => {
                //   selectedUsersToWithdraw.forEach((user) => {
                //     let profit =
                //       (user.userInvested * withdrewPercentage2) / 100;
                //     console.log(profit);
                //   });
                // }}
                onClick={async () => {
                  if (
                    withdrewPercentage === 0 ||
                    selectedUsersToWithdraw.length === 0
                  ) {
                    alert(
                      "Please fill the input with a valid Percentage and select the users"
                    );
                  } else {
                    console.log(selectedUsersToWithdraw);
                    try {
                      setloadingUpdate2(true);
                      selectedUsersToWithdraw.forEach(async (user) => {
                        var totalInvested = 0;
                        user.userInvested.forEach((element) => {
                          totalInvested += Number(element);
                        });
                        await updateDoc(
                          doc(collection(db, "users"), `${user.userID}`),
                          {
                            userEarnedTotal: arrayUnion(
                              Number(
                                -(
                                  (totalInvested * withdrewPercentage2) /
                                  100
                                ).toFixed(2)
                              )
                            ),
                            userInvested: arrayUnion(
                              Number(
                                -(
                                  (totalInvested * withdrewPercentage2) /
                                  100
                                ).toFixed(2)
                              )
                            ),
                          }
                        );
                      });
                      alert("Success");
                    } catch (error) {
                      console.log(error);
                      alert("Error happened , please try again");
                    } finally {
                      setloadingUpdate2(false);
                    }
                  }
                }}
                // onClick={async () => {
                //   if (
                //     withdrewPercentage === 0 ||
                //     selectedUsersToWithdraw.length === 0
                //   ) {
                //     alert(
                //       "Please fill the input with a valid Percentage and select the users"
                //     );
                //   } else {
                //     console.log(selectedUsersToWithdraw);
                //     try {
                //       setloadingUpdate2(true);
                //       selectedUsersToWithdraw.forEach(async (user) => {
                // let profit =
                // (user.userInvested * withdrewPercentage2) / 100;
                //         await updateDoc(
                //           doc(collection(db, "users"), `${user.userID}`),
                //           {
                //             userEarnedTotal: arrayUnion(
                //               Number(-profit.toFixed(2))
                //             ),
                //             userInvested: arrayUnion(
                //               Number(-profit.toFixed(2))
                //             ),
                //           }
                //         );
                //       });
                //       alert("Success");
                //     } catch (error) {
                //       console.log(error);
                //       alert("Error happened , please try again");
                //     } finally {
                //       setloadingUpdate2(false);
                //     }
                //   }
                // }}
              >
                {loadingUpdate2 ? (
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
                    <GoldPackUsersChosen
                      key={user.userID}
                      user={user}
                      setselectedUsers={setselectedUsers}
                      selectedUsers={selectedUsers}
                      setselectedUsersToWithdraw={setselectedUsersToWithdraw}
                      selectedUsersToWithdraw={selectedUsersToWithdraw}
                    />
                  ))
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default GoldenPackUsers;
