import { create } from 'zustand'

export interface UserDataType {
email: string
user_name: string
}


interface UserState {
  userData: any
  setUserData: (data: any) => void
}


const userStore = create<UserState>()((set) => ({
    userData: {
    }, 
    setUserData: (userData: any) => set({ userData: userData as any }),
}))
export default userStore