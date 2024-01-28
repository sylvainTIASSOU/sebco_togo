'use client'
import React, {useEffect, useState} from 'react'
import Confetti from 'react-confetti'
import Link from "next/link";
import * as Yup from "yup";
import { useFormik} from "formik";
import {CommentModel} from "@/models/CommentModel";
import {routes} from "@/recources";
import {Field} from "@/components";
import { BsFillSendFill } from "react-icons/bs";
import {useRouter} from "next/navigation";
import {Api} from "@/api/Api";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

export  default function  Congratulation() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const router = useRouter()
    const customerId = useSelector((state: RootState) => state.authReducer.value.uid);

    useEffect(() => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }, []);

    const formik = useFormik({
        initialValues: {
            content: "",
        },

        validationSchema: Yup.object({
            content: Yup.string().required("")
        }),

        onSubmit: async (values) => {
            const commentModel = new CommentModel(values.content, 0, Number(customerId));
            // console.log(commentModel);
            const response = await Api.post(commentModel, 'comment/add');

            if(response.ok) {
                values.content = '';
                router.push(`${routes.notifications}`)

            }
            else {
                console.log('erreur survenu lors du poste')
            }
        }
    })

    return (
        <main className={"w-full md:p-20 pt-10 px-3"}>
            <h1 className={" text-[30px] md:text-[50px] font-bold text-center"}>
                SeBcO VOUS REMERCIE POUR VOTRE CONFIANCE
            </h1>

            <div className={"flex flex-col-reverse md:flex-row md:content-between md:justify-between"}>


                <div className={"w-full mt-[10%] md:ml-5"}>
                    <h1 className={"text-center md:w-full text-[30px]   mt-10 "}>Votre commande est en route pour votre addresse</h1>
                    <div className={" mt-5"}>

                        <h1 className={"font-bold text-[20px] text-center "}>
                            Laissez nous un commentaire sur votre experience d'utilisation <br/>
                            et télécharger votre facture
                        </h1>
                        {/*form*/}

                        <div className={"flex items-center justify-center mt-5"}>
                            <form onSubmit={formik.handleSubmit} className={"flex space-x-3"}>
                                <Field type={"text"}
                                       name={"content"}
                                       placeholder={"Saisissez votre commentaire"}
                                       actionOnchange={formik.handleChange}
                                       value={formik.values.content}
                                />
                                <button type={"submit"}
                                        disabled={!formik.errors.content ? false : true}
                                >
                                    <BsFillSendFill className={"w-[45px] h-[45px] md:w-[30px] md:h-[30px]"}/>
                                </button>
                            </form>
                        </div>

                    </div>

                </div>

                <div className={"w-full"}>
                    <img alt={"img"} src={"/Pick up truck.gif"} className={"bg-content md:w-[600px] md:h-[500px] "} />
                </div>
            </div>


            <Confetti
                width={width}
                height={height}
            />
        </main>
    )
}