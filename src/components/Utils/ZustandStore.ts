import { create } from 'zustand'
import { client } from '../../supabase/client'

export interface UserDataType {
  user_name: string
  id: string
  filteredFinances: Array<financeType> | null
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
    expenses: T[]
  }
}



const userStore = create<UserState>()((set) => ({
  userData: {
    user_name: "",
    id: "",
    filteredFinances: null,
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
        filteredFinances: null,
        financesByMonth: null,
      };

      const { data: finances } = await client.from("Finances").select().eq("userId", userCompleteInfo.sub);
      userInfo.filteredFinances = finances;

      userInfo.financesByMonth = processFinances(finances);

      set((state) => ({ ...state, userData: userInfo }));
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  },
}));

function processFinances(finances: financeType[] | null): MonthInfo<financeType> | null {
  if (!finances) return null;

  const financesByMonth: MonthInfo<financeType> = {};
  finances.forEach((finance) => {
    const month = finance.date.split('-')[1];
    if (!financesByMonth[month]) {
      financesByMonth[month] = { incomes: [], expenses: [] };
    }
    if (finance.type === 'income') {
      financesByMonth[month].incomes.push(finance);
    } else if (finance.type === 'expense') {
      financesByMonth[month].expenses.push(finance);
    }
  });

  return financesByMonth;
}

export default userStore;