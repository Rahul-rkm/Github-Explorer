import { createContext, useReducer } from "react";
import alertReducer from './AlertReducer'

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const initaialState = null;
    const [state, dispatch] = useReducer(alertReducer, initaialState);

    // set an alert
    const setAlert = (msg, type) => {
        dispatch({ type: 'SET_ALERT', payload: { msg, type } });
        // set timeout for alert 
        setTimeout(() => {
            dispatch({ type: 'CLEAR_ALERT' });
        }, 3000);
    }

    return <AlertContext.Provider value={{ alert: state, setAlert }}>
        {children}
    </AlertContext.Provider>
}

export default AlertContext;