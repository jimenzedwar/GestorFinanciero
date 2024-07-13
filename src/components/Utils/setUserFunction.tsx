import { useState } from "react"

import userStore, { UserDataType } from "./ZustandStore";
import { useStore } from "zustand";
import { client } from "../../supabase/client";


const response = await client.auth.getUser()
const SetUser = () => {


    const { setUserData } = useStore(userStore);
  
    setUserData(response.data.user?.user_metadata); 
  };

  export default SetUser