"use client"
import {useEffect, useState} from "react";
import {ImageComp} from "@/components";
import {Api} from "@/api/Api";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

export default function History() {
    const [history, setHistory] = useState<[]>([])
    const customerId = useSelector((state: RootState) => state.authReducer.value.uid)

    useEffect(() => {
        if(customerId != "") {
            Api.all(`order/getOrderByCustomer/${customerId}`).then((order) => {
                console.log(order)
            })
        }


    }, []);

    if(history.length == 0) {
        return (
            <div className={"flex items-center justify-center my-5 w-full"}>
                <div>
                    <h1 className={"text-center text-xl"}>Pas de commande effectué</h1>
                    <ImageComp src={"/svg/Empty-cuate.svg"} width={600} height={600} styles={"mt-5 self-center"}/>
                </div>
            </div>
        )
    }
    return (
        <main className="">
            <h1>history</h1>
        </main>
    )
}