import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/helper";
import { getTotalOrdersToday, getTotalOrdersByMonth, getTotalOrdersByYear } from "../services/orderService";

function useOrderStatsAdmin() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { isLoading: todayLoading, data: totalToday } = useQuery({
    queryKey: ["orders-total-today"],
    queryFn: () => getTotalOrdersToday(),
    retry: 1,
    enabled: !!getAccessToken(),
    staleTime: 60000,
  });

  const { isLoading: monthLoading, data: totalMonth } = useQuery({
    queryKey: ["orders-total-month", currentYear, currentMonth],
    queryFn: () => getTotalOrdersByMonth(currentMonth, currentYear),
    retry: 1,
    enabled: !!getAccessToken(),
    staleTime: 300000, 
  });

  const { isLoading: yearLoading, data: totalYear } = useQuery({
    queryKey: ["orders-total-year", currentYear],
    queryFn: () => getTotalOrdersByYear(currentYear),
    retry: 1,
    enabled: !!getAccessToken(),
    staleTime: 600000,
  });

  return { 
    todayLoading, 
    monthLoading, 
    yearLoading,
    totalToday: totalToday || 0, 
    totalMonth: totalMonth || 0, 
    totalYear: totalYear || 0,
    isLoading: todayLoading || monthLoading || yearLoading
  };
}

export default useOrderStatsAdmin;