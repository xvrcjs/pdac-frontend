import React, { useContext, useState,useEffect } from "react";
import { format } from 'date-fns';
import dayjs from "dayjs";
import ReportsComponent from "./ReportsComponent";
import { AppContext } from "context/AppContext";

function ReportsContainer() {
  const { api, account } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(dayjs());
  const [reportData, setReportData] = useState(null);
  const [chartsData, setChartsData] = useState(null);
  const [suppliersData, setSuppliersData] = useState(null);
  const [selectSuppliers,setSelectSuppliers] = useState(null)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    claim_status: "Todo",
    suppliers: "Todo",
    omic: "Todo",
    claim_access: "Todo",
    type_of_claim: "Todo",
    category: "Todo",
    heading: "Todo",
    subheading: "Todo",
  });

  const handleGenerateReport = async (startDate, endDate, selectedReports, newPage = 1, newFilters = null) => {
    setIsLoading(true);
    try {
      const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
      const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

      const currentFilters = newFilters || filters;
      const activeFilters = Object.fromEntries(
        Object.entries(currentFilters)
          .filter(([_, value]) => value !== "Todo")
      );

      const filtersParam = Object.keys(activeFilters).length > 0 
        ? `&filters=${JSON.stringify(activeFilters)}` 
        : '';
      const response = await api(`v1/reports/generate/?page=${newPage}&page_size=${pageSize}&start_date=${formattedStartDate}&finish_date=${formattedEndDate}${filtersParam}`, {
        method: "GET"
      });

      if (newFilters) {
        setFilters(newFilters);
      }
      if (newPage !== page) {
        setPage(newPage);
      }
      handleGenerateCharts(selectedReports, filtersParam);
      setReportData(response.body);
      setShowReport(true);

    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCharts = async (selectedReports, filtersParam) => {
    try {

      const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
      const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

      const response = await api(`v1/reports/generate-charts/?start_date=${formattedStartDate}&finish_date=${formattedEndDate}${filtersParam}`, {
        method: "GET"
      });
      setChartsData(response.body);

    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGenerateCsv = async () => {
    setIsLoading(true);
    try {
      const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
      const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

      const activeFilters = Object.fromEntries(
        Object.entries(filters)
          .filter(([_, value]) => value !== "Todo")
      );

      const filtersParam = Object.keys(activeFilters).length > 0 
        ? `&filters=${JSON.stringify(activeFilters)}` 
        : '';

      const response = await api(`v1/reports/generate-csv/?start_date=${formattedStartDate}&finish_date=${formattedEndDate}${filtersParam}`, {
        method: "GET"
      });

      if (response.body) {
        // Crear un blob con el contenido CSV
        const blob = new Blob([response.body], { type: 'text/csv;charset=utf-8;' });
        
        // Crear URL para el blob
        const url = window.URL.createObjectURL(blob);
        
        // Crear elemento <a> temporal
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `reporte-${formattedStartDate}-${formattedEndDate}.csv`);
        
        // Agregar al DOM, hacer clic y remover
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Liberar la URL del objeto
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error generating CSV:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGenerateSuppliersCharts = async (yearSelected, monthSelected) => {
    try {
      const formattedYear = format(new Date(yearSelected), 'yyyy');
      const monthParam = monthSelected ? `&month=${format(new Date(monthSelected), 'MM')}` : '';
      const response = await api(`v1/reports/generate-suppliers-charts/?year=${formattedYear}${monthParam}`, {
        method: "GET"
      });
      setSuppliersData(response.body);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() =>{
    api(`v1/reports/suppliers`)
        .then(({ ok, body }) => {
          if (ok) {
            setSelectSuppliers(body.data)
          }
        })
  },[api])
  
  return (
      <ReportsComponent 
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onGenerateReport={handleGenerateReport}
        isLoading={isLoading}
        reportData={reportData}
        selectSuppliers={selectSuppliers}
        handleGenerateCsv={handleGenerateCsv}
        chartsData={chartsData}
        suppliersData={suppliersData}
        setSuppliersData={setSuppliersData}
        handleGenerateSuppliersCharts={handleGenerateSuppliersCharts}
        page={page}
        pageSize={pageSize}
        filters={filters}
        onPageChange={(newPage) => handleGenerateReport(startDate, endDate, [], newPage)}
        onFilterChange={(newFilters) => handleGenerateReport(startDate, endDate, [], 1, newFilters)}
      />
  );
}

export default ReportsContainer;
