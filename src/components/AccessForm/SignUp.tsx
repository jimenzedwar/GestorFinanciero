import { Access } from "./AccessForm"
import { useState } from "react";
import { client } from "../../supabase/client";
import { useNavigate } from "react-router-dom";


const pw = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{8,}$/
const em = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,63}@[\w-.]+\.[a-zA-Z]{2,}$/

const SignUp = ({ onAccessChange }: { onAccessChange: (newAccess: Access) => void } ) => {
  
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()


  const handleLogInClick = () => {
    onAccessChange('login');
  };

  const handleErrors = (email: string, password: string) => {
    let emailError = '';


    if (!email.match(em)) {
      emailError = 'Introduce un correo válido (ejemplo@mail.com).';
    }

    let passwordError = '';


    if (!password.match(pw)) {
      passwordError = 'Introduce una contraseña alfanumérica y mínimo 8 caracteres.';
    }

    setFormErrors({ ...formErrors, email: emailError, password: passwordError });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;


    setNewUser({ ...newUser, [name]: value });
    handleErrors(value, newUser.password); 
    handleErrors(newUser.email, value); 
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  if(formErrors.email == "" && formErrors.password == ""){
    try {
      await client.auth.signUp({
        email: newUser.email.toLowerCase(),
        password: newUser.password,
        options: {
          data: {
            user_name: newUser.userName
          }
        }
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  };
return (
    <div className='grid grid-cols-1 w-full h-full items-center justify-center overflow-hidden font-lato text-GF-400'>
    <span className="icon-[streamline--subscription-cashflow] w-16 h-16 ssm:w-24 ssm:h-24 bg-GF-200 place-self-center mb-1"></span>
    <span className='font-semibold text-[1.8rem] ssm:text-[2.3rem] text-center'>Gestor Financiero</span>
    <p className='mx-[60px] font-[520] mt-6 text-center ssm:text-[1.3rem] sm:mx-[20%] lg:mx-[32%]'>Regístrate y lleva una gestión más organizada con tu gestor financiero</p>

    <form className="mx-[40px] ssm:mx-[15%] lg:mx-[32%] my-6" onSubmit={handleSubmit}>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-1 text-sm">Nombre</label>
    <input
            type="text"
            id="userName"
            className="bg-gray-50 border border-GF-100 text-sm rounded-lg block w-full p-2.5"
            placeholder="Usuario"
            required
            name="userName"
            value={newUser.userName}
            onChange={handleChange}
          />
  </div>
    <div className="mb-5">
    <label htmlFor="email" className="block mb-1 text-sm">Correo</label>
    <input
            type="email"
            id="email"
            className="bg-gray-50 border border-GF-100 text-sm rounded-lg block w-full p-2.5"
            placeholder="ejemplo@mail.com"
            required
            name="email"
            value={newUser.email}
            onChange={handleChange}
            onBlur={() => handleErrors(newUser.email, newUser.password)}
          />
          <p className=" text-xs text-red-600 font-sans">{formErrors.email}</p>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-1 text-sm">Contraseña</label>
    <input
            type="password"
            id="password"
            className="bg-gray-50 border border-GF-100 text-sm rounded-lg block w-full p-2.5"
            required
            name="password"
            value={newUser.password}
            onChange={handleChange}
            onBlur={() => handleErrors(newUser.email, newUser.password)}
          /> 
          <p className=" text-xs text-red-600 font-sans">{formErrors.password}</p>
  </div>
  <button 
  type="submit" 
  className="text-white bg-[#587DBD] hover:bg-[#5e88d2] font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-300 disabled:cursor-not-allowed" 
  disabled={formErrors.email != "" || formErrors.password != "" || newUser.email == "" || newUser.password == "" || newUser.userName == "" ? true : false}
  >Registrarse</button>
</form>



    <p className='font-[520] text-center ssm:text-[1.3rem]'>¿Ya tienes una cuenta? <button className='text-[#587DBD]' onClick={handleLogInClick}>Accede aquí</button></p>
  </div>
)
}


export default SignUp