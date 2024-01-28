'use client'
import Image from "next/image";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FaPhone, FaEnvelope, FaLocationArrow} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Api} from "@/api/Api";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import CartModel from "@/models/CartModel";
import {useRouter} from "next/navigation";
import {removeProduct} from "@/redux/features/cart-slice";
import {routes} from "@/recources";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData2(
    name: string,
    quantity: string,
    price_unitaire:number,
    price_total: number
) {
    return {name, quantity, price_unitaire, price_total}
}
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}


const print = () => {
    const pages = document.getElementById('page');
    html2canvas(pages!)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = canvas.width;
            const pdfHeight = canvas.height;
            const pdf = new jsPDF("landscape", "px",  [pdfWidth, pdfHeight]);


            // @ts-ignore
            pdf.addImage(imgData, 'PNG', 0, 0 , pdfWidth, pdfHeight);
            pdf.save(`facture.pdf`);
        })
}
export default function Facture({ params }: { params: { id: string } }) {
    const [order, setOrder] = useState<any>();
    const [orderItem, setOrderItem] = useState<any[]>([]);
    const [customer, setCustomer] = useState<{ lastName: string, firstName: string }>();
    const user = useSelector((state: RootState) => state.authReducer.value.uid);
    const item: CartModel[] = useSelector((state: RootState) => state.cartSlice);
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);
    const idUser = useSelector((state: RootState) => state.authReducer.value.uid);
    const dispatch = useDispatch();
    const router = useRouter();
    const [total, setTotal] = useState(0);

    const orderId = params.id;
    useEffect(() => {
        if(isAuth)
        {

        setTotal(item.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));
            Api.all(`order/single/${orderId}`).then((val: any) => {

                setOrder(val)
            });

            Api.all(`order-item/getByOrder/${orderId}`).then((val: any) => {

                setOrderItem(val)
            })

            Api.all(`customer/single/${idUser}`).then((val: any) => {

                setCustomer(val)

            })
        }
    }, []);
    return (
        <main className="">
            <div className={"items-center justify-center p-10"}>

                <div id={'page'} className={'bg-bgblue flex flex-col space-y-3 m-20'}>
                    {/*En tete*/}
                    <div className={'flex content-between justify-between '}>
                        <div>
                            <Image src={'/ic_launcher.png'} alt={'logo'} width={150} height={150}
                                   className={'w-[150px] h-[150px] bg-cover bg-center'}/>
                        </div>

                        <h1 className={'mt-[50px]'}>Facture N 2023-orderId-SEBCO</h1>

                    </div>
                    <hr className={' text-red-900 h-2 w-full'}/>

                    {/* customer info*/}
                    <div className={'flex content-between justify-between '}>
                        <div className={'w-full bg-cyan-700 p-3 ml-3'}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>Nom</td>
                                    <td>: {customer?.firstName}</td>
                                </tr>

                                <tr>
                                    <td>Prénom</td>
                                    <td>: {customer?.lastName}</td>
                                </tr>

                                <tr>
                                    <td>Date</td>
                                    <td>: {order?.createAt}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={' bg-cyan-700 ml-3 w-full'}>
                            <table>
                                <tbody>

                                <tr>
                                    <td>Ville de livraison</td>
                                    <td>: {order?.city}</td>
                                </tr>

                                <tr>
                                    <td>Quartier de livraison</td>
                                    <td>: {order?.quarter}</td>
                                </tr>

                                <tr>
                                    <td>Nom de l'indique</td>
                                    <td>: {order?.indiqueName}</td>
                                </tr>

                                <tr>
                                    <td>Contact de l'indique</td>
                                    <td>:{order?.indiqueNumber}</td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr className={' text-red-900 h-2 w-full'}/>

                    {/*tableau*/}
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 700}} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Nom du produit</StyledTableCell>
                                        <StyledTableCell align="right">Quantité</StyledTableCell>
                                        <StyledTableCell align="right">Prix unitaire&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">prix total&nbsp;(g)</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.map((row, index) => (
                                         <StyledTableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.name}</StyledTableCell>
                                            <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                                            <StyledTableCell
                                                align="right">{Number(row.price) }</StyledTableCell>
                                            <StyledTableCell align="right">{row.priceTotal}</StyledTableCell>
                                        </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className={'mr-full mt-3'}>
                            <table>
                                <tbody>


                                <tr>
                                    <td>total TTC</td>
                                    <td>: {order?.price}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr className={' text-red-900 h-2 w-full'}/>

                    <div className={'flex content-between justify-between '}>
                        <div>
                            <img src={'/logofav.png'} className={' w-[100px] h-[100px]'}/>
                        </div>

                        <div className={'flex content-between justify-between mt-[4%] '}>
                            <div className={'flex space-x-2 ml-2'}>
                                <FaPhone className={'w-[20px] h-[20px]'}/>
                                <h1>Contact :</h1>
                                <h1>+22898853030</h1>
                            </div>

                            <div className={'flex space-x-2 ml-2'}>
                                <FaEnvelope className={'w-[20px] h-[20px]'}/>
                                <h1>Email :</h1>
                                <h1>sebcotogo@gmail.com</h1>
                            </div>

                            <div className={'flex space-x-2 ml-2'}>
                                <FaLocationArrow className={'w-[20px] h-[20px]'}/>
                                <h1>Localité :</h1>
                                <h1>Aképé</h1>
                            </div>
                        </div>


                    </div>


                </div>

                <div className={'ml-[40%]'}>
                    <button className={'p-2 bg-textbg w-auto'}
                            type={'button'}
                            onClick={() => {
                                print();

                                item.forEach((element) => {
                                   // console.log(element.id);
                                    dispatch(removeProduct(element.id))
                                })
                              router.push(routes.home);
                            }}
                    >
                        Télécharger la facture
                    </button>
                </div>
            </div>
        </main>
    )
}