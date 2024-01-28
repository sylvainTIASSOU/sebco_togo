'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, ImageComp} from "@/components";
import { MdDelete } from "react-icons/md";
import {routes} from "@/recources";
import {useRouter} from "next/navigation";
import CartModel from "@/models/CartModel";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '@/redux/store';
import {removeProduct} from "@/redux/features/cart-slice";
import {useEffect, useState} from "react";


export default function Cart() {
   // const [cart, setCart] = useState<CartModel[]>([])
    const item: CartModel[] = useSelector((state: RootState) => state.cartSlice);
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);
    const dispatch = useDispatch();
    const router = useRouter();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(item.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));
    }, []);

    if(item.length == 0) {
        return(
            <div className={"flex items-center justify-center p-5 md:p-20"}>
                <div className={"w-auto"}>
                    <ImageComp src={"/svg/Empty-cuate.svg"} width={600} height={600} styles={"self-center"} />
                    <h1 className={"text-center text-[35px]"}> C'est un peu vide par ici!!</h1>
                </div>

            </div>
        )
    }

   // setCart(item)
    return (

        <main className="md:p-20 p-3">

            <h1 className={"md:text-[40px] text-xl"}>Votre Panier</h1>
            {/*tableau*/}
            <div className={"mt-5"}>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right">Prix unitaire (TTC)</TableCell>
                                <TableCell align="right">Quantité</TableCell>
                                <TableCell align="right">Prix total (TTC)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">

                                        <div className={"flex"}>
                                            <ImageComp src={row.image} width={200} height={200} />

                                            <div className={"flex flex-col space-y-5"}>
                                                <div className={"text-[25px] font-bold"}>{row.name}</div>
                                                <button
                                                    className={"text-accent text-[18px] font-bold flex space-x-3"}
                                                    onClick={() => {
                                                        dispatch(removeProduct(row.id))
                                                        setTotal(item.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));
                                                       router.refresh();
                                                    }}

                                                >
                                                    <h1>suprimer</h1>
                                                    <MdDelete className={"text-accent"}/>
                                                </button>
                                            </div>s
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.priceTotal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className={"mt-5 mb-[10px]   w-full flex flex-col-reverse space-y-5 md:flex-row md:space-y-0 md:content-between md:justify-between"}>
                {/*button*/}
                <div>
                    <Button title={"Passer la commande"}
                            type={"button"}
                            style={"bg-btnbg md:py-2 text-white font-bold md:text-[20px]"}
                            action={() => {
                               if(isAuth) {
                                    router.push(routes.order);
                                }
                                else {
                                    router.push(routes.login);
                                }

                            }}
                    />
                </div>

                {/*total*/}
                <div className={" text-[25px] md:text-[35px]"}>
                    TOTAL: <span className={"text-violet"}> {total} TTC</span>
                </div>
            </div>


        </main>
    )
}