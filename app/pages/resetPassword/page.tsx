"use client"
import Image from "next/image";
import React, {useState} from "react";
import {Button, Field} from "@/components";
import { FaFingerprint } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useRouter} from "next/navigation";
import sendMessage from "@/controler/ResetPassController";
import {routes} from "@/recources";




export default function ResetPassword() {
    const [telHidden, setTelHidden] =  useState("block");
    const [otpHidden, setOtpHidden] =  useState("hidden");
    const [passHidden, setPassHidden] =  useState("hidden");
    const [validate, setValidate] =  useState("");
    const [otpNumber, setOtpNumber] =  useState(0);
    const router = useRouter();

    //function to gerate otp number
    function generateotp(): number {
        return Math.floor(1000 + Math.random() * 9000);
    }


    //validation function of number
    const telFormik = useFormik({
        initialValues: {
            number: ""
        },
        validationSchema: Yup.object({
            number: Yup.number().integer("le numéro doit être des chiffres").required("obligatoire")
        }),

        onSubmit: (values) => {

            console.log(values)
            //on verifi si le numéro existe dans la bd

          setOtpNumber(generateotp());
            const message =`votre code OTP SeBcO TOGO est: ${otpNumber}`;
           sendMessage(values.number, message);
            setTelHidden("hidden");
            setOtpHidden("block");

        }
    });

    //validation function of otp
    const otpFormik = useFormik({
        initialValues: {
            otp: ""
        },
        validationSchema: Yup.object({
            otp: Yup.number().integer("le numéro doit être des chiffres").required("obligatoire")
        }),

        onSubmit: (values) => {

            // on verifi si le code correspond a clui genérer
            if(otpNumber.toString() == values.otp) {
                setOtpHidden("hidden");
                setPassHidden("block")
            }

        }
    });

    //validation function of password
    const passFormik = useFormik({
        initialValues: {
            password: "",
            password2: ""
        },
        validationSchema: Yup.object({
            passwod: Yup.string().required("le mot de passe est obligatoire").min(8, "le mot de passe doit être superieur à 8"),
            passwod2: Yup.string().required("le mot de passe est obligatoire").min(8, "le mot de passe doit être superieur à 8"),

        }),

        onSubmit: (values) => {
            if(values.password == values.password2)
            {
                //on modifie le mot de passe dans la base de donné
               router.push(routes.login);
            }
            else{
                setValidate("les mots de passe ne sont pas conformes");
            }

        }
    });

    return (
        <main className="w-full md:p-10 p-3">
            <div className={"pb-3 bg-bgopacity rounded-[50px] self-center flex flex-col md:flex-row md:content-between md:justify-between"}>
                {/*image*/}
                <div className={"w-full"}>
                    <Image src={"/svg/Reset password-cuate.svg"}
                           alt={"login_image"}
                           width={550}
                           height={550}
                           priority={true}
                           className={"bg-cover bg-no-repeat"}
                    />
                </div>

                {/*forms*/}
                <div className={"w-full  self-center"}>
                    <h1 className={"text-[35px] font-bold text-center "}>
                        Récupération du mot de passe
                    </h1>
                    {/*number form*/}
                    <div className={` ${telHidden} mt-3`}>
                        <p className={` text-center text-[20px] `}> Un code de vérification sera envoyer sur le numéro.</p>

                        <form onSubmit={telFormik.handleSubmit} className={"flex flex-col space-y-10 mt-3 px-[20px]"}>
                            <div className={"md:w-[400px] self-center"}>
                                <label className={` ${telFormik.touched && telFormik.errors.number ? 'text-accent  text-[18px]' : ' text-[18px]'}`}>{telFormik.touched && telFormik.errors.number? telFormik.errors.number : 'Téléphone'}  <span className={"text-accent"}>*</span> </label>
                                <Field type={"tel"}
                                       name={"number"}
                                       placeholder={"Votre numéro"}
                                       icon=<FaPhoneFlip/>
                                       maxLength={8}
                                       pattern={"[0-9]{8}"}
                                       style={""}
                                       value={telFormik.values.number}
                                       actionOnchange={telFormik.handleChange}
                                />
                            </div>

                            <div className={"self-center"}>
                                <Button title={"Envoyer le code"}
                                        type={"submit"}
                                        style={"bg-vert text-white"}
                                />
                            </div>


                        </form>
                    </div>
                    {/*otp form*/}
                    <div className={`mt-3 ${otpHidden} `}>
                        <p className={"text-center text-[20px]"}>Entrez le code de vérification de 4 chiffers.</p>

                        <form onSubmit={otpFormik.handleSubmit} className={"flex flex-col space-y-10 mt-3 px-[20px]"}>
                            <div className={"md:w-[400px] self-center"}>
                                <label className={` ${otpFormik.touched && otpFormik.errors.otp ? 'text-accent text-[18px]' : 'text-[18px]'} text-[18px]`}> {otpFormik.touched && otpFormik.errors.otp ? otpFormik.errors.otp :'Code OTP' } <span className={"text-accent"}>*</span>
                                </label>
                                <Field type={"tel"}
                                       name={"otp"}
                                       placeholder={"Votre code otp"}
                                       style={""}
                                       maxLength={4}
                                       pattern={"[0-9]{4}"}
                                       value={otpFormik.values.otp}
                                       actionOnchange={otpFormik.handleChange}
                                />
                            </div>

                            <div className={"self-center"}>
                                <Button title={"Continuer"}
                                        type={"submit"}
                                        style={"bg-vert text-white"}
                                />
                            </div>


                        </form>
                    </div>

                    {/*pass form*/}
                    <div className={`mt-3  ${passHidden}`}>
                        <p className={` ${validate != "" ? 'text-accent text-center text-[20px]' : 'text-center text-[20px]'} `}> {validate != "" ? validate : 'Entrez le nouveau mot de passe'} </p>

                        <form onSubmit={passFormik.handleSubmit} className={"flex flex-col space-y-10 mt-3 px-[20px]"}>
                            <div className={"md:w-[400px] self-center"}>
                                <label className={` ${passFormik.touched && passFormik.errors.password ? 'text-accent text-[18px]' : 'text-[18px]'} `}> {passFormik.touched && passFormik.errors.password ? passFormik.errors.password : 'Mot de passe'}  <span className={"text-accent"}>*</span>
                                </label>
                                <Field type={"password"}
                                       name={"password"}
                                       placeholder={"votre nouveau mot de passe"}
                                       icon=<FaFingerprint/>
                                       style={""}
                                       value={passFormik.values.password}
                                       actionOnchange={passFormik.handleChange}
                                />
                            </div>
                            <div className={"w-[400px] self-center"}>
                                <label className={` ${passFormik.touched && passFormik.errors.password2 ? 'text-accent text-[18px]' : 'text-[18px]'} `}> {passFormik.touched && passFormik.errors.password2 ? passFormik.errors.password2 : 'Confirmer le mot de passe'}  <span className={"text-accent"}>*</span>
                                </label>
                                <Field type={"password"}
                                       name={"password2"}
                                       placeholder={"confirmer le mot de passe"}
                                       icon=<FaFingerprint/>
                                       style={""}
                                       value={passFormik.values.password2}
                                       actionOnchange={passFormik.handleChange}
                                />
                            </div>

                            <div className={"self-center"}>
                                <Button title={"Changer"}
                                        type={"submit"}
                                        style={"bg-vert text-white"}

                                />
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}