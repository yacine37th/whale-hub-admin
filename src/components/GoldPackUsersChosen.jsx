import React, { useState } from "react";

function GoldPackUsersChosen({
  user,
  setselectedUsers,
  selectedUsers,
  setselectedUsersToWithdraw,
  selectedUsersToWithdraw,
}) {
  var totalInvested = 0;
  user.userInvested.forEach((element) => {
    totalInvested += Number(element);
  });
  return (
    <div className="m-4 border p-7 w-80 rounded-2xl" key={user.userID}>
      <div className="flex items-center justify-between mb-4  flex-1">
        <div className="flex flex-col items-center">
          <label htmlFor="default-checkbox" className="font-bold">
            Profits
          </label>
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 cursor-pointer dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => {
              if (e.target.checked) {
                setselectedUsers([...selectedUsers, user]);
              } else {
                setselectedUsers(
                  selectedUsers.filter((use) => use.userID !== user.userID)
                );
              }
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="default-checkbox1" className="font-bold">
            withdraw
          </label>
          <input
            id="default-checkbox1"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 cursor-pointer dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => {
              if (e.target.checked) {
                setselectedUsersToWithdraw([...selectedUsersToWithdraw, user]);
              } else {
                setselectedUsersToWithdraw(
                  selectedUsersToWithdraw.filter(
                    (use) => use.userID !== user.userID
                  )
                );
              }
            }}
          />
        </div>
      </div>
      <p>{user.userID}</p>
      <p>{user.userName}</p>
      <p>{user.userEmail}</p>
      <p className="font-bold mb-10">Invested: {totalInvested.toFixed(2)} $</p>
    </div>
  );
}

export default GoldPackUsersChosen;
