"use client"
import { IoNotifications } from "react-icons/io5";
import {Field, ImageComp} from "@/components";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Api} from "@/api/Api";
import {useRouter} from "next/navigation";
import {routes} from "@/recources";
export default function Notifications() {
    const [orderId, setOrderid] = useState("");
    const [order, setOrder] = useState<[]>([]);
    const customerId = useSelector((state: RootState) => state.authReducer.value.uid);
    const router = useRouter()
    useEffect(() => {
        if(customerId != "") {
            Api.all(`order/getOrderByCustomer/${customerId}`).then((value: any) => {
                setOrder(value)
                setOrderid(value.id);
               // console.log(value)
            })
        }
    }, [])



    if(order.length == 0) {
        return (
            <div className={"flex items-center justify-center my-5 w-full"}>
                <div>
                    <h1 className={"text-center text-xl"}>Pas de notification</h1>
                    <ImageComp src={"/svg/Empty-cuate.svg"} width={600} height={600} styles={"mt-5 self-center"}/>
                </div>
            </div>
        )
    }
    return (
        <main className="flex items-center justify-center md:py-20 px-5 py-5">
            <div className={""}>
                <h1 className={"text-[25px] md:text-[40px] font-bold"}>Notifications</h1>

                {
                    order.map((ord: any, index) => {
                        return <div key={index} className={"bg-bgopacity w-full md:w-[600px] p-2 md:p-5 rounded-[10px] "}>


                            <div className={"flex space-x-3"}>
                                {/*profil icon*/}
                                <div
                                    className={"rounded-full border-[5px] border-violet w-[50px] h-[50px]  md:w-[90px] md:h-[90px] flex items-center justify-center"}>
                                    <IoNotifications
                                        className={"md:w-[80px] md:h-[80px] w-[30px] h-[30px] self-center"}/>
                                </div>

                                {/*text*/}
                                <div className={"flex flex-col space-y-1"}>
                                    {/*text*/}
                                    <div className={"flex space-x-2"}>
                                        <h1 className={"font-bold text-[20px]"}> Nouvelle commande</h1>
                                        <h1 className={"font-bold text-[15px]"}>{ord.createAt} </h1>
                                    </div>

                                    {/*info*/}

                                    <h1  className={"text-btnbg cursor-pointer "} onClick={() => {
                                        router.push(`${routes.facture}/ ${ord.id}`)
                                    }}> télécharger la facture</h1>



                                </div>
                            </div>


                        </div>
                    })
                }
            </div>
        </main>
    )
}