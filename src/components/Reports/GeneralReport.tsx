import { useStore } from "zustand";
import userStore from "../Utils/ZustandStore";


const GeneralReport = () => {
    const { userData} = useStore(userStore);
const totalMontly = 0
    // userData.incomes?.jul?.map((income) => {
    //     income.amount =+ totalMontly
    // })


    return(
        <></>
    )
}

export default GeneralReport