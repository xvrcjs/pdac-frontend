import React, { useContext, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    claim_status: "Todo",
    supplier: "Todo",
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

  return (
      <ReportsComponent 
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onGenerateReport={handleGenerateReport}
        isLoading={isLoading}
        reportData={reportData}
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
