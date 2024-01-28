"use client"
import {Button} from "@/components/index";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaTiktok } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LegacyRef, useRef} from "react";
import emailjs from '@emailjs/browser';


const network = [
    {
        name: "facebook",
        link: "https://www.facebook.com/profile.php?",
        icon: <FaFacebookF className={"bg-cover bg-no-repeat"}/>,

    },

    {
        name: "Email",
        link: "sebcotogo@gmail.com",
        icon: <MdEmail className={"bg-cover bg-no-repeat"}/>,
    },

    {
        name: "phone",
        link: "22898853030",
        icon: <FaPhone className={"bg-cover bg-no-repeat"}/>,
    },

    {
        name: "tiktok",
        link: "",
        icon: <BsTwitterX className={"bg-cover bg-no-repeat"}/>,
    },

    {
        name: "whatsapp",
        link: "",
        icon: <FaWhatsapp className={"bg-cover bg-no-repeat"}/>,
    },

    {
        name: "X",
        link: "'https://twitter.com/tamegnon1542954",
        icon: <BsTwitterX className={"bg-cover bg-no-repeat"}/>,
    },

    {
        name: "tiktok",
        link: "https://www.tiktok.com/@sebco33?is_from_webapp=1&sender_device=pc",
        icon: <FaTiktok className={"bg-cover bg-no-repeat"}/>,
    }


];
const Footer = () => {
    const form = useRef<HTMLFormElement>();
    // fonction of notification
    const notifyError = () => toast.error(' Oups! erreur de transmission. Merci de réessayer!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notify = () => toast.success(' Message envoyé avec succè', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    //fonction to send email
    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm( String(process.env.EMAISERVICEID) ,  String(process.env.EMAILTEMPLETEID), form.current!,  String(process.env.EMAILPUBLICKEY))
            .then((result) => {
                notify();
            }, () => {
                notifyError();
            });
    };
    //fonction to validate form

    return(
        <footer className={" mb-20 md:mb-0 items-center justify-center w-full p-[20px] bg-violet/[50%] flex flex-col md:flex-row md:space-x-20"}>
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
            {/* image*/}
            <div className={""}>
                {/* image*/}
                <Image src={"/svg/Pick up truck-amico.svg"}
                       width={350}
                       height={350}
                       alt={"foot_image"}
                       className={"bg-cover bg-no-repeat"}
                       priority={true}
                />
            </div>

            {/* form*/}
            <div>
                <h1 className={"text-[40px] font-bold "}>
                    Nous Contacter.
                </h1>
                {/*form1*/}
                <form ref={form as LegacyRef<HTMLFormElement> } onSubmit={sendEmail}>


                    <div className={"flex flex-col md:flex-row space-y-5 md:space-x-5"}>
                        {/*form1*/}
                        <div className={"flex flex-col space-y-2"}>
                            {/*nom*/}

                            <input type={'text'} name={'from_name'}
                                   placeholder={'votre Nom'}
                                   required={true}
                                   className={"h-[50px] border-hidden outline-none border focus:border-0 focus:border-hidden  bg-btnbg rounded-[10px] pl-5 text-white text-[25px] "}

                            />

                            {/*email*/}

                            <input type={'email'} name={'from_email'}
                                   placeholder={'votre Email'}
                                   required={true}
                                   className={"h-[50px] border-hidden outline-none border focus:border-0 focus:border-hidden  bg-btnbg rounded-[10px] pl-5 text-white text-[25px] "}
                            />
                        </div>

                        {/*form2*/}
                        <div className={""}>
                            {/*message*/}


                            <textarea name={"message"}
                                      required={true}
                                      className={"h-[90px] w-full border-0 border-btnbg pl-5 text-white text-[25px] bg-btnbg rounded-[10px]"}
                                      placeholder={"Votre Message"}
                            >

                            </textarea>
                        </div>
                    </div>

                    {/**button*/}
                    <div className={"mt-[5px]"}>
                        <Button title={"ENVOYER"}
                                type={"submit"}
                                style={"text-black bg-white"}/>
                    </div>


                </form>
                {/* reseau*/}
                <div className={" mr-50 mt-[20px]  flex content-between justify-between md:space-x-3"}>
                    {
                        network.map((net, index) => {
                            return <div key={index} className={""}>
                                {/*icons*/}
                                <Link href={net.link}>
                                    {net.icon}
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>



        </footer>
    );
}
 export default Footer