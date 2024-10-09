export const getCurrentMonthDates = () => {
    const now = new Date();
  
    // Get the first day of the current month (start date)
    const startDate = new Date(now.getFullYear(), now.getMonth(), 2);
    // Get the last day of the current month (end date)
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    // Format the dates as 'YYYY-MM-DD'
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    // console.log("formattedStartDate", startDate.toISOString());
    return { startDate: formattedStartDate, endDate: formattedEndDate };
  };