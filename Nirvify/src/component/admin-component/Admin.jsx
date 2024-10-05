import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddPodcast from "../../pages/admin-pages/AddPodcast";
import AddEpisode from "../../pages/admin-pages/AddEpisode";
import ListPodcast from "../../pages/admin-pages/ListPodcast";
import ListEpisode from "../../pages/admin-pages/ListEpisode";
import UserUploads from "../../pages/admin-pages/UserUploads";
import ListUsers from "../../pages/admin-pages/ListUsers";

const Admin = () => {
  return (
    <div className="flex items-start min-h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-gray-300">
        <Navbar />
        <div>
          <Routes>
            <Route path="/list-users" element={<ListUsers />} />
            <Route path="/user-uploads" element={<UserUploads />} />

            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/add-episode" element={<AddEpisode />} />
            <Route path="/list-podcast" element={<ListPodcast />} />
            <Route path="/list-episode" element={<ListEpisode />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
