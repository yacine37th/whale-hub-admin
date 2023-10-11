import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Home = () => {
  const q = query(collection(db, "users"));
  const [users, setusers] = useState([]);
  const userArray = [];

  const getdata = async () => {
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
  };
  useEffect(() => {
    // return () => getdata();
    getdata();
  }, []);

  return (
    <div>
      {users?.map((user) => (
        <div key={user.userID}>
          <p>{user.userName}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
