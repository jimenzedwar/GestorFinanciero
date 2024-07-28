import { useStore } from "zustand";
import userStore from "../Utils/ZustandStore";
import dayjs from "dayjs";

const MonthlyReports = () => {
    const { userData } = useStore(userStore);
    const currentMonth = dayjs().format('MMM');
    const lastMonth = dayjs().subtract(1, 'month').format('MMM');

    const currentMonthIncome = userData.financesByMonth?.[currentMonth]?.incomes.reduce((acc, finance) => acc + finance.amount, 0);
    const lastMonthIncome = userData.financesByMonth?.[lastMonth]?.incomes.reduce((acc, finance) => acc + finance.amount, 0);
    let percentIncomes = 0;
    if (lastMonthIncome !== undefined && lastMonthIncome !== 0) {
        percentIncomes = ((currentMonthIncome ?? 0) / lastMonthIncome) * 100 - 100;
    }


    const currentMonthExpense = userData.financesByMonth?.[currentMonth]?.expenses.reduce((acc, finance) => acc + finance.amount, 0);
    const lastMonthExpenses = userData.financesByMonth?.[lastMonth]?.expenses.reduce((acc, finance) => acc + finance.amount, 0);
    let percentExpenses = 0;
    if (lastMonthExpenses !== undefined && lastMonthExpenses !== 0) {
        percentExpenses = ((currentMonthExpense ?? 0) / lastMonthExpenses) * 100 - 100;
    }

    const currentMonthSavings = userData.financesByMonth?.[currentMonth]?.accumulatedBalance;
    const lastMonthSavings = userData.financesByMonth?.[lastMonth]?.accumulatedBalance
    let percentSavings = 0;
    if (lastMonthSavings !== undefined && lastMonthSavings !== 0) {
        percentSavings = ((currentMonthSavings ?? 0) / lastMonthSavings) * 100 - 100;
    }
    const currentMonthly = userData.financesByMonth?.[currentMonth]?.totalMonthlyResult
    const lastMonthly = userData.financesByMonth?.[lastMonth]?.totalMonthlyResult
    let percentMonthly = 0;
    if (lastMonthly !== undefined && lastMonthly !== 0) {
        percentMonthly = ((currentMonthly ?? 0) / lastMonthly) * 100 - 100;
    }





    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 px-7 py-5 gap-8">
        <div className="bg-white border rounded-md shadow-sm grid p-3">
            <span className="mb-2 text-xs">Ingresos</span>
            <div className="grid sm:grid-cols-2 w-full sm:justify-end">
            <span className="font-bold text-xl">${currentMonthIncome}</span>
            <span className={` justify-self-end self-end ${percentIncomes < 0 ? "text-[#db3737]" : "text-[#3DA424]"}`}>{percentIncomes.toFixed(2)}%</span>
            </div>
        </div>

        <div className="bg-white border rounded-md shadow-sm grid p-3">
            <span className="mb-2 text-xs">Egresos</span>
            <div className="grid sm:grid-cols-2 w-full sm:justify-end">
            <span className="font-bold text-xl">${currentMonthExpense}</span>
            <span className={` justify-self-end self-end ${percentExpenses < 0 ? "text-[#db3737]" : "text-[#3DA424]"}`}>{percentExpenses.toFixed(2)}%</span>
            </div>
        </div>
        <div className="bg-white border rounded-md shadow-sm grid p-3">
            <span className="mb-2 text-xs">Saldo Acumulado</span>
            <div className="grid sm:grid-cols-2 w-full sm:justify-end">
            <span className="font-bold text-xl">${currentMonthSavings}</span>
            <span className={` justify-self-end self-end ${percentSavings < 0 ? "text-[#db3737]" : "text-[#3DA424]"}`}>{percentSavings.toFixed(2)}%</span>
            </div>
        </div>
        <div className="bg-white border rounded-md shadow-sm grid p-3">
            <span className="mb-2 text-xs">Total Mensual</span>
            <div className="grid sm:grid-cols-2 w-full sm:justify-end">
            <span className="font-bold text-xl">${currentMonthly}</span>
            <span className={`justify-self-end self-end ${percentMonthly < 0 ? "text-[#db3737]" : "text-[#3DA424]"}`}>{percentMonthly.toFixed(2)}%</span>
            </div>
        </div>
        </div>
    );
}

export default MonthlyReports;