"use client";

import { Info, UserInfo } from "@/app/product/[artId]/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export function EditForm({
  userInfo,
  setCardOpen,
  userId,
}: {
  userInfo: Info;
  setCardOpen: any;
  userId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitForm(e: any) {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const first_name = e.target.elements.first_name.value;
    const last_name = e.target.elements.last_name.value;
    const level = e.target.elements.level.value;
    const image = e.target.elements.image.files[0];
    const description = e.target.elements.description.value;

    let cloudnaryImage = undefined;

    if (image != undefined) {
      const formData = new FormData();

      formData.append("file", image);
      formData.append("upload_preset", "handcraft");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dygktir99/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());

      cloudnaryImage = response.secure_url;
    }

    const userInfo = {
      first_name: first_name,
      last_name: last_name,
      image: cloudnaryImage,
      level: level,
      description: description,
    };

    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (response.status === 200) {
      window.location.reload();
    }
  }

  return (
    <>
      <div
        className="w-full h-full fixed z-30 bg-[rgba(0,0,0,0.6)] left-0 top-0"
        onClick={() => setCardOpen((prevState: boolean) => !prevState)}
      ></div>
      <form
        onSubmit={submitForm}
        className="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[550px] flex flex-col shadow-lg w-full justify-center bg-white z-50 "
      >
        <section className="bg-white flex w-full flex-col p-4 gap-5 rounded-[10px]">
          <h1 className="border-b-2 border-gray-200">Edit profile</h1>
          <label htmlFor="first_name">
            First name:
            <input
              type="text"
              name="first_name"
              id="first_name"
              required
              className=" w-full border-2 border-gray-200"
              defaultValue={
                userInfo && userInfo.first_name ? userInfo.first_name : ""
              }
            />
          </label>
          <label htmlFor="last_name" className="w-full">
            Last name:
            <input
              type="text"
              name="last_name"
              id="last_name"
              required
              className=" w-full border-2 border-gray-200"
              defaultValue={
                userInfo && userInfo.last_name ? userInfo.last_name : ""
              }
            />
          </label>
          <label htmlFor="level" className="w-full">
            Select your level:
            <select
              name="level"
              id="level"
              defaultValue={userInfo && userInfo.level ? userInfo.level : ""}
              required
              className=" w-full border-2 border-gray-200"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </label>

          <label htmlFor="description" className="w-full">
            Description:
            <input
              type="text"
              name="description"
              id="description"
              required
              className=" w-full border-2 border-gray-200"
              defaultValue={
                userInfo && userInfo.description ? userInfo.description : ""
              }
            />
          </label>
          <label htmlFor="image" className="w-full">
            Optional:
            <input
              type="file"
              name="image"
              id="image"
              className=" w-full border-2 border-gray-200"
            />
          </label>
          <button
            type="submit"
            className="bg-secondary text-white p-[0.6rem] font-bold rounded-[6px] flex justify-center items-center"
          >
            Edit
            {isSubmitting && (
              <span className="animate-loading ml-2">
                <AiOutlineLoading />
              </span>
            )}
          </button>
        </section>
      </form>
    </>
  );
}
