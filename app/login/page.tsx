import LoginForm from "@/app/components/LoginForm";
import React from "react";

const loginPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl text-center">LOGIN</h1>
      <LoginForm />
    </div>
  );
};

export default loginPage;
