'use client'
import Image from "next/image";
import {Button, Field} from "@/components";
import { FaFingerprint } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import {useFormik} from "formik";
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import {routes} from "@/recources";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {LoginModel} from "@/models/LoginModel";
import {Api} from "@/api/Api";
import {useDispatch} from "react-redux";
import {logIn} from "@/redux/features/auth-slice";


export default function Login() {
    const router = useRouter()
    const [customerId, setCustomerId] = useState<any>()
    const [erroMsg, setErroMsg] = useState("");
    const dispatch = useDispatch();

    /// notify fonction
    const notify = () => toast.success(' Vous ete connecter', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    // fonction of formulaire
    const formik = useFormik({
       initialValues: {
           number: "",
           password: "",
       } ,

        validationSchema: Yup.object({
            number: Yup.number().required('le numéro est obligatoire').integer("le numéro doit être des chiffres"),
            password: Yup.string().required('le mot de passe est obligatoire'),
        }),

        onSubmit: async (values) => {
           const loginModel = new LoginModel(Number(values.number), values.password);
           const resp = await Api.post(loginModel, 'users/login');

           if(resp.ok)
           {
               const data: any = await  resp.json();

               if(!data.error){
                   dispatch(logIn(data.customer.id));

                   values.number='';
                   values.password='';
                   notify();
                   router.push(routes.cart);
               }
               else {
                   setErroMsg('Le numéro ou le mot de passe est incorrecte. Réessayez!!!!');
                   values.number='';
                   values.password='';
               }
           }
           else {
               setErroMsg('Le numéro ou le mot de passe est incorrecte. Réessayez!!!!');
               values.number='';
               values.password='';
           }

        }
    });
    return (
        <main className=" p-2 md:p-10 my-20 w-full items-center justify-center">
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

                <div className={" self-center mt-5 bg-bgopacity rounded-[25px] md:rounded-[50px] w-full flex flex-col space-y-0 md:flex-row-reverse md:space-x-0"} >
                {/*image*/}
                <div className={" w-full md:mt-16 md:ml-20 md:mr-[50px]"}>
                    <Image src={"/svg/undraw_mobile_encryption_re_yw3o 2.svg"}
                           alt={"login_image"}
                           width={750}
                           height={750}
                           priority={true}
                           className={"bg-cover bg-no-repeat"}
                    />
                </div>

                {/*form*/}
                <div className={"ml-0 p-5 md:bg-bgopacity rounded-[50px] w-full "}>
                    <div className={"w-auto"}>
                        <h1  className={"text-center text-[35px] font-bold "}>Connectez vous</h1>
                        <p className={"text-[18px] text-center mt-4"}>Vous n'avez pas un compte? <Link href={routes.registry}
                                                                                   className={"text-vert"}> Créez un
                            compte!!</Link></p>
                        <form onSubmit={formik.handleSubmit} className={" mt-8 w-auto  flex flex-col space-y-10"}>
                            <div className={"text-accent text-center"}>
                                {erroMsg != "" && erroMsg}
                            </div>
                            {/* field1*/}
                            <div className={"w-auto self-center flex flex-col space-y-2"}>
                                <label className={`${formik.touched && formik.errors.number ? 'text-accent' : 'text-[20px]'}`}>  {formik.touched && formik.errors.number ? formik.errors.number : 'Téléphone'} <span className={"text-accent"}>*</span> </label>
                                <Field type={"tel"}
                                       value={formik.values.number}
                                       actionOnchange={formik.handleChange}
                                       name={"number"}
                                       placeholder={"votre numéro"}
                                       style={""}
                                       icon=<FaPhoneFlip/>
                                />
                            </div>

                            {/* field1*/}
                            <div className={"w-auto self-center flex flex-col space-y-2"}>
                                <label className={`${formik.touched && formik.errors.password ? 'text-accent' : 'text-[20px]'}`}> {formik.touched && formik.errors.password ?  formik.errors.password : 'Mot de passe'}  <span className={"text-accent"}>*</span> </label>
                                <Field type={"password"}
                                       value={formik.values.password}
                                       actionOnchange={formik.handleChange}
                                       name={"password"} 
                                       placeholder={"votre mot de passe"}
                                       style={""}
                                       icon= <FaFingerprint/>
                                />
                            </div>

                            {/* button*/}
                            <div className={"w-auto self-center"}>
                                <Button title={"Se Connecter"}
                                        type={"submit"}
                                        style={"bg-violet text-white"}
                                />
                            </div>
                        </form>

                        <div className={"mt-5"}>
                            <p className={"text-[18px] text-center"}><Link href={routes.resetPass} className={"text-vert"}> Mot de passe
                                oublié</Link></p>

                        </div>


                    </div>

                </div>
            </div>
        </main>
    )
}