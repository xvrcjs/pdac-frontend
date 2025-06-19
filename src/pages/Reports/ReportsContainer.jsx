import React, { useContext, useState } from "react";
import { format } from 'date-fns';
import dayjs from "dayjs";
import ReportsComponent from "./ReportsComponent";
import ReportViewComponent from "./ReportViewComponent"; // Added import for ReportViewComponent
import { AppContext } from "context/AppContext";

function ReportsContainer() {
  const { api, account } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(dayjs());
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async (startDate, endDate, selectedReports) => {
    setIsLoading(true);
    try {
      const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
      const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

      const response = await api(`v1/reports/generate/?page=1&start_date=${formattedStartDate}&finish_date=${formattedEndDate}`, {
        method: "GET"
      });

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      setReportData(response.body);
      setShowReport(true);

    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleBack = () => {
    setShowReport(false);
    setReportData(null);
  };

  return (
    <>
      {showReport ? (
        <ReportViewComponent 
          reportData={reportData} 
          onBack={handleBack}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <ReportsComponent 
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onGenerateReport={handleGenerateReport}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default ReportsContainer;
