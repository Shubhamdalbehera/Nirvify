import React from "react";
import { assets } from "../assets/assets";

const Upload = () => {
  return (
    <>
      <div className=" flex-1 h-screen overflow-y-scroll bg-[#eeeeee] mt-3 p-5 bg-gradient-to-b from-[#212121] to-gray-800">
        <div className="flex items-start gap-10 text-white">
          <form className="flex flex-col items-start gap-8 pl-3 w-[50%] ">
            <h2 className="text-xl font-semibold text-center mb-4 w-full underline ">
              Podcast Details
            </h2>
            <div className="flex flex-col gap-4">
              <p>Upload Image</p>
              <input type="file" id="image" accept="image/*" hidden />
              <label htmlFor="image">
                <img
                  className="w-24 cursor-pointer"
                  src={assets.upload_area}
                  alt=""
                />
              </label>
            </div>

            <div className="flex flex-col gap-2.5">
              <p>Podcast name</p>
              <input
                className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(25vw,250px)]"
                type="text"
                placeholder="Type Here"
                required
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <p>Podcast description</p>
              <textarea
                className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(25vw,250px)]"
                placeholder="Type Here"
                required></textarea>
            </div>

            <button
              className="text-base bg-black text-white py-2.5 px-14 rounded-full cursor-pointer transform transition-transform duration-100 hover:scale-105 hover:font-medium"
              type="submit">
              ADD
            </button>
          </form>

          <hr className="border border-gray-400 h-[600px]" />

          <form className="flex flex-col items-start gap-8 w-[50%]">
            <h2 className="text-xl font-semibold text-center mb-4 w-full underline">
              Episode Details
            </h2>

            <div className="flex gap-8">
              <div className="flex flex-col gap-4">
                <p>Upload Audio</p>
                <input type="file" id="audio" accept="audio/*" hidden />
                <label htmlFor="audio">
                  <img
                    src={assets.upload_audio}
                    className="w-24 rounded-sm cursor-pointer"
                    alt=""
                  />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <p>Upload Image</p>
                <input type="file" id="image" accept="image/*" hidden />
                <label htmlFor="image">
                  <img
                    src={assets.upload_area}
                    className="w-24 cursor-pointer"
                    alt=""
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <p>Episode name</p>
              <input
                className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(25vw,250px)]"
                placeholder="Type Here"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <p>Episode description</p>
              <textarea
                className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(25vw,250px)]"
                placeholder="Type Here"
                required></textarea>
            </div>
            <div className="relative flex flex-col gap-2.5">
              <p>Podcast</p>
              <select className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none rounded-2xl px-6 py-2 p-2.5 w-full">
                <option value="none">None</option>
              </select>
              <button
                type="submit"
                className="absolute ml-32 mt-9 text-base bg-black text-white py-2.5 px-14 rounded-full cursor-pointer transform transition-transform duration-100 hover:scale-105 hover:font-medium">
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
