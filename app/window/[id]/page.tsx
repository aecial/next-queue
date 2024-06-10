import WindowContainer from "@/app/components/WindowContainer";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return;
  }
  return <WindowContainer id={id} />;
};

export default page;
