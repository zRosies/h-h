"use client";

import styles from "@/app/dashboard/styles.module.scss";
import Image from "next/image";
import profileImg from "@/app/dashboard/jane-doe.png";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SubmitProduct from "../product/submitProduct";
import { EditForm } from "./editForm";

export default function DashboardHeader({ userInfo }: any) {
  const user: any = (userInfo && userInfo.userInfo) || [
    {
      first_name: undefined,
      last_name: undefined,
      image: undefined,
      description: undefined,
      level: undefined,
      // city: undefined,
    },
  ];

  // console.log(user);

  const [postForm, setAddOpen] = useState(false);
  const [editForm, setEditOpen] = useState(false);
  const [addProfileInfo, setAddProfileInfo] = useState(false);

  const handleCanPost = () => {
    const hasRequiredFields =
      userInfo.userInfo &&
      userInfo.userInfo.first_name !== undefined &&
      user.last_name !== undefined &&
      user.description !== undefined &&
      user.level !== undefined;

    if (!hasRequiredFields) {
      setAddProfileInfo(true);
    } else {
      setAddProfileInfo(false);
      setAddOpen(true);
    }
  };

  return (
    <div className={`${styles.dashboardHeader} mx-6`}>
      <div>
        <div className={styles.profile}>
          {user && user.image ? (
            <div className=" w-20 h-20 rounded-[50%]">
              <Image
                src={user.image}
                width={800}
                height={800}
                alt="Profile picture"
                className="w-20 h-20 rounded-[50%] object-fit"
              />
            </div>
          ) : (
            <p className="bg-black text-white p-5 w-20 h-20 rounded-[50%] items-center justify-center flex font-extrabold">
              {user && user.first_name ? (
                <>
                  {user.first_name.slice(0, 1)}
                  {user.last_name.slice(0, 1)}
                </>
              ) : (
                <>N/A</>
              )}
            </p>
          )}

          <div className={styles.userInfo}>
            {user ? (
              <p className="">
                {user.first_name}
                {"  "} {user.last_name}
              </p>
            ) : (
              <p className="">N/A</p>
            )}

            <span className="{styles.sellerBadge}">
              {user && (
                <>
                  {user.level ? (
                    <>
                      <p className="text-[.64rem] md:text-[.8rem] font-semibold bg-[#f9e8d5] rounded-[10px] p-1 my-2 text-center">
                        {user.level} crafter
                      </p>
                    </>
                  ) : (
                    <>
                      <p>N/A</p>
                    </>
                  )}
                </>
              )}
            </span>
          </div>
        </div>

        <div className={` text-[1.3rem] font-[800] md:text-[2.5rem]`}>
          Dashboard
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between mt-5">
        <div className="border-2 border-gray-200 max-w-[500px] h-[150px] w-full rounded-[8px]">
          <h3 className="border-b-2 px-3">About me</h3>
          {user && user.description ? (
            <p className="px-2">{user.description}</p>
          ) : (
            <p className="px-2">Add your description...</p>
          )}
        </div>

        <section className="max-w-[500px] w-full relative">
          <h3 className="text-[1rem] border-b-2 border-gray-300 font-bold my-2">
            Actions
          </h3>
          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center gap-2 w-full">
              <button
                className="bg-secondaryBlue p-3 hover:bg-secondary text-white  rounded-[6px] font-bold flex w-full justify-center"
                onClick={handleCanPost}
              >
                Add product
              </button>
              <button
                onClick={() => setEditOpen(true)}
                className=" bg-[#EDEDED] font-bold flex w-full justify-center items-center rounded-[6px]"
              >
                Edit profile
              </button>
              {postForm && (
                <SubmitProduct
                  userInfo={userInfo}
                  formType="POST"
                  setCardOpen={setAddOpen}
                />
              )}
              {addProfileInfo && (
                <section className="absolute bg-white flex flex-col justify-center max-w-[300px] rounded-[8px] shadow-md p-5">
                  Edit your profile adding more information before posting your
                  art.
                  <button
                    onClick={() => setAddProfileInfo(false)}
                    className="bg-secondary text-white p-2 my-4"
                  >
                    Okay
                  </button>
                </section>
              )}
            </div>
          </div>

          {/* <button className="flex bg-red-500 text-white justify-center rounded-[6px] font-bold my-2 w-full p-3">
            Delete account
          </button> */}
        </section>
      </div>
      <div>
        {editForm && (
          <EditForm
            userInfo={user}
            setCardOpen={setEditOpen}
            userId={userInfo.id}
          />
        )}
      </div>
    </div>
  );
}
