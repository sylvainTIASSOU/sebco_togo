"use client"
import {useEffect} from "react";

const TestPage = () => {

    const getDta = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/all', {
                mode: 'no-cors',
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                }
            });

            if(response.ok) {
                    return await response.json();
                  // console.log(response.json());
            }
            else {
                throw new Error("erreur");
            }
        }
        catch (erro){
            //console.error(erro)
        }
    }
    async function all(): Promise<[]> {
        // const url = `${Api.url}${endPoint}`;
        try {
            const res = await fetch('https://sebco-api-update.vercel.app/users/all', {
                //mode: 'no-cors',
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                }
            });
            if (!res.ok) {
                throw new Error("la reponse du réseau n'est pas OK");
            }

            //const data = await res.json();
            return await res.json();
        } catch (errors) {
            console.log(`erreur de recuperation de donné ${errors}`);
            throw errors;
        }
    }

    useEffect( () => {
        all().then((val) => {
            console.log(val)
        })
    }, []);
    return (
        <div>
            test page
        </div>
    );
}

export  default TestPage;