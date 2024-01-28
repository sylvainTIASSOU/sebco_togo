"use client"
import React from 'react';
import {MdWorkHistory} from "react-icons/md";
import {HiBellAlert, HiMiniShoppingCart, HiMiniUserCircle,} from "react-icons/hi2";
import Badge from '@mui/material/Badge';
import {Tooltip as ReactTooltip} from "react-tooltip";
import {routes} from "@/recources";
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

export const Header = () => {

    const item = useSelector((state: RootState) => state.cartSlice)
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth)
    const iconsLink = [
        {
            href: routes.notifications,
            name: 'notification',
            icon: <Badge badgeContent={0} color="primary"><HiBellAlert className='h-[35px] w-[35px]'/></Badge>,
        },

        {
            href: routes.cart,
            name: 'panier',
            icon: <Badge badgeContent={item.length} color="primary"><HiMiniShoppingCart className='h-[35px] w-[35px]'/></Badge>,
        },
        {
            href: routes.history,
            name: 'historique',
            icon: <MdWorkHistory className='h-[35px] w-[35px]'/>,
        },
    ]
    return (
        <header
            className={"w-full bg-bgopacity flex flex-col md:flex-row md:justify-between md:content-between md:pr-5"}>
            {/*image*/}
            <div className={"w-full"}>
                <img src={"/images/logo1.jpg"}
                     alt={"logo"}
                     className={"md:hidden w-full bg-cover bg-no-repeat"}
                />
                <Image src={"/images/logo1.jpg"}
                       alt={"logo"}
                       width={200}
                       height={200}
                       priority={true}
                       quality={100}
                       className={" hidden md:block bg-cover bg-no-repeat"}
                />
            </div>


            {/*other*/}
            <div
                className={" headerlLinks md:w-full self-center flex content-between justify-between md:content-none md:justify-normal md:space-x-[30px]"}>

                {/*button*/}
                <div className={"flex space-x-[20px]"}>
                    <div
                        className={"transition duration-500 ease-in-out hover:bg-violet transform hover:-translate-y-1 hover:scale-110  rounded-[5px] w-auto md:w-[120px] text-center font-bold md:text-[20px] bg-btnbg "}>
                        <Link href={routes.home}> ACCUEIL</Link>
                    </div>

                    <div
                        className={" transition duration-500 ease-in-out hover:bg-violet transform hover:-translate-y-1 hover:scale-110  rounded-[5px]  w-auto md:w-[150px] text-center font-bold md:text-[20px] "}>
                        <Link href={routes.productCat}>NOS SERVICES </Link>
                    </div>

                    <div
                        className={" transition duration-500 ease-in-out hover:bg-violet transform hover:-translate-y-1 hover:scale-110 rounded-[5px]  w-auto md:w-[120px] text-center font-bold md:text-[20px] "}>
                        <Link href={routes.about}> A PROPOS </Link>
                    </div>

                </div>
                {/*iconslink*/}
                <div className={" iconsHeader "}>
                    {
                        iconsLink.map((icons, index) => {
                            return <div key={index} className={""}>
                                <Link data-tooltip-id={icons.name} href={icons.href}>
                                    {icons.icon}

                                </Link>
                                <ReactTooltip
                                    id={icons.name}
                                    place="bottom"
                                    content={icons.name}
                                    className='bg-textbg text-sm font-bold'
                                />
                            </div>
                        })
                    }

                    <div>
                        {
                            isAuth ? <Link data-tooltip-id='compte' href={routes.profil}>

                                <HiMiniUserCircle className='h-[35px] w-[35px]'/>

                            </Link> : <Link data-tooltip-id='compte' href={routes.login} className={"md:text-[20px]  text-btnbg font-bold"}>

                                Connexion

                            </Link>
                        }


                        <ReactTooltip
                            id='compte'
                            place="bottom"
                            content='compte'
                            className='bg-textbg text-sm font-bold'
                        />
                    </div>
                </div>

                <div className={"ml-[20px] md:w-auto md:ml-[0px]"}>{/*button*/} <Link href={routes.devis}
                                                                                      className={"md:text-[20px]  text-btnbg font-bold"}> DEVIS </Link>
                </div>
            </div>
        </header>
    );
}
export default Header