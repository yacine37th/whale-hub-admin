import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import spinner from "../assets/output-onlinegiftools.gif";

const Home = () => {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const q = query(collection(db, "users"));

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
    // return () => getdata();
    getdata();
  }, []);

  return (
    <div>
      <div className="">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <img src={spinner} alt="" />
          </div>
        ) : (
          <div className="flex flex-wrap">
            {users?.map((user) => (
              <div key={user.userID} className="m-4">
                <p>{user.userName}</p>
                <p>{user.userEmail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
