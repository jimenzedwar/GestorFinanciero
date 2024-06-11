import { useState } from "react";
import { Access } from "./AccessForm";

import { client } from "../../supabase/client";

const LogIn = ({ onAccessChange }: { onAccessChange: (newAccess: Access) => void }) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleSignupClick = () => {
    onAccessChange('signup');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
        await client.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      })
    } catch (error) {
      console.log(error)
    }
    
  };


    return (
        <div className='grid grid-cols-1 w-full h-full items-center justify-center overflow-hidden font-lato text-GF-400'>
          <span className="icon-[streamline--subscription-cashflow] w-16 h-16 ssm:w-24 ssm:h-24 bg-GF-200 place-self-center mb-1"></span>
          <span className=' font-semibold text-[1.8rem] text-center ssm:text-[2.3rem]'>Gestor Financiero</span>
          <p className='mx-[60px] font-[520] mt-6 text-center ssm:text-[1.3rem] sm:mx-[20%] lg:mx-[32%]'>Bienvenido a tu gestor financiero, por favor, inicia sesión para administrar tus finanzas</p>

          <form className="mx-[40px] ssm:mx-[15%] lg:mx-[32%] my-6" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-GF-100 text-sm rounded-lg block w-full p-2.5"
            placeholder="ejemplo@mail.com"
            required
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-1 text-sm">Contraseña</label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-GF-100 text-sm rounded-lg block w-full p-2.5"
            required
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="text-white bg-[#587DBD] hover:bg-[#5e88d2] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Acceder</button>
      </form>

          <p className='font-[520] text-center ssm:text-[1.3rem]'>¿No tienes una cuenta? <button className='text-[#587DBD]' onClick={handleSignupClick}>Crea una aquí</button></p>
        </div>
    )
    }
    
  
    export default LogIn