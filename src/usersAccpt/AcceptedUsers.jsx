// eslint-disable-next-line no-unused-vars
import {
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
  
  function AcceptedUsers() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState("");
    const [amount, setAmount] = useState(0);
  
    const [totalin, settotalin] = useState(0);
    const q = query(collection(db, "users"), where("userIsAccepted", "==", true));
    const [loadingUpdate, setloadingUpdate] = useState(false);
  
    const userArray = [];
    var total = 0;
  
    const getdata = async () => {
      try {
        setloading(true);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (!userArray.includes(doc.data())) {
            userArray.push(doc.data());
          }
          total = total + doc.data().userInvested;
        });
        setusers(userArray);
        //   console.log("====================================");
        //   console.log(users);
        //   // console.log(userArray.length);
        //   console.log("====================================");
        //   console.log(total);
        settotalin(total);
        console.log((5*total)/100);
      } catch (error) {
        console.log(error.message);
      } finally {
        setloading(false);
      }
    };

    useEffect(() => {
      return () => getdata();
    }, []);
    return (
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
                Number of users Accepted : {users?.length}
                <p className="m-14">total {totalin} $ </p>
              </div>
              <input
                type="number"
                onChange={(e) => setAmount((e.target.value * totalin) / 100)}
                className="border p-5 outline-none"
                placeholder="Pourcentage"
              />
              {amount}
                <button className="border p-5"
                onClick={()=>{
                    
                }}
                >
                    done
                </button>
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
                    // eslint-disable-next-line react/jsx-key
                    <div
                      className="m-4 border p-7 w-80 rounded-2xl"
                      key={user.userID}
                    >
                      <p>{user.userName}</p>
                      <p>{user.userEmail}</p>
                      <p className="font-bold mb-10">
                        Invested: {user.userInvested} $
                      </p>
                      <button
                        className="w-full p-4 button-background-register border-white   text-white  text-base
                  rounded-none  hover:border-white bg-blue-900
                  
                  "
                        onClick={async () => {
                          try {
                            setloadingUpdate(true);
                            await updateDoc(
                              doc(collection(db, "users"), `${user.userID}`),
                              {
                                userIsAccepted: true,
                              }
                            );
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
                            <LoadingSpinner
                              width={"w-5"}
                              height={"h-5"}
                              text={"Loading ..."}
                            />
                          </div>
                        ) : (
                          <p>Accept</p>
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  
  export default AcceptedUsers;
  