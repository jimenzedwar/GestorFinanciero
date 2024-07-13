import dayjs from "dayjs"
import { useState } from "react"
import { client } from "../../supabase/client";

export type FinanceType = "income" | "expense"


const response = await client.auth.getUser()

const FinancesForm = ({ FinanceType }: { FinanceType: FinanceType })=> {

  const today = dayjs().format('YYYY-MM-DD') 


    const [newFinance, setNewFinance] = useState({
        type: FinanceType,
        amount: 0,
        description: "",
        date: today,
        userId: response.data.user?.id

    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setNewFinance({ ...newFinance, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await client.from("Finances").insert(newFinance)
      } catch (error) {
        console.error()
      }
    }
    
    const handleReset = () => {
      newFinance.amount = 0
      newFinance.description = ""
      newFinance.date = today
    }

    return (
        <>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
  <div className="mb-5">
    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
    <input 
    type="date" 
    id="date" 
    name="date"
    value={newFinance.date}
    onChange={handleChange}
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monto</label>
    <input 
    type="number" 
    id="amount" 
    name="amount"
    value={newFinance.amount}
    onChange={handleChange}
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <div className="mb-5">
    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
    <input 
    type="text" 
    id="description" 
    name="description"
    value={newFinance.description}
    onChange={handleChange}
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
  <button onClick={handleReset} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Limpiar</button>
</form>
        </>
    )
}


export default FinancesForm