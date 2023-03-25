import { createContext, useReducer, useContext} from "react";

import {initialContext} from './initialContext'
import reducer from './reducer'

const contextCreate = createContext();

const ProviderContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialContext);

    const value = {
        state,
        dispatch
    }

    console.log(value);


  return (
    <contextCreate.Provider value={value}>
        {children}
    </contextCreate.Provider>
  )

};

const GetDataToContext = () => {
    return useContext(contextCreate);
}

export {
    GetDataToContext
}

export default ProviderContext;
