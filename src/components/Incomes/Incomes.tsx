import { useStore } from "zustand";
import userStore from "../Utils/ZustandStore";
import dayjs from "dayjs";
import FinancesForm from "../Utils/financesForm";
import { useEffect, useState } from "react";
import { client } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";

const Incomes = () => {
    const [openModal, setOpenModal] = useState(false);
    const [visibleMonths, setVisibleMonths] = useState<{ [key: string]: boolean }>({});

    const { userData, setUserData } = useStore(userStore);
    const navigate = useNavigate();

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
      }, [userData, setUserData]);

    const currentMonth = dayjs().format('MMM');
    const monthlyIncomes = userData.financesByMonth?.[currentMonth]?.incomes.reduce((acc, finance) => acc + finance.amount, 0);

    const toggleMonthVisibility = (month: string) => {
        setVisibleMonths(prevState => ({
            ...prevState,
            [month]: !prevState[month]
        }));
    };

    return (
        <div className="grid mt-24 mx-7 py-5">
            <div className="border bg-white p-4 items-center rounded-lg sm:grid sm:grid-cols-2 mb-7">
                <div className="text-xl">
                    <span>Ingresos: </span>
                    <span className={`${(monthlyIncomes ?? 0) < 0 ? "text-[#db3737]" : "text-[#3DA424]"}`}>${monthlyIncomes ?? 0}</span>
                </div>
                <button className="bg-[#4094F7] hover:bg-[#5e88d2] text-white rounded-lg w-fit p-2 justify-self-end hidden sm:block" onClick={() => setOpenModal(true)}>Nuevo Ingreso</button>
            </div>
            <div className="w-full grid justify-center my-4 sm:hidden">
                <button className="bg-[#4094F7] hover:bg-[#5e88d2] text-white rounded-lg w-fit p-2 justify-self-end" onClick={() => setOpenModal(true)}>Nuevo Ingreso</button>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)} className="pt-24 bg-black bg-opacity-10 grid">
                <Modal.Header className="p-2"></Modal.Header >
                <Modal.Body className="p-7 sm:w-[50vw]">
                    <FinancesForm FinanceType="income"></FinancesForm>
                </Modal.Body>
            </Modal>

            <div className="border bg-white items-center rounded-lg grid grid-cols-3 mt-6">
                <span className="ml-4 text-xl my-5">Fecha</span>
                <span className="text-xl">Monto</span>
                <span className=" text-xl">Detalle</span>
                {userData.financesByMonth && Object.keys(userData.financesByMonth).map((month, index) => {
                    let totalIncome = 0;

                    userData.financesByMonth?.[month].incomes.forEach((finance: any) => {
                        totalIncome += finance.amount;
                    });

                    return (
                        <div key={index} className="col-span-3">
                            <div className="grid grid-cols-3 bg-[#EAECF0] text-lg py-2 mb-2">
                                <span className="ml-4 ">{month}</span>
                                <span className="text-[#3DA424]">${totalIncome}</span>
                                <button className="text-blue-500" onClick={() => toggleMonthVisibility(month)}>
                                    {visibleMonths[month] ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                            {visibleMonths[month] && userData.financesByMonth?.[month].incomes.map((income: any) => (
                                <div key={income.id} className="justify-between grid grid-cols-3 py-2">
                                    <span className="ml-4">{income.date}</span>
                                    <span className="text-[#3DA424]">${income.amount}</span>
                                    <span className="text-ellipsis overflow-hidden whitespace-nowrap">{income.description}</span>
                                    <span className={`w-full block h-[1px] bg-GF-200 col-span-3 mt-2 `}/>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Incomes;