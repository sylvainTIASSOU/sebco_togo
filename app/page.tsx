'use client'
import Link from "next/link";
import {routes} from "@/recources";
import {useRouter} from "next/navigation";
import Page1 from "@/components/Page1";
import {HiEye, HiMiniUserCircle} from 'react-icons/hi2'
import {MdTouchApp} from "react-icons/md";
import {FaChild, FaPersonBiking} from "react-icons/fa6";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {motion} from 'framer-motion';
import {Api} from "@/api/Api";


type commentType = {
    name: string,
    content: string,
}
export default function Home() {
    const route = useRouter();
    const [comments, setComments] = useState<commentType[]>([]);

    useEffect(() => {

         Api.all('comment/all').then((datas) => {
             setComments(datas)
         })

    }, [])
    return (
        <main className="md:w-full ">
            <div
                className='h-[500px] md:h-screen bg-cam2  bg-no-repeat bg-cover bg-center bg-content bg-opacity-50'>

                <div className='text-center pt-[40%] px-5 self-center w-full text-[20px] md:text-[25px] font-light md:text-left md:pl-[20%] md:pt-[13%] md:w-full '>
                  <span className='text-textbg text-[27px] md:text-[45px] font-extrabold '>Bienvenue sur notre site </span>
                    <br/>
                    <div className={"md:w-[900px] "}>
                        dédié aux matériaux de construction, où vous
                        trouverez une variété exceptionnelle
                        de sable et de gravier pour donner vie
                        à vos projets.
                        Explorez notre sélection et façonnez vos idées avec des

                        produits de qualité et un service fiable
                    </div>

                    .
                </div>

            </div>


            {/*the 2 card */}
            <div className='flex flex-col md:flex-row md:justify-between md:content-between  '>

                <div className='flex flex-col space-y-3 bg-white py-2 md:w-full md:mr-4 '>
                    <h1 className='text-center font-bold text-black '>SABLES, GRAVIERS ET REMBLAIS</h1>
                    <h2 className='text-center font-regular text-black text-sm '>Découvrez notre gamme de matériaux</h2>
                    <h3 className='text-center font-bold text-textbg'><Link href={routes.productCat}>EN SAVOIR
                        PLUS</Link></h3>
                </div>


                <div className='flex flex-col space-y-2 bg-[#833E47] py-2 md:w-full md:ml-4'>
                    <h1 className='text-center font-bold'>RETRAIT ET LIVRAISON</h1>
                    <h2 className='text-center font-regular text-sm'>Découvrez nos mode de transport et de
                        livraison</h2>
                    <h3 className='text-center font-bold text-textbg'><Link href={routes.truck}>EN SAVOIR PLUS</Link>
                    </h3>
                </div>
            </div>

            {/*page of society */}
            <div className=' md:flex md:items-center md:justify-center w-full  '>

                <div>

                    <div className='mt-8   mb-2 px-4 md:px-10 flex flex-col space-y-5'>
                        <div className='md:hidden'>
                            <h1 className='text-lg font-bold text-center'>NOTRE SOCIETÉ</h1> <br/>
                            <hr className='w-[100px] h-[8px] bg-textbg text-textbg text-center '/>
                            <br/>
                        </div>

                        <div className='md:flex-row md:space-x-5 flex flex-col space-y-4'>
                            <div className=''>
                                <img src="/images/cam4.jpg" alt="" className='md:w-[500px] md:h-[400px] md:mt-[20%] '/>
                            </div>

                            <div>
                                <div className='hidden md:block'>
                                    <h1 className='text-lg font-bold text-left'>NOTRE SOCIETÉ</h1> <br/>
                                    <hr className='w-[100px]  h-[8px] bg-textbg text-textbg text-center '/>
                                    <br/>
                                </div>
                                <p className=' text-[15px] md:text-[20px] fond-regular text-center md:text-left md:w-[550px] '>
                                    La société « SeBcO », fondée en 2023,
                                    exploite des gisements de sable, graviers, galets et
                                    de quartz. Elle a acquis à cette occasion un savoir-faire dans
                                    l’exploitation de carrières, qu’elle propose à d’autres exploitants de carrière,
                                    sous la forme de prestations de services. Elle dispose à cet effet d’un parc
                                    d’engins de travaux publics (pelles mécaniques, chargeurs, dumpers, bulldozer)
                                    pilotés par des conducteurs formés à ce type d’exploitation.
                                    Nous assurons la vente et la livraison de sables de construction,
                                    mélanges à béton « tout-venant », graviers et galets de décoration ainsi que des
                                    graves
                                    et gravillons calcaires.
                                </p>

                                {/* boutton */}
                                <div className=' mt-[10px]  ml-[30%] md:ml-[0%]'>
                                    <button type="button"
                                            onClick={() => {
                                                route.push(routes.about)
                                            }}
                                            className='py-2 px-4 w-auto bg-btnbg  '
                                    >
                                        DÉCOUVRIR
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>


                    {/*page of products */}

                    <div className='mt-8 mb-2 px-4  md:mb-10  md:px-10 flex flex-col space-y-5'>
                        <div className='md:hidden'>
                            <h1 className='text-lg font-bold text-center'>NOS MATÉRIAUX DE HAUTE QUALITÉ</h1> <br/>
                            <hr className='w-[100px] h-[8px] bg-textbg text-textbg text-center '/>
                            <br/>
                        </div>

                        <div className='md:flex-row md:space-x-5 flex flex-col space-y-4'>
                            <div className='md:hidden'>
                                <Page1/>
                            </div>

                            <div>
                                <div className='hidden md:block'>
                                    <h1 className='text-lg font-bold text-left'>NOS MATÉRIAUX DE HAUTE QUALITÉ</h1>
                                    <br/>
                                    <hr className='w-[100px]  h-[8px] bg-textbg text-textbg text-center '/>
                                    <br/>
                                </div>
                                <p className=' text-[15px] md:text-[20px] fond-regular text-center md:text-left md:w-[550px] '>
                                    Nous disposons d’une large gamme de matériaux pour la construction, la filtration
                                    et la décoration : sables, ramblais et graviers lavés, cailloux roulés ou concassés,
                                    calcaires,
                                    mélanges à béton, pouzzolanes, sables hippiques, galets. Que vous soyez un
                                    particulier,
                                    un grossiste ou un professionnel de la construction,
                                    vous trouverez chez nous des matériaux de haute qualité, livrables sur vos
                                    chantiers.
                                </p>

                                {/** boutton */}
                                <div className=' mt-[10px]  ml-[30%] md:ml-[0%]'>
                                    <button type="button"
                                            className='py-2 px-4 w-auto bg-btnbg '
                                            onClick={() => {
                                                route.push(routes.products)
                                            }}
                                    >
                                        EN SAVOIR PLUS
                                    </button>
                                </div>
                            </div>
                            <div className='hidden md:block md:mr-[3px]'>
                                <Page1/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/**the seconde page  */}
            <div className=''>
                {/** les cards */}

                <div className=' flex  flex-col md:flex-row md:content-between md:justify-between'>

                    {/**carde 1 */}
                    <div
                        className='flex p-3 flex-col bg-blue-950 content-center items-center justify-center md:w-full md:h-[200px] '>
                        <h1 className='text-center text-[50px] text-textbg font-extrabold '>1</h1>
                        <div className=''>
                            <MdTouchApp className='w-[100px] h-[100px] '/>
                        </div>

                        <h2 className='text-center'>je fais mon choix</h2>

                    </div>

                    {/**carde 2 */}
                    <div
                        className='flex p-3  flex-col bg-blue-700 content-center items-center justify-center md:w-full'>
                        <h1 className='text-center text-[50px] text-textbg font-extrabold '>2</h1>
                        <div className=''>
                            <HiEye className='w-[100px] h-[100px]'/>
                        </div>

                        <h2 className='text-center'>je pré-visualise mon rendu</h2>

                    </div>

                    {/**carde 3 */}
                    <div
                        className='flex p-3  flex-col bg-blue-500 content-center items-center justify-center md:w-full'>
                        <h1 className='text-center text-[50px] text-textbg font-extrabold '>3</h1>
                        <div className=''>
                            <FaPersonBiking className='w-[100px] h-[100px]'/>
                        </div>

                        <h2 className='text-center'>je passe ma commande</h2>

                    </div>

                    {/**carde 4 */}
                    <div
                        className='flex p-3  flex-col bg-blue-400 content-center items-center justify-center md:w-full'>
                        <h1 className='text-center text-[50px] text-textbg font-extrabold '>4</h1>
                        <div className=''>
                            <FaChild className='w-[100px] h-[100px]'/>
                        </div>

                        <h2 className='text-center'>je reçois ma commande</h2>

                    </div>

                </div>
            </div>

            {/** page of comment */}

            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{once: true, amount: 0.8}}
                className=' bg-white/[5%] md:h-auto py-5 content-center justify-center items-center '
            >

                <div className=" p-8 mt-[20px] ">
                    <h1 className=' text-[30px] font-bold ml-[15px]  '>Avis des clients sur les commandes</h1>
                    <div className='mt-[20px] '>
                        {/*<Commentpage />*/}


                        <Swiper
                            spaceBetween={10}
                            centeredSlides={true}
                            autoplay={{
                                delay: 5500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper  "
                        >


                            {comments.length == 0 ?
                                <h1 className='text-center text-[20px] font-regular'>Pas de commentaire pour
                                    l'instant</h1> :
                                comments.map((comment, index) => {
                                    return <SwiperSlide key={index} className=''>
                                        <div
                                            className='bg-bgopacity rounded-[50px]  md:h-auto p-10 md:w-[450px] md:ml-[30%]  '>
                                            {/**profil */}
                                            <div>
                                                <HiMiniUserCircle className='w-[60px] h-[60px] '/>
                                            </div>

                                            {/**user name */}
                                            <div>
                                                <h3 className='text-[22px]'>{comment.name}</h3>
                                            </div>

                                            {/** content of comment */}
                                            <div>
                                                <p>
                                                    {comment.content}

                                                </p>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                })
                            }


                        </Swiper>
                    </div>
                </div>
            </motion.div>


        </main>
    )
}
