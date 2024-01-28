'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Select, SelectChangeEvent} from '@mui/material';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Api} from "@/api/Api";
import {addProduct} from "@/redux/features/cart-slice";
import CartModel from "@/models/CartModel";
import {useDispatch} from "react-redux";


type dataType = {
    image: string,
    product_name: string,
    price10: string,
    price12: string,
    price20: string,
    price6: string,
    price14: string,
    price16: string,
    id: number,
}
export default function product() {
    useRouter();
    const [datasable, setdatasable] = useState<dataType[]>([])
    const [dataGravel, setDataGravel] = useState<dataType[]>([])
    const [dataBlank, setDataBlank] = useState<dataType[]>([])
    const dispatch = useDispatch();


    const [qte, setQte] = useState('');
    const [, setPrice] = useState(0);


    useEffect(() => {
        Api.all('product/getProduct/sable').then((value) => {
            setdatasable(value);

        });

        Api.all('product/getProduct/gravier').then((value) => {
            setDataGravel(value);
        });

        Api.all('product/getProduct/ramblai').then((value) => {
            setDataBlank(value);
        });
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setQte(event.target.value);
    };

    const notify = () => toast.success('Le produit est ajouté dans votre panier', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });


    return (
        <div className='p-3'>
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

            <h1 className='text-textbg text-[30px] font-bold '> NOS PRODUITS</h1>

            <hr className='bg-textbg w-[100px] h-[10px] '/>
            {/**sable */}
            <div className='mt-8  ' id="sand">
                <h1 className='text-[25px] font-bold '>Sables</h1>
                <div className='flex flex-col space-y-5 mt-3  md:grid md:grid-cols-3 md:gap-6 '>
                    {
                        datasable == null ? '' :
                            datasable?.length == 0 ?
                                <h1 className={"text-center"}>Produit non disponible pour l'instant</h1> :
                                datasable?.map((p) => {
                                    return <div
                                        className='flex flex-col space-y-4 bg-bgopacity rounded-lg mx-3 pb-2 md:w-[350px] md:h-auto '>

                                        <div>
                                            <img src={p.image} alt="" className='bg-cover bg-center w-full h-[200px] '/>
                                        </div>
                                        <div className='flex content-between justify-between px-4'>
                                            <h1 className='text-[20px] font-bold '> {p.product_name} </h1>

                                            {/**message icon
                                             <DialogMessage
                                             style=''
                                             id={p.id}
                                             />*/}
                                        </div>

                                        <div className='px-4'>
                                            <h1>prix par m3</h1>
                                            <h1>10m3(10 roue): {p.price10} TTC</h1>
                                            <h1>12m3(10 roue): {p.price12} TTC</h1>
                                            <h1>20m3(linotruck): {p.price20} TTC</h1>
                                        </div>

                                        <FormControl variant="standard" sx={{m: 1, minWidth: 150}}>
                                            <InputLabel className="text-white"
                                                        id="sand">Quantité</InputLabel>
                                            <Select
                                                labelId="sand"
                                                id="sand"
                                                value={qte}
                                                onChange={handleChange}
                                                label="Choisissez la quantité"
                                                className="text-white"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem className="text-black" value={6}>6 m3(6 roue)</MenuItem>
                                                <MenuItem className="text-black" value={10}>10 m3(10 roue)</MenuItem>
                                                <MenuItem className="text-black" value={14}>14 m3 (10 route)</MenuItem>
                                                <MenuItem className="text-black" value={18}>18 m3 (10 route)</MenuItem>
                                                <MenuItem className="text-black" value={20}>20 m3 (Linotruck)</MenuItem>
                                            </Select>
                                        </FormControl>


                                        <button type="button"
                                                className='bg-transparent text-textbg text-center text-[20px] font-bold '
                                                onClick={() => {

                                                    if (qte.toString() == '6') {
                                                        // @ts-ignore
                                                        setPrice(p.price6)
                                                        console.log(p.price6)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price6), Number(p.price6), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '10') {
                                                        // @ts-ignore
                                                        setPrice(p.price10)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price10), Number(p.price10), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        //addToPanier(donne);
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '12') {
                                                        // @ts-ignore
                                                        setPrice(p.price12)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price12), Number(p.price12), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '14') {
                                                        // @ts-ignore
                                                        setPrice(p.price14)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price14), Number(p.price14), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '16') {
                                                        // @ts-ignore
                                                        setPrice(p.price16)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price16), Number(p.price16), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '20') {
                                                        // @ts-ignore
                                                        setPrice(p.price20)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price20), Number(p.price20), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                }}
                                        >
                                            AJOUTER AU PANIER
                                        </button>


                                    </div>
                                })
                    }
                </div>
            </div>


            {/** gravel */}

            <div className='mt-8  ' id="gravel">
                <h1 className='text-[25px] font-bold '>Sables</h1>
                <div className='flex flex-col space-y-5 mt-3  md:grid md:grid-cols-3 md:gap-6 '>
                    {
                        dataGravel == null ? '' :
                            dataGravel?.length == 0 ?
                                <h1 className={"text-center"}>Produit non disponible pour l'instant</h1> :
                                dataGravel?.map((p) => {
                                    return <div
                                        className='flex flex-col space-y-4 bg-bgopacity rounded-lg mx-3 pb-2 md:w-[350px] md:h-auto '>

                                        <div>
                                            <img src={p.image} alt="" className='bg-cover bg-center w-full h-[200px] '/>
                                        </div>
                                        <div className='flex content-between justify-between px-4'>
                                            <h1 className='text-[20px] font-bold '> {p.product_name} </h1>

                                            {/**message icon
                                             <DialogMessage
                                             style=''
                                             id={p.id}
                                             />*/}
                                        </div>

                                        <div className='px-4'>
                                            <h1>prix par m3</h1>
                                            <h1>10m3(10 roue): {p.price10} TTC</h1>
                                            <h1>12m3(10 roue): {p.price12} TTC</h1>
                                            <h1>20m3(linotruck): {p.price20} TTC</h1>
                                        </div>

                                        <FormControl variant="standard" sx={{m: 1, minWidth: 150}}>
                                            <InputLabel className="text-white"
                                                        id="gravel">Quantité</InputLabel>
                                            <Select
                                                labelId="gravel"
                                                id="gravel"
                                                value={qte}
                                                onChange={handleChange}
                                                label=" Choisissez la quantité"
                                                className="text-white"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem className="text-black" value={6}>6 m3(6 roue)</MenuItem>
                                                <MenuItem className="text-black" value={10}>10 m3(10 roue)</MenuItem>
                                                <MenuItem className="text-black" value={14}>14 m3 (10 route)</MenuItem>
                                                <MenuItem className="text-black" value={16}>16 m3 (10 route)</MenuItem>
                                                <MenuItem className="text-black" value={20}>20 m3 (Linotruck)</MenuItem>
                                            </Select>
                                        </FormControl>


                                        <button type="button"
                                                className='bg-transparent text-textbg text-center text-[20px] font-bold '
                                                onClick={() => {

                                                    if (qte.toString() == '6') {
                                                        // @ts-ignore
                                                        setPrice(p.price6)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price6), Number(p.price6), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '10') {
                                                        // @ts-ignore
                                                        setPrice(p.price10)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price10), Number(p.price10), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '12') {
                                                        // @ts-ignore
                                                        setPrice(p.price12)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price12), Number(p.price12), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '14') {
                                                        // @ts-ignore
                                                        setPrice(p.price14)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price14), Number(p.price14), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '16') {
                                                        // @ts-ignore
                                                        setPrice(p.price16)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price16), Number(p.price16), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '20') {
                                                        // @ts-ignore
                                                        setPrice(p.price20)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price20), Number(p.price20), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }


                                                }}
                                        >
                                            AJOUTER AU PANIER
                                        </button>


                                    </div>
                                })

                    }
                </div>
            </div>


            {/** blank */}
            <div className='mt-8  ' id="blank">
                <h1 className='text-[25px] font-bold '>Sables</h1>
                <div className='flex flex-col space-y-5 mt-3  md:grid md:grid-cols-3 md:gap-6 '>
                    {
                        dataBlank == null ? '' :
                            dataBlank?.length == 0 ?
                                <h1 className={"text-center"}>Produit non disponible pour l'instant</h1> :
                                dataBlank?.map((p) => {
                                    return <div
                                        className='flex flex-col space-y-4 bg-bgopacity rounded-lg mx-3 pb-2 md:w-[350px] md:h-auto '>

                                        <div>
                                            <img src={p.image} alt="" className='bg-cover bg-center w-full h-[200px] '/>
                                        </div>
                                        <div className='flex content-between justify-between px-4'>
                                            <h1 className='text-[20px] font-bold '> {p.product_name} </h1>

                                            {/**message icon
                                             <DialogMessage
                                             style=''
                                             id={p.id}
                                             />*/}
                                        </div>

                                        <div className='px-4'>
                                            <h1>prix par m3</h1>
                                            <h1>10m3(10 roue): {p.price10} TTC</h1>
                                            <h1>12m3(10 roue): {p.price12} TTC</h1>
                                            <h1>20m3(linotruck): {p.price20} TTC</h1>
                                        </div>

                                        <FormControl variant="standard" sx={{m: 1, minWidth: 150}}>
                                            <InputLabel className="text-white"
                                                        id="blank">Quantité</InputLabel>
                                            <Select
                                                labelId="blank"
                                                id="blank"
                                                value={qte}
                                                onChange={handleChange}
                                                label="Choisissez la quantité"
                                                className="text-white"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem className="text-black" value={6}>6 m3(6 roue)</MenuItem>
                                                <MenuItem className="text-black" value={10}>10 m3(10 roue)</MenuItem>
                                                <MenuItem className="text-black" value={14}>14 m3 (10 route)</MenuItem>
                                                <MenuItem className="text-black" value={18}>18 m3 (10 route)</MenuItem>
                                                <MenuItem className="text-black" value={20}>20 m3 (Linotruck)</MenuItem>
                                            </Select>
                                        </FormControl>


                                        <button type="button"
                                                className='bg-transparent text-textbg text-center text-[20px] font-bold '
                                                onClick={() => {

                                                    if (qte.toString() == '6') {
                                                        // @ts-ignore
                                                        setPrice(p.price6)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price6), Number(p.price6), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '10') {
                                                        // @ts-ignore
                                                        setPrice(p.price10)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price10), Number(p.price10), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '12') {
                                                        // @ts-ignore
                                                        setPrice(p.price12)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price12), Number(p.price12), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '14') {
                                                        // @ts-ignore
                                                        setPrice(p.price14)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price14), Number(p.price14), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '16') {
                                                        // @ts-ignore
                                                        setPrice(p.price16)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price16), Number(p.price16), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }

                                                    if (qte.toString() == '20') {
                                                        // @ts-ignore
                                                        setPrice(p.price20)

                                                        const cartModel = new CartModel(p.id.toString(), p.product_name, p.image, Number(p.price20), Number(p.price20), Number(qte));
                                                        dispatch(addProduct(cartModel));
                                                        setQte('')
                                                        notify()
                                                    }
                                                }}
                                        >
                                            AJOUTER AU PANIER
                                        </button>


                                    </div>
                                })

                    }
                </div>
            </div>
        </div>
    )
}
