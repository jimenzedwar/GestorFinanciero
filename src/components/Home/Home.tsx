import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { client } from "../../supabase/client"
import FinancesForm from "../Utils/financesForm"
import useStore from "../Utils/ZustandStore"
import SetUser from "../Utils/setUserFunction"

const Home = () => {
const navigate = useNavigate()

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await client.auth.getUser();
      if(!response.data.user) {
        navigate("/login")
      }
    } catch (error) {

    }
  };

  fetchData();
}, []);


    return (
        <div>
            <FinancesForm FinanceType="income"/>
        </div>
    )
}

export default Home