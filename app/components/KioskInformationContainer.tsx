import { useState } from "react";
import OfficesDiv from "./OfficesDiv";
import DepartmentsDiv from "./DepartmentsDiv";

const KioskInformationContainer = () => {
  const [selectedOffice, setSelectedOffice] = useState<number>(0);
  const selectOffice = (id: number) => {
    setSelectedOffice(id);
  };
  const goBack = () => {
    setSelectedOffice(0);
  };
  if (selectedOffice === 0) return <OfficesDiv onClick={selectOffice} />;
  else
    return (
      <DepartmentsDiv onClick={goBack} selectedOfficeId={selectedOffice} />
    );
};

export default KioskInformationContainer;
