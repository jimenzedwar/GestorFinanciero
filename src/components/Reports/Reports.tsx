import { useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { client } from "../../supabase/client"
import FinancesForm from "../Utils/financesForm" //todo make a popup
import { useStore } from "zustand";
import userStore from "../Utils/ZustandStore";
import GeneralReport from "./GeneralReport";

const Reports =  () => {
const navigate = useNavigate()
const { userData, setUserData} = useStore(userStore);



useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await client.auth.getUser();
      if(!response.data.user) {
        navigate("/login")
      } 
      if(userData.user_name === '') setUserData()
    } catch (error) {
      
    }
  };
  
  fetchData();
}, [userData, navigate]);
console.log(userData)



    return (
        <div>
            <GeneralReport></GeneralReport>
        </div>
    )
}

export default Reports