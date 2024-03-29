'use client'
import {createContext, useContext, useState} from "react";
/*import {io} from "socket.io-client"
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {HiBell} from "react-icons/hi";

const socket = io('http://localhost:3001');*/

/*
socket.on('connect', () => {

    console.log('la connexion est etablie')
})

socket.on('message', (message) => {
    notify()
    console.log(`message recu: ${message}`);
})

socket.on('disconnect', () => {
    console.log('la connexion est deconnecté');
})


const notify = () => toast.info(" Nouveau notification de commande", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    icon: ({theme, type}) => <HiBell  />
});*/
const userContext = createContext({});
// @ts-ignore
export const UserContextProviderClass = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <userContext.Provider value={{user, setUser}}>
            {/*
             <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            */}
            {children}
        </userContext.Provider>
    )
}
export const userContextProvider = () => useContext(userContext);
