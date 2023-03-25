import React, {useState} from "react";
import { motion } from "framer-motion";
import moment from "moment";

import { GetDataToContext } from "../context/providerContext";
import { changeUserRole, getAllUsers, removeUser } from "../api";
import { setAllUsers } from "../context/reducer";
import { MdDelete } from "react-icons/md";

const DashboardUsers = () => {
  const { state } = GetDataToContext();

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div
        className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex 
                      flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3"
      >
        <div className="absolute top-4 left-4">
          <p className="text-xs font-semibold">
            Count :
            <span className="text-sm mx-1 font-bold text-textColor">
              {state?.allUsers.length}
            </span>
          </p>
        </div>

        {/* heading */}
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Name
          </p>

          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>

          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Verified
          </p>

          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Role
          </p>
        </div>

        {/* content */}
        {state &&
          state?.allUsers.map((data, index) => {
            return <DashboardUserCard key={index} data={data} index={index} />;
          })}
      </div>
    </div>
  );
};

export const DashboardUserCard = ({ data, index }) => {
  const { state, dispatch } = GetDataToContext();
  const [isAppearMenu, setIsAppearMenu] = useState(false)


  console.log(isAppearMenu)
  const handleChangeRoleUser = ({ user_id, role }) => {
    console.log({ user_id, role });
    changeUserRole(user_id, role).then((result) => {
      if (result) {
        setIsAppearMenu(false)
        getAllUsers().then((data) => {
          dispatch(setAllUsers(data.users));
        });
      }
    });
  };

  const deleteUser = (user_id) => {
    removeUser(user_id).then((data) => {
      if (data.message === "Delete User Successfully") {
        getAllUsers().then((data)=> {
          dispatch(setAllUsers(data.users))
        })
      }
    })
  };

  const isAppearChangeRoleUser = () => {
    setIsAppearMenu(!isAppearMenu);
  }

  const closeMenuChangeAdmin = () => {
    setIsAppearMenu(false);
  }

  const createdAtCustom = moment(new Date(data.createdAt)).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <motion.div
      className="relative w-full rounded-md flex items-center justify-between py-4 my-2 bg-lightOverlay
      cursor-pointer hover:border-card hover:shadow-md"
    >
      {data.user_id !== state?.user?.user?.user_id &&
        data.user_id !== "uBAb75KFXLgGil6bvscQ743imvr2" && (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
            onClick={() => deleteUser(data.user_id)}
          >
            <MdDelete className="text-xl text-red-400 hover:text-red-600" />
          </motion.div>
        )}

      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img
          src={data.picture}
          referrerPolicy="no-referrer"
          alt="None"
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>

      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email_verified}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {createdAtCustom}
      </p>
      {/* <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.role}</p> */}

      <div className="  w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor text-center cursor-text">{data.role}</p>
        {data.user_id !== state?.user?.user?.user_id &&
          data.user_id !== "uBAb75KFXLgGil6bvscQ743imvr2" && (
            <div
              // initial={{opacity: 0, translateY: 50}}
              // animate={{opacity: 1, translateY: 0}}
              // exit={{opacity: 0, translateY: 50}}
              // whileTap={{ scale: 0.27 }}
              className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 hover:shadow-sm cursor-pointer"
              onClick={() => isAppearChangeRoleUser()}
            >
              {data.role === "admin" ? "Member" : "Admin"}
            </div>
          )}

          {isAppearMenu && (
            <motion.div className=" absolute z-10 top-6 right-4 flex items-start flex-col gap-4 bg-slate-100 shadow-sm rounded-sm">
              <p className="text-textColor text-sm font-semibold">
                Do you want to mark the user as{" "}
                <span>{data.role === "admin" ? "Member" : "Admin"}</span>?
              </p>
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="outline-none border-none text-sm px-4 py-1
                rounded-md bg-blue-200 text-black hover:shadow-md"
                  onClick={() =>
                    handleChangeRoleUser({
                      user_id: data.user_id,
                      role: data.role === "admin" ? "member" : "admin",
                    })
                  }
                >
                  Yes
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="outline-none border-none text-sm px-4 py-1
                rounded-md bg-gray-200 text-black hover:shadow-md"
                onClick={closeMenuChangeAdmin}
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          )}

        
            
          
      </div>
    </motion.div>
  );
};

export default DashboardUsers;
