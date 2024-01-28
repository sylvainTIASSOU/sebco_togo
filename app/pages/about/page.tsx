'use client'
import Link from "next/link";
import {
    ImFacebook,
    ImInstagram,
    ImTwitter
} from "react-icons/im";
import { HiCircleStack, HiInbox  } from "react-icons/hi2";
import { FaLeaf, FaUserCheck } from "react-icons/fa";
import React, { useMemo } from 'react'
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '380px',
};

const person = [
    {
        name: "Sebatien ZINSSOU",
        image: "/images/profil/undraw_pic_profile_re_7g2h.svg",
        fonction: "Entrepreneur",
        fb: "",
        twitter: '',
        insta: ''
    },
    {
        name: "Sylavain Tiassou",
        image: "/images/profil/prof2.png",
        fonction: "Analyste Programmeur",
        fb: "",
        twitter: '',
        insta: ''
    },
    {
        name: "Victoire tamegnon",
        image: "/images/profil/prof1.png",
        fonction: "Administrateur Systeme",
        fb: "",
        twitter: '',
        insta: ''
    },
]
export default function About() {
    const center = useMemo(() => ({
        lat: 6.23433,
        lng: 1.06874,
    }), []);
    return (
        <main className="md:py-10 p-3 md:px-32 ">
            <div className='md:px-[70px] flex flex-col md:flex-row md:justify-between md:content-between'>
                {/**description */}
                <div className='md:w-[900px] '>
                    <h1 className='text-textbg text-[30px] font-bold'>L'ENTREPRISE ET L'INNOVATION</h1>
                    <br/>
                    <p className='text-sm md:text-[25px]'>
                        Soucieux de répondre aux attentes de notre clientèle depuis notre création,
                        nous nous attachons à toujours améliorer nos outils de production.
                        Grâce à une recherche de qualité et de produits innovant, Sables et Graviers de nos carrières
                        vous garantit une qualité de service optimale.
                        De l’extraction au conditionnement en passant par les véhicules de transport, notre équipe
                        s’appuie sur l’innovation pour mettre à votre disposition tout son savoir-faire.
                    </p>
                </div>

                {/** image */}
                <div
                    className='bg-[url("/images/cam3.jpg")] bg-cover bg-center w-full h-[350px] md:w-[900px] md:h-[300px] '></div>
            </div>

            {/*en gagement */}
            <div
                className=' md:px-[70px] mt-10 flex flex-col md:flex-row-reverse md:justify-between md:content-between'>
                {/**description */}
                <div className='md:w-[700px] '>
                    <h1 className='text-textbg text-[30px] font-bold '>NOS ENGAGEMENTS</h1>
                    <br/>
                    <div className='w-full flex flex-col'>
                        {/*enga1 */}
                        <div className='flex content-between justify-between '>
                            <div className='justify-center content-center items-center w-full'>
                                <HiCircleStack className='text-textbg ml-[25%]  w-[100px] h-[100px] '/>
                                <h1 className='text-center text-[20px] text-textbg '>Innovation</h1>
                                <h1 className='text-center text-[12px] '>
                                    Un circuit local, livraison à domicile ou retrait sur place, produit décoratifs ou
                                    techniques, notre équipe s’adapte à votre demande.
                                </h1>
                            </div>

                            <div className='justify-center content-center items-center w-full'>
                                <FaLeaf className='text-textbg w-[100px] ml-[25%] h-[100px]  '/>
                                <h1 className='text-center text-[20px] text-textbg '>Environnemental</h1>
                                <h1 className='text-center text-[12px] '>
                                    Nous adhérons à l’esprit de la Charte Environnementale mise en œuvre par la
                                    profession
                                </h1>
                            </div>
                        </div>
                        {/*enga2 */}
                        <div className='flex content-between justify-between'>
                            <div className='justify-center content-center items-center w-full'>
                                <HiInbox className='text-textbg w-[100px] ml-[25%] h-[100px]  '/>
                                <h1 className='text-center text-[20px] text-textbg '>Devis gratuit</h1>
                                <h1 className='text-center text-[12px] '>
                                    Maîtrisez votre budget en utilisant notre calculateur et estimez simplement le
                                    tonnage en fonctionde vos besoins.
                                </h1>
                            </div>

                            <div className='justify-center content-center items-center w-full'>
                                <FaUserCheck className='text-textbg w-[100px] ml-[25%] h-[100px]  '/>
                                <h1 className='text-center text-[20px] text-textbg '>Conseil</h1>
                                <h1 className='text-center text-[12px] '>
                                    Sur place, par téléphone ou par demande de devis, notre équipe est à votre écoute
                                    pour vous conseiller sur le choix des matériaux adaptés à votre projet.
                                </h1>
                            </div>
                        </div>


                    </div>
                </div>

                {/** image */}
                <div
                    className='bg-[url("/images/cam2.jpg")] md:mt-[8%] bg-cover  bg-center w-full h-[350px] md:w-[700px] md:h-[350px] '></div>

            </div>

            {/* emplacement */}
            <div className='mt-8'>
                <h1 className='text-textbg text-[30px] font-bold '>OU SOMME NOUS?</h1>
                <div className=' mt-3'>
                    {/* <GooglePlace/>*/}
                    <LoadScript
                        googleMapsApiKey={"AIzaSyCyQ0LQ6XqiaXPRK2Wi_zssbLk2gSaiQfY"}
                    >
                        <GoogleMap
                            mapContainerStyle = {containerStyle}
                            center = {center}
                            zoom = {14}
                        >
                            <Marker position={center} />

                        </GoogleMap>

                    </LoadScript>
                </div>

            </div>

            {/* team */}
            <div>
                <div className=' bg-white py-10 h-auto'>
                    <div className="flex flex-col space-y-10 content-center justify-center items-center">
                        <h1 className='text-[25px] font-bold text-textbg text-center '> Notre équipe</h1>

                        <div className="flex flex-col space-y-5 mt-3  md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-6 ">
                            {
                                person.map((p, index) => {
                                    return <div key={index} className="w-[250px] content-center items-center ">
                                        <div className='h-[300px] w-[250px]   '>
                                            <img src={p.image} alt="" className="bg-cover bg-center bg-no-repeat"/>

                                        </div>
                                        <div className=" bg-white w-[180px] h-auto p-3 relative left-[18%] ">
                                            <h1 className="text-center font-bold text-black text-[15px] ">{p.name} </h1>
                                            <h1 className="text-center font-thin text-black text-[12px] ">{p.fonction} </h1>

                                            <div className="flex space-x-5 w-auto self-center mt-2 ml-[20%]">
                                                <div>
                                                    <Link href={p.fb}>
                                                        <ImFacebook className='w-[13px] bg-black  '/>
                                                    </Link>
                                                </div>

                                                <div>
                                                    <Link href={p.insta}>
                                                        <ImInstagram className='w-[13px]  bg-black '/>
                                                    </Link>
                                                </div>

                                                <div>
                                                    <Link href={p.twitter}>
                                                        <ImTwitter className='w-[13px] bg-black '/>
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                })
                            }

                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}