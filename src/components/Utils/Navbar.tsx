import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const isActiveReports = location.pathname === "/"
    const isActiveIncomes = location.pathname === "/incomes"
    const isActiveExpenses = location.pathname === "/expenses"

    const navigate = useNavigate()
    return (
        <div className="w-full justify-center flex">
        <div className="border border-GF-200 rounded-full flex px-8 py-2 space-x-5 fixed bottom-8 justify-around md:w-[50%] lg:w-[35%]">
            <button className={`flex flex-col items-center ${ isActiveReports ? "text-GF-300" : " text-GF-200"}`} onClick={() => navigate("/")}><span className="icon-[material-symbols--finance] w-7 h-7"></span>Reporte</button>
            <button className={`flex flex-col items-center ${ isActiveIncomes ? "text-GF-300" : " text-GF-200"}`} onClick={() => navigate("/incomes")}><span className="icon-[solar--graph-down-linear] rotate-180 w-7 h-7"></span>Ingresos</button>
            <button className={`flex flex-col items-center ${ isActiveExpenses ? "text-GF-300" : " text-GF-200"}`} onClick={() => navigate("/expenses")}><span className="icon-[solar--graph-down-linear] w-7 h-7"></span>Egresos</button>
        </div>
        </div>
    )
}

export default Navbar