"use client";
import { loginUser } from "@/actions/user/loginUser";

const test = () => {
  const handleSubmit = () => {
    loginUser("ted", "admin");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button className="btn btn-prmimary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default test;
