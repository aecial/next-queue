"use client";
import { useState } from "react";
import OfficesDiv from "../components/OfficesDiv";
import KioskInformationContainer from "../components/KioskInformationContainer";

const page = () => {
  return (
    <div className="text-white h-screen flex flex-col  items-center gap-4 p-4">
      <h1 className="text-4xl">Kiosk</h1>
      <div className="divider"></div>
      <div>
        <KioskInformationContainer />
      </div>
    </div>
  );
};

export default page;
