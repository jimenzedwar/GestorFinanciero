import { useStore } from "zustand";
import userStore from "../Utils/ZustandStore";

import ApexCharts from "apexcharts";
import { useEffect } from "react";


const GeneralReport = () => {
    const { userData} = useStore(userStore);




    let options = {
        colors: ["#3DA424", "#db3737"],
        series: [
          {
            name: "Incomes",
            color: "#3DA424",
            data: [
                { x: "Ene", y: 232 },
                { x: "Feb", y: 113 },
                { x: "Mar", y: 341 },
                { x: "Abr", y: 224 },
                { x: "May", y: 522 },
                { x: "Jun", y: 411 },
                { x: "Jul", y: 243 },
                { x: "Ago", y: 243 },
                { x: "Sep", y: 243 },
                { x: "Oct", y: 243 },
                { x: "Nov", y: 243 },
                { x: "Dic", y: 243 },
            ],
          },
          {
            name: "Expenses",
            color: "#db3737",
            data: [
              { x: "Ene", y: 232 },
              { x: "Feb", y: 113 },
              { x: "Mar", y: 341 },
              { x: "Abr", y: 224 },
              { x: "May", y: 522 },
              { x: "Jun", y: 411 },
              { x: "Jul", y: 243 },
              { x: "Ago", y: 243 },
              { x: "Sep", y: 243 },
              { x: "Oct", y: 243 },
              { x: "Nov", y: 243 },
              { x: "Dic", y: 243 },
            ],
          },
        ],
        chart: {
          type: "bar",
          height: "300px",
          fontFamily: "Inter, sans-serif",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
            borderRadiusApplication: "end",
            borderRadius: 10,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
              value: 1,
            },
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["transparent"],
        },
        grid: {
          show: true,
          strokeDashArray: 7,
          padding: {
            left: 3,
            right: 3,
            top: -14
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          floating: false,
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
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
        },
        fill: {
          opacity: 1,
        },
      }

      

      useEffect(() => {
        const updateChartSeries = () => {
          // Definir el orden de los meses
          const orderedMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          const incomesData: { x: string; y: number }[] = [];
          const expensesData: { x: string; y: number }[] = [];
      
          orderedMonths.forEach(month => {
            let totalIncome = 0;
            let totalExpense = 0;
      
            // Si el mes actual tiene datos de ingresos, sumarlos
            if (userData.financesByMonth?.[month]?.incomes) {
              userData.financesByMonth[month].incomes.forEach(finance => {
                totalIncome += finance.amount;
              });
            }
      
            // Si el mes actual tiene datos de gastos, sumarlos
            if (userData.financesByMonth?.[month]?.expenses) {
              userData.financesByMonth[month].expenses.forEach(finance => {
                totalExpense += finance.amount;
              });
            }
      
            // Agregar los totales al array de datos
            incomesData.push({ x: month, y: totalIncome });
            expensesData.push({ x: month, y: totalExpense });
          });
      
          // Actualizar el objeto options con los nuevos datos
          options.series[0].data = incomesData;
          options.series[1].data = expensesData;
        };
      
        updateChartSeries();
      
        const chartElement = document.getElementById("column-chart");
        if (chartElement && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(chartElement, options);
            chart.render();

      return () => chart.destroy();
  }
}, [userData]); 


    return(
        <div className="w-full grid p-7 gap-7">

            
<div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-2 md:p-2">
  <div id="column-chart"></div>
</div>
        </div>
    )
}

export default GeneralReport