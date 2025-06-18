import React, { useContext, useState } from "react";
import { format } from 'date-fns';
import ReportsComponent from "./ReportsComponent";
import ReportViewComponent from "./ReportViewComponent"; // Added import for ReportViewComponent
import { AppContext } from "context/AppContext";

function ReportsContainer() {
  const { api, account } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(true);
  const [reportData, setReportData] = useState({
    dataGraph:[{
      nro_reclamo: "#RC-A-00001",
      rubro: "Informatica",
      tipo_reclamo: "Común - Común",
      empresa: "Empresa 1",
      estado: "Caratulado",
    }],
    dataGrid:[{
      nro_reclamo: "#RC-A-00001",
      rubro: "Informatica",
      tipo_reclamo: "Común - Común",
      empresa: "Empresa 1",
      estado: "Caratulado",
    }]
  });

  const handleGenerateReport = async (startDate, endDate, selectedReports) => {
    setIsLoading(true);
    try {
    //   const formattedStartDate = format(new Date(startDate), 'YYYY-MM-dd');
    //   const formattedEndDate = format(new Date(endDate), 'YYYY-MM-dd');

    //   const filters = {
    //     claim_status: selectedReports.includes('estado') ? 'closed' : undefined,
    //     category: selectedReports.includes('categoria') ? 'some_category' : undefined
    //   };

    //   const cleanFilters = Object.fromEntries(
    //     Object.entries(filters).filter(([_, v]) => v !== undefined)
    //   );

    //   const response = await api(`v1/reports/generate/?start_date=${formattedStartDate}&finish_date=${formattedEndDate}&filters=${JSON.stringify(cleanFilters)}`, {
    //     method: "GET"
    //   });
      
    //   setReportData(response.body.data);
      setShowReport(true);
    } catch (error) {
      console.error('Error generating report:', error);
      // Aquí podrías agregar un manejo de errores más específico
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
        />
      ) : (
        <ReportsComponent 
          onGenerateReport={handleGenerateReport}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default ReportsContainer;
