import { useState } from "react"
import SignUp from "./SignUp"
import LogIn from "./LogIn"

export type Access = 'login' | "signup";

const AccessForm = () => {
  const [access, setAccess] = useState('login' as Access);

  const handleAccessChange = (newAccess: Access) => {
    setAccess(newAccess);
  };

  return (
    <div className="h-full w-full mt-[25%] lg:mt-[10%]">
      <div className={`${access === 'login' ? "hidden" : "block"}`}>
        <SignUp onAccessChange={handleAccessChange} />
      </div>
      <div className={`${access === 'signup' ? "hidden" : "block"}`}>
        <LogIn onAccessChange={handleAccessChange} />
      </div>
    </div>
  );
};

export default AccessForm;