import { logoutUser } from "@/actions/user/logoutUser";
import React from "react";

const AdminNavigation = ({ username }: { username: string }) => {
  return (
    <div className="navbar bg-base-100 h-16 flex justify-between px-4">
      <a className="btn btn-ghost text-xl">Hello, {username}</a>
      <form action={logoutUser}>
        <button className="btn btn-primary">Logout</button>
      </form>
    </div>
  );
};

export default AdminNavigation;
