import { useEffect } from "react";
import ApexCharts from "apexcharts";
import { useStore } from "zustand";
import userStore from "../Utils/ZustandStore";

interface SeriesOption {
  name: string;
  data: number[];
  color: string;
}

interface ChartOptions {
  series: SeriesOption[];
  [key: string]: any; // Para permitir otras propiedades sin especificar cada una
}

const AccumulatedBalance = () => { 
    const { userData } = useStore(userStore);
    
    
    const options: ChartOptions = {
    dataLabels: {
      enabled: true,
      style: {
        cssClass: 'text-xs text-white font-medium'
      },
    },
    grid: {
        show: true,
        strokeDashArray: 7,
        padding: {
          left: 0,
          right: 0,
          top: -14
        },
    },
    series: [
      {
        name: "Saldo Acumulado",
        data: [],
        color: "#1A56DB",
      },
      {
        name: "Total Mensual",
        data: [],
        color: "#7E3BF2",
      },
    ],
    chart: {
      height: "300px",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: true
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    stroke: {
      width: 5,
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value: any) {
          return '$' + value;
        }
      }
    },
    };
    
    useEffect(() => {
        const updateChartSeries = () => {
            const orderedMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

            options.series[0].data = [];
            options.series[1].data = [];
    
            orderedMonths.forEach((month) => { 
                const accumulatedBalance = userData.financesByMonth?.[month]?.accumulatedBalance || 0;
                const totalMonthlyResult = userData.financesByMonth?.[month]?.totalMonthlyResult || 0;
                options.series[0].data.push(accumulatedBalance);
                options.series[1].data.push(totalMonthlyResult);
            });
        }
    
        updateChartSeries();
        const chart = new ApexCharts(document.getElementById("data-labels-chart"), options);
        chart.render();
    
        return () => chart.destroy();
      }, [userData]);
      
    
    return (
        <div className="w-full grid p-7 gap-7">
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-2 md:p-2">
          <div id="data-labels-chart"></div>
        </div>
        </div>
    );
}


export default AccumulatedBalance