import ReportContainer from "@/app/components/ReportContainer";

const report = () => {
  return (
    <div className="w-screen min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center p-2">
      <h1 className="text-4xl mb-4">REPORTING</h1>
      <ReportContainer />
    </div>
  );
};

export default report;
