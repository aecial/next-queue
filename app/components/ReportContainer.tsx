"use client";
import { useEffect, useState } from "react";
import ReportSkeleton from "./ReportSkeleton";

interface Office {
  id: number;
  name: string;
}

interface Months {
  month: number;
}

const ReportContainer = () => {
  const [reportCount, setReportCount] = useState(0);
  const [officeNames, setOfficeNames] = useState<Office[]>([]);
  const [deptNames, setDeptNames] = useState<Office[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [since, setSince] = useState<string>("00-00-00");
  const [averageServiceTime, setAverageServiceTime] = useState<number>(0);
  const [selectedOffice, setSelectedOffice] = useState<number>(0);
  const [selectedDept, setSelectedDept] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const getInitialReport = async () => {
    try {
      const initReport = await fetch("/api/reports");
      const response = await initReport.json();
      const offices = await fetch("/api/offices/names");
      const officeResponse = await offices.json();
      setOfficeNames(officeResponse.offices);
      setSince(response.since.createdAt);
      setReportCount(response.reportCount);
      setAverageServiceTime(response.reportAverage._avg.service_time);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInitialReport();
  }, []);

  const handleOfficeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOffice(Number(e.target.value));
    const reportByOffice = await fetch(
      `/api/reports/${Number(e.target.value)}`
    );
    const response = await reportByOffice.json();
    try {
      setSince(response.since.createdAt);
      setReportCount(response.reportCount);
      setAverageServiceTime(response.reportAverage._avg.service_time);
      const departmentFetch = await fetch(
        `/api/departments/${Number(e.target.value)}`
      );
      const departmentResponse = await departmentFetch.json();
      setDeptNames(departmentResponse.departments);
    } catch (TypeError) {
      setSince("00-00-00");
      setReportCount(0);
      setAverageServiceTime(0);
    }
  };

  const handleDeptChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDept(Number(e.target.value));
    const reportByDept = await fetch(
      `/api/reports/${selectedOffice}/${Number(e.target.value)}`
    );
    const response = await reportByDept.json();
    try {
      setSince(response.since.createdAt);
      setReportCount(response.reportCount);
      setAverageServiceTime(response.reportAverage._avg.service_time);
      if (response.months && response.months.length > 0) {
        setMonths(response.months.map((item: Months) => item.month));
      } else {
        setMonths([]); // If no months are available, set state to empty array
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value));
    const reportByMonth = await fetch(
      `/api/reports/${selectedMonth}/${selectedDept}/${Number(e.target.value)}`
    );
    const response = await reportByMonth.json();
    try {
      setSince(response.since[0].createdAt);
      console.log(since);
      setReportCount(response.reportCount);
      setAverageServiceTime(response.reportAverage._avg.service_time);
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthName = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1]; // Adjusting month value to match array index
  };

  const formatSinceDate = (since: string) => {
    return typeof since === "string" && since.includes("T")
      ? since.split("T")[0]
      : since;
  };

  if (isLoading === false) {
    return (
      <>
        <div className="w-[40%] flex flex-col items-center gap-5 mb-10">
          <label htmlFor="selectedOffice" className="sr-only">
            Select Office
          </label>
          <select
            id="selectedOffice"
            value={selectedOffice}
            onChange={handleOfficeChange}
            className="select select-bordered select-primary select-lg w-full max-w-xs"
          >
            <option disabled value={0}>
              SELECT OFFICE
            </option>
            {officeNames.map((officeName) => (
              <option key={officeName.id} value={officeName.id}>
                {officeName.name}
              </option>
            ))}
          </select>
          {selectedOffice !== 0 ? (
            <>
              <label htmlFor="selectedDepartment" className="sr-only">
                Select Department
              </label>
              <select
                id="selectedDepartment"
                value={selectedDept}
                onChange={handleDeptChange}
                className="select select-bordered select-secondary select-lg w-full max-w-xs"
              >
                <option disabled value={0}>
                  SELECT DEPARTMENT
                </option>
                {deptNames.map((deptName) => (
                  <option key={deptName.id} value={deptName.id}>
                    {deptName.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            ""
          )}
          {selectedDept !== 0 ? (
            <>
              <label htmlFor="selectedMonth" className="sr-only">
                Select Month
              </label>
              <select
                id="selectedMonth"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="select select-bordered select-secondary select-lg w-full max-w-xs"
              >
                <option disabled value={0}>
                  SELECT MONTH
                </option>
                {months.map((month) => {
                  const monthName = getMonthName(month);
                  return (
                    <option key={month} value={month}>
                      {monthName}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="stats shadow w-[40%] h-[20%]">
          <div className="stat place-items-center">
            <div className="stat-title">Tickets Completed</div>
            <div className="stat-value text-primary ">
              {reportCount === 0 ? "N/A" : reportCount}
            </div>
            <div className="stat-desc">Since: {formatSinceDate(since)}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Average Service Time</div>
            <div className="stat-value text-secondary">
              {averageServiceTime ? averageServiceTime.toFixed(2) + "s" : "N/A"}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <ReportSkeleton />;
  }
};

export default ReportContainer;
