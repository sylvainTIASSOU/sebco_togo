'use client'
import React, {useState} from "react";
import Image from 'next/image'
import {Button, Field} from "@/components";
import { FaFingerprint } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import {useFormik} from "formik";
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import {routes} from "@/recources";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import CustomerModel from "@/models/CustomerModel";
import {Api} from "@/api/Api";
import {UserModel} from "@/models/UserModel";
import {useRouter} from "next/navigation";

export default function Registre() {
    const [valide, setValide] = useState("");
    const router = useRouter()
    /// notify fonction
    const notify = () => toast.success('Vous faite desormait partie de nos clientel', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            number: "",
            password: "",
            password2: "",
            type: "",
            socity: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('le nom est obligatoire'),
            lastName: Yup.string().required('le prénom est obligatoire'),
            email: Yup.string().email('Entrer un email valide').required('l\'email est obgligatoire'),
            number: Yup.number().required('le numéro est obligatoire'),
            password: Yup.string().min(8, 'Entrer un mot de passe valide').required('le mot de passe est obligatoire'),
            password2: Yup.string().required('confirmer le mot de passe').min(8, 'Entrer un mot de passe valide'),
            type: Yup.string().notRequired(),
            socity: Yup.string().notRequired(),
        }),

        onSubmit: async (values) => {
            if (values.password == values.password2)
            {
                const customerModel = new CustomerModel(values.firstName, values.lastName, values.email, values.type, values.socity);
                const resp = await Api.post(customerModel, 'customer/add')
                if(resp.ok) {
                    const customer : CustomerModel = await resp.json();
                    const userModel = new UserModel(customer.id, Number(values.number), values.password, "customer");
                    const respUser = await Api.post(userModel, 'users/add');

                    if (respUser.ok) {
                        notify();
                        router.push(routes.login);
                    }
                }

            }
            else {
               setValide("les mots de passe ne sont pas conformes");
            }

        }
    })

    return (
        <main className="w-full p-3 md:p-10">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className={" flex flex-col space-y-2 md:flex-row md:content-between md:justify-between bg-bgopacity self-center w-full rounded-[50px]"}>
                {/*image*/}
                <div className={"w-full"}>
                    <Image src={"/svg/Tablet login-pana.svg"}
                           alt={"login_image"}
                           width={550}
                           height={550}
                           priority={true}
                           className={"bg-cover bg-no-repeat"}
                    />
                </div>

                {/*form*/}
                <div className={" p-2 md:p-10 w-full md:bg-bgopacity rounded-[50px]"}>
                    <h1 className={"text-[35px] font-bold text-center  "}>Créer un compte</h1>

                    <p className={`${valide != "" ? "text-accent text-center  my-5" : 'text-center my-5'}`}> {valide != "" ? valide : 'les champs précedé de * sont obligatoir'} </p>
                    <form onSubmit={formik.handleSubmit} className={" mt-[5px] flex flex-col space-y-5"}>

                            {/*form1 nom*/}
                        <div className={"flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5 md:content-between md:justify-between"}>
                            <div className={""}>
                                <label className={`${formik.touched && formik.errors.firstName ? 'text-accent' : ''}`}> {formik.touched && formik.errors.firstName ? formik.errors.firstName : 'Nom'}  <span className={"text-accent"}>*</span></label>
                                <Field type={"text"}
                                       name={"firstName"}
                                       placeholder={"Votre Nom"}
                                       value={formik.values.firstName}
                                       actionOnchange={formik.handleChange}
                                       icon= <IoPerson/>
                                />
                            </div>

                            <div className={""} >
                                <label
                                    className={`${formik.touched && formik.errors.lastName ? 'text-accent' : ''}`}> {formik.touched && formik.errors.lastName ? formik.errors.lastName : 'Prénom'}
                                    <span className={"text-accent"}>*</span></label>
                                <Field type={"text"}
                                       name={"lastName"}
                                       placeholder={"Votre prénom"}
                                       value={formik.values.lastName}
                                       actionOnchange={formik.handleChange}
                                       icon= <IoPerson/>
                                />

                            </div>
                        </div>
                        {/*form2 email*/}
                        <div className={"flex flex-col space-y-5 md:space-x-5 md:flex-row md:space-y-0 md:content-between md:justify-between"}>
                            <div className={""}>
                                 <label>Addresse Email<span className={"text-accent"}>*</span></label>
                                <Field type={"email"}
                                       name={"email"}
                                       placeholder={"Votre Email"}
                                       value={formik.values.email}
                                       actionOnchange={formik.handleChange}
                                       icon= <MdEmail/>
                                />

                            </div>

                            <div className={""}>
                                <label
                                    className={`${formik.touched && formik.errors.number ? 'text-accent' : ''}`}> {formik.touched && formik.errors.number ? formik.errors.number : 'Téléphone'}
                                    <span className={"text-accent"}>*</span></label>
                                <Field type={"tel"}
                                       name={"number"}
                                       placeholder={"Votre Numéro"}
                                       value={formik.values.number}
                                       actionOnchange={formik.handleChange}
                                       icon= <FaPhoneFlip/>
                                    pattern={"[0-9]{8}"}
                                       maxLength={8}
                                />

                            </div>
                        </div>

                        {/*form3 type a socity*/}
                        <div className={"flex flex-col space-y-5 md:space-x-5 md:flex-row md:space-y-0 md:content-between md:justify-between"}>

                            <div className={""}>
                                <label>Type de compte</label>
                                <div
                                    className='flex content-between justify-between md:pt-[10%] md:content-normal md:justify-normal space-x-5'>
                                    <div className='flex space-x-2 '>
                                        <input type="radio" name='type' value='profes'
                                               onChange={formik.handleChange}
                                               className='border-2  border-btnbg rounded-[10px]  pl-3 bg-transparent text-white font-bold'/>
                                        <h1>Compte professionnel<span className='text-accent'></span></h1>
                                    </div>

                                    <div className='flex space-x-2'>

                                        <input type="radio" name='type' value='perso'
                                               onChange={formik.handleChange}
                                               className='border-2  border-btnbg rounded-[10px]  pl-3 bg-transparent text-white font-bold'/>
                                        <h1>Compte personnel<span className='text-accent'></span></h1>
                                    </div>

                                </div>
                            </div>

                            <div className={""}>
                                <label
                                    className={`${formik.touched && formik.errors.socity ? 'text-accent' : ''}`}> {formik.touched && formik.errors.socity ? formik.errors.socity : 'Nom de la société'}
                                    <span className={"text-accent"}>*</span></label>
                                <Field type={"text"}
                                       name={"socity"}
                                       placeholder={"Nom de la société"}
                                       value={formik.values.socity}
                                       actionOnchange={formik.handleChange}
                                       icon=<FaWarehouse/>
                                       pattern={"[0-9]{8}"}
                                       maxLength={8}
                                />

                            </div>
                        </div>

                        {/*form3*/}
                        <div className={"flex flex-col space-y-5 md:space-x-5 md:flex-row md:space-y-0 md:content-between md:justify-between"}>
                            <div className={""}>
                                <label
                                    className={`${formik.touched && formik.errors.password ? 'text-accent' : ''}`}> {formik.touched && formik.errors.password ? formik.errors.password : 'Mot de passe'}
                                    <span className={"text-accent"}>*</span></label>
                                <Field type={"password"}
                                       name={"password"}
                                       placeholder={"Votre mot de passe"}
                                       value={formik.values.password}
                                       actionOnchange={formik.handleChange}
                                       icon= <FaFingerprint/>
                                />

                            </div>

                            <div className={""}>
                                <label
                                    className={`${formik.touched && formik.errors.password2 ? 'text-accent' : ''}`}> {formik.touched && formik.errors.password2 ? formik.errors.password2 : 'Confirmer le mot de passe'}
                                    <span className={"text-accent"}>*</span></label>
                                <Field type={"password"}
                                       name={"password2"}
                                       placeholder={"Confirmez le mot de passe"}
                                       value={formik.values.password2}
                                       actionOnchange={formik.handleChange}
                                       icon=<FaFingerprint/>
                                />

                            </div>
                        </div>


                        {/*button*/}
                        <div className={"my-[10px] self-center"}>
                            <Button title={"VALIDER"}
                                    type={"submit"}
                                    style={"bg-violet text-white"}
                            />
                        </div>
                    </form>

                    <div className={"my-5"}>
                        <p className={"text-center"}>Vous avez déjà un compte? <Link href={routes.login} className={"text-vert"}>Connectez vous</Link> </p>

                    </div>
                </div>
            </div>
        </main>
    )
}