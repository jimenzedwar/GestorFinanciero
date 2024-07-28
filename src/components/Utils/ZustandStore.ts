import { create } from 'zustand'
import { client } from '../../supabase/client'

export interface UserDataType {
  user_name: string
  id: string
  financesByMonth: MonthInfo<financeType> | null
}

export interface financeType {
  amount: number
  description: string
  date: string
  id: number
  type: 'income' | 'expense'
  userId: string
}

export interface UserState {
  userData: UserDataType
  setUserData: () => void
}
interface MonthInfo<T> {
  [key: string]: {
    incomes: T[],
    expenses: T[],
    totalMonthlyResult: number,
    accumulatedBalance: number
  }
}


const userStore = create<UserState>()((set) => ({
  userData: {
    user_name: "",
    id: "",
    financesByMonth: null,
  },
  setUserData: async () => {
    try {
      const { data } = await client.auth.getUser();
      if (!data.user) return;

      const userCompleteInfo = data.user?.user_metadata;
      if (!userCompleteInfo) return;

      const userInfo: UserDataType = {
        user_name: userCompleteInfo.user_name,
        id: userCompleteInfo.sub,
        financesByMonth: null,
      };

      const { data: finances } = await client.from("Finances").select().eq("userId", userCompleteInfo.sub);

      userInfo.financesByMonth = await processFinances(finances);

      set((state) => ({ ...state, userData: userInfo }));
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  },
}));


function processFinances(finances: financeType[] | null): MonthInfo<financeType> | null {
  if (!finances) return null;

  // Ordenar las finanzas por fecha
  const sortedFinances = finances.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Inicializar financesByMonth con todos los meses
  const financesByMonth: MonthInfo<financeType> = {
    'Ene': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Feb': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Mar': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Abr': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'May': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Jun': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Jul': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Ago': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Sep': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Oct': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Nov': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 },
    'Dic': { incomes: [], expenses: [], totalMonthlyResult: 0, accumulatedBalance: 0 }
  };

  let accumulatedBalance = 0;

  sortedFinances.forEach((finance) => {
    const monthName = new Date(finance.date).toLocaleString('en-US', { month: 'short' });

    if (finance.type === 'income') {
      financesByMonth[monthName].incomes.push(finance);
    } else if (finance.type === 'expense') {
      financesByMonth[monthName].expenses.push(finance);
    }
  });

  // Calcular el total mensual y actualizar el saldo acumulado
  Object.values(financesByMonth).forEach(monthInfo => {
    const totalIncomes = monthInfo.incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = monthInfo.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    monthInfo.totalMonthlyResult = totalIncomes - totalExpenses;

    // Actualizar el saldo acumulado
    accumulatedBalance += monthInfo.totalMonthlyResult;
    monthInfo.accumulatedBalance = accumulatedBalance;
  });

  return financesByMonth;
}
export default userStore;