import React, { useState } from "react";

function DiamandPackUsersChosen({ user, setselectedUsers, selectedUsers }) {
  const [loadingUpdate, setloadingUpdate] = useState(false);
  return (
    <div className="m-4 border p-7 w-80 rounded-2xl" key={user.userID}>
      <div className="flex-1 flex justify-end p-4">
        <div className="flex items-center mb-4">
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
      </div>
      <p>{user.userID}</p>
      <p>{user.userName}</p>
      <p>{user.userEmail}</p>
      <p className="font-bold mb-10">Invested: {user.userInvested} $</p>
    </div>
  );
}

export default DiamandPackUsersChosen;
