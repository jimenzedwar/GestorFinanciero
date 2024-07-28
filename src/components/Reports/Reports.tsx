import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../supabase/client";
import { useStore } from "zustand";
import userStore from "../Utils/ZustandStore";
import GeneralReport from "./GeneralReport";
import AccumulatedBalance from "./AccumulatedBalance";
import MonthlyReports from "./MonthlyReports";

const Reports = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useStore(userStore);
  const [financesToShow, setFinancesToShow] = useState('Ing');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.auth.getUser();
        if (!response.data.user) {
          navigate("/login");
        }
        if (userData.user_name === '') setUserData();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userData, navigate, setUserData]);

  return (
    <div className="grid sm:grid-cols-2 mt-24">
      <div className="w-full col-span-full">
        <MonthlyReports />
      </div>
      <GeneralReport />
      <AccumulatedBalance />

      <div className="h-full w-full p-7 sm:col-span-2">
        <div className={`h-fit border rounded-lg bg-white shadow-sm mx-auto w-full text-xl p-3 grid grid-cols-2 justify-items-center ${financesToShow === 'Ing' ? "sm:grid-cols-3" : ""}`}>
          <div className="col-span-2 sm:col-span-3 flex justify-around w-full my-4">
            <button className={` p-1 px-2 rounded-xl sm:hidden ${financesToShow === 'Ing' ? 'border-GF-300 border font-semibold text-GF-400' : 'border'}`} onClick={() => setFinancesToShow('Ing')}>Ing.</button>
            <button className={` p-1 px-2 rounded-xl hidden sm:block ${financesToShow === 'Ing' ? 'border-GF-300 border font-semibold text-GF-400' : 'border'}`} onClick={() => setFinancesToShow('Ing')}>Ing./Egr.</button>
            <button className={` p-1 px-2 rounded-xl sm:hidden ${financesToShow === 'Egr' ? 'border font-semibold text-GF-400' : 'border'}`} onClick={() => setFinancesToShow('Egr')}>Egr.</button>
            <button className={` p-1 px-2 rounded-xl ${financesToShow === 'S/A' ? 'border-GF-300 border font-semibold text-GF-400' : 'border'}`} onClick={() => setFinancesToShow('S/A')}>S/A</button>
            <button className={` p-1 px-2 rounded-xl ${financesToShow === 'T/M' ? 'border-GF-300 border font-semibold text-GF-400' : 'border'}`} onClick={() => setFinancesToShow('T/M')}>T/M</button>
          </div>
          <span className="ml-4">Mes</span>
          <span className={`${financesToShow === 'Ing' ? "block" : "hidden"} mb-4`}>Ingresos</span>
          <span className={`${financesToShow === 'Egr' ? "block" : "hidden"} mb-4`}>Egresos</span>
          <span className={`${financesToShow === 'Ing' ? "hidden sm:block" : "hidden"} mb-4`}>Egresos</span>
          <span className={`${financesToShow === 'T/M' ? "block" : "hidden"} mb-4`}>Total M.</span>
          <span className={`${financesToShow === 'S/A' ? "block" : "hidden"} mb-4`}>Saldo A.</span>
          {
            userData.financesByMonth && Object.keys(userData.financesByMonth).map((month) => {
              let totalIncome = 0;
              let totalExpense = 0;
              userData.financesByMonth?.[month].incomes.forEach(finance => {
                totalIncome += finance.amount;
              });
              userData.financesByMonth?.[month].expenses.forEach(finance => {
                totalExpense += finance.amount;
              });

              let totalMonthly = userData.financesByMonth?.[month].totalMonthlyResult || 0;
              let accumulatedBalance = userData.financesByMonth?.[month].accumulatedBalance || 0;

              return (
                < div className={`col-span-2  w-full grid grid-cols-2 ${financesToShow === 'Ing' ? "sm:col-span-3 sm:grid-cols-3" : ""} justify-items-center`} key={month}>
                  <span className="mb-2 ml-4">{month}</span>
                  <span className={`${totalMonthly < 0 ? "text-[#db3737]" : "text-[#3DA424]"} ${financesToShow === 'T/M' ? "block" : "hidden"}`}>{totalMonthly}</span>
                  <span className={`${accumulatedBalance < 0 ? "text-[#db3737]" : "text-[#3DA424]"} ${financesToShow === 'S/A' ? "block" : "hidden"}`}>{accumulatedBalance}</span>
                  <span className={`text-[#3DA424] ${financesToShow === 'Ing' ? "block" : "hidden"}`}>{totalIncome}</span>
                  <span className={`text-[#db3737] ${financesToShow === 'Egr' ? "block" : "hidden"}`}>{totalExpense}</span>
                  <span className={`text-[#db3737] ${financesToShow === 'Ing' ? "hidden sm:block" : "hidden"}`}>{totalExpense}</span>
                  </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Reports;