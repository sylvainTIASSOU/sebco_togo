'use client'
import { FaSearch } from "react-icons/fa";
import React, {Fragment, useEffect, useState} from 'react'
import {Api} from "@/api/Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrSubtractCircle } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa6";
import { BiPlusCircle } from "react-icons/bi";
import { Dialog, Transition } from '@headlessui/react'
import {useRouter} from "next/navigation";
import {addProduct} from "@/redux/features/cart-slice";
import {useDispatch} from "react-redux";
import CartModel from "@/models/CartModel";
import {routes} from "@/recources";
import {ImageComp} from "@/components";

type model = {
    image: string;
    product_name: string;
    id: number;
    price: string;
    priceStock: string;
    name: string;
    priceUnit: number;
};
type modelCat = {
    id: number,
    image: string,
    name: string,
}


export default function Product({ params }: { params: { id: string } }) {
    const [material, setMaterial] = useState<model[]>([])
    const [materialFiltered, setMaterialFiltered] = useState<model[]>([])
    const [categories, setCategories] = useState<modelCat[]>([]);
    const [id, setId] = useState("");
    let [isOpen, setIsOpen] = useState(false);
    const [qteUnite, setQteUnit] = useState(0);
    const [qteTonne, setQteTonne] = useState(0);
    const [materialSingle, setMaterialSingle] = useState<model>()
    const [catId] = useState(params.id);
    const router = useRouter();
    const dispatch = useDispatch();
    const [isFilt, setIsFilt] = useState(false);




    useEffect(() => {
        Api.all(`category/single/${catId}`).then((cat: any) => {
            Api.all(`product/getProduct/${cat.name}`).then((mat: any) => {
                setMaterial(mat);

            });

            Api.all('category/getCategoryMaterials').then((cat) => {
                setCategories(cat);
            });

            if(id != "") {
                Api.all(`product/single/${id}`).then((mat: any) => {
                    setMaterialSingle(mat)

                });
            }

        })

    }, []);


    {/*fontion of notify*/}


    {/*function to close dialog*/}
    function closeModal() {
        setIsOpen(false)
    }

    {/*fontion to open dialog*/}
    function openModal() {
        setIsOpen(true)
    }

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

    //funtion to filte result
    const filter = (input: any) => {
        let filtered = material.filter((items) => {
            let name = items.product_name.toLowerCase();
            let term = input.toLowerCase();
            return name.indexOf(term) > -1
        })
        setMaterialFiltered(filtered);
    }


    if(material.length == 0) {
        return (
            <div className={"flex items-center justify-center w-full"}>
                <ImageComp src={"/svg/Empty-cuate.svg"} width={600} height={600} styles={"self-center"}/>
            </div>
        )
    }

    return (

        <main className="p-10 md:py-20">

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

            {/*seach form*/}
            <div className={" self-center md:self-auto md:absolute md:right-5"}>
                <form>
                    <div className={"flex space-x-3 "}>
                        <label className={"hidden md:block md:text-[25px]"}>Trouver un produit</label>
                        <div className={"flex pl-3 h-[40px] rounded rounded-10 pt-2 bg-transparent outline outline-4 outline-btnbg "}>
                          <span className={"mt-1"}>
                                <FaSearch className={"w-[25px] h-[25px]"}/>
                            </span>
                            <input type={"tel"}
                                   name={"product"}
                                   placeholder={"Entrer le nim du produit"}
                                   className={" outline outline-none text-[18px]  pl-3  bg-transparent"}
                                   onChange={(e) => {
                                       setIsFilt(e.target.value.length > 0)
                                       filter(e.target.value)
                                   }}
                        />

                        </div>

                    </div>
                </form>
            </div>

            {/*second*/}
            <div className={" mt-10 flex flex-col space-y-5 md:flex-row md:space-y-0 md:mt-32 md:content-between md:justify-between "}>
                <div className={"md:w-[300px]"}>
                    <ul className={"text-[30px] font-bold text-bluelight"}>
                        {
                            categories.map((cate, index) => {
                                return <li key={index}
                                           className={ cate.id.toString() == catId ? ` cursor-pointer text-violet` : ` cursor-pointer`}
                                           onClick={() => {
                                               router.push(`${routes.products}/${cate.id}`)
                                           }}
                                >
                                    {cate.name}
                                </li>
                            })
                        }
                    </ul>
                </div>

                {/*card*/}
                <div className={"w-full flex flex-col space-y-5 mt-3  md:grid md:grid-cols-3 md:gap-1"}>
                    {
                        isFilt ?
                            materialFiltered.map((mate, index) => {
                                return <div key={index} className={" flex flex-col space-y-4 bg-bgopacity rounded-lg mx-3 pb-2 md:w-[350px] md:h-auto "}>
                                    <div className={""}>
                                        <ImageComp src={mate.image} width={250} height={300} styles={" w-full h-[200px]"}/>
                                    </div>

                                    {/*info*/}
                                    <div className={"self-center"}>
                                        <h1 className={"text-center font-bold  text-[40px]"}>{mate.product_name}</h1>
                                        <h1 className={"text-center  text-[25px]"}>prix par unité: <span
                                            className={"text-bluelight font-bold"}>{mate.price} TTC</span></h1>
                                        <h1 className={"text-center  text-[25px]"}>prix par tonne: <span
                                            className={"text-violet font-bold"}>{mate.priceStock} TTC</span></h1>
                                    </div>

                                    {/*button*/}
                                    <div className={""}>
                                        <button
                                            type={"button"}
                                            className={"w-full relative bottom-0 h-[50px] bg-btnbg text-[20px] font-bold"}
                                            onClick={() => {
                                                setId(String(mate.id));

                                                Api.all(`product/single/${mate.id}`).then((mat: any) => {
                                                    setMaterialSingle(mat)
                                                    console.log(mat)
                                                    openModal()
                                                });

                                            }}
                                        >
                                            Ajouter au panier
                                        </button>
                                    </div>

                                </div>
                            })
                            :
                            material.map((mate, index) => {
                                return <div key={index} className={" flex flex-col space-y-4 bg-bgopacity rounded-lg mx-3 pb-2 md:w-[350px] md:h-auto "}>
                                    <div className={""}>
                                        <ImageComp src={mate.image} width={250} height={300} styles={" w-full h-[200px]"}/>
                                    </div>

                                    {/*info*/}
                                    <div className={"self-center"}>
                                        <h1 className={"text-center font-bold  text-[40px]"}>{mate.product_name}</h1>
                                        <h1 className={"text-center  text-[25px]"}>prix par unité: <span
                                            className={"text-bluelight font-bold"}>{mate.price} TTC</span></h1>
                                        <h1 className={"text-center  text-[25px]"}>prix par tonne: <span
                                            className={"text-violet font-bold"}>{mate.priceStock} TTC</span></h1>
                                    </div>

                                    {/*button*/}
                                    <div className={""}>
                                        <button
                                            type={"button"}
                                            className={"w-full relative bottom-0 h-[50px] bg-btnbg text-[20px] font-bold"}
                                            onClick={() => {
                                                setId(String(mate.id));

                                                Api.all(`product/single/${mate.id}`).then((mat: any) => {
                                                    setMaterialSingle(mat)
                                                    openModal()
                                                });

                                            }}
                                        >
                                            Ajouter au panier
                                        </button>
                                    </div>

                                </div>
                            })
                    }
                    </div>
                </div>
        {
            id != "" && <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className=" w-full  max-w-screen-md  rounded-2xl bg-white p-3  shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="md:text-[30px] font-bold leading-6 text-gray-900"
                                    >
                                        Ajoutez le produit a votre panier
                                    </Dialog.Title>

                                    <div className="mt-2 flex flex-col md:flex-row">
                                        {/*image*/}
                                        <div className={"w-full self-center mt-2"}>
                                            {
                                                materialSingle?.image != "undefined" &&  <ImageComp src={String(materialSingle?.image)} width={300} height={300} />
                                            }

                                        </div>

                                        {/**content*/}
                                        <div className={"w-full flex flex-col space-y-5 "}>
                                            {/*titre*/}
                                            <div className={"self-start"}>
                                                <h1 className={"self-start text-gray-900  text-[30px]"}>{materialSingle?.name}</h1>
                                                <h3 className={"self-start text-gray-500"}>
                                                    descripation
                                                </h3>
                                            </div>

                                            <div className={"w-auto self-start flex flex-col space-y-5"}>
                                                {/*Ajout par unité*/}
                                                <div className={" font-bold text-gray-900 flex space-x-10"}>
                                                    <div>Quantité par unité</div>
                                                    <div className={"text-gray-900 flex space-x-6 text-[25px]"}>
                                                        <button type={"button"}
                                                                onClick={() => {
                                                                    if (qteUnite >=1){
                                                                        setQteUnit(qteUnite - 1);
                                                                    }
                                                                    if(qteUnite < 0) {
                                                                        setQteUnit(0)
                                                                    }
                                                                }}
                                                        >
                                                            <GrSubtractCircle className={""}/>
                                                        </button>

                                                        <p className={"text-[20px] font-bold "}>{qteUnite}</p>

                                                        <button type={"button"}
                                                                onClick={() => {
                                                                    setQteUnit(qteUnite+1)
                                                                }}
                                                        >
                                                            <BiPlusCircle/>
                                                        </button>
                                                    </div>

                                                </div>

                                                {/*Ajout par tonne*/}
                                                <div className={"font-bold text-gray-900 flex space-x-10"}>
                                                    <h1>Quantité par tonne</h1>
                                                    <div className={"text-gray-900 flex space-x-6 text-[25px]"}>
                                                        <button type={"button"}
                                                                onClick={()=>{
                                                                    if (qteTonne >=1){
                                                                        setQteTonne(qteTonne - 1);
                                                                    }
                                                                    if(qteTonne < 0) {
                                                                        setQteTonne(0)
                                                                    }
                                                                }}
                                                        >
                                                            <GrSubtractCircle className={""}/>
                                                        </button>

                                                        <p className={"text-[20px] "}>{qteTonne}</p>

                                                        <button type={"button"}
                                                                onClick={() => {
                                                                    setQteTonne(qteTonne+1)
                                                                }}
                                                        >
                                                            <BiPlusCircle/>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>


                                            {/*bouton*/}
                                            <div className="self-start mt-4">
                                                <button
                                                    type="button"
                                                    className=" flex space-x-5 font-bold text-[20px] justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={ () => {

                                                        if(qteUnite >=1 && qteTonne>=1) {
                                                            setQteTonne(0);
                                                            setQteUnit(0);
                                                        }

                                                        if(qteUnite ==0 && qteTonne==0) {
                                                            setQteTonne(0);
                                                            setQteUnit(0);
                                                        }

                                                        //ajouter le produit au panier
                                                        if(qteUnite >=1 && qteTonne<1){
                                                            const cartModel = new CartModel(String(materialSingle?.id), String(materialSingle?.name), String(materialSingle?.image), Number(materialSingle?.priceUnit), Number(materialSingle?.priceUnit)*qteUnite, qteUnite)
                                                            dispatch(addProduct(cartModel))
                                                            setQteUnit(0)
                                                            closeModal()
                                                            notify();
                                                        }

                                                        if(qteTonne >=1 && qteUnite<1){
                                                            const cartModel = new CartModel(String(materialSingle?.id), String(materialSingle?.name), String(materialSingle?.image), Number(materialSingle?.priceStock), Number(materialSingle?.priceStock)*qteTonne, qteTonne)
                                                            dispatch(addProduct(cartModel))
                                                            setQteTonne(0)
                                                            closeModal()
                                                            notify();
                                                        }




                                                    }}
                                                >
                                                    <span className={"font-bold text-[20px]"}>  Ajouter</span>

                                                    <span className={"font-bold text-[20px]"}> <FaCartPlus/> </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        }

    </main>
    )
}