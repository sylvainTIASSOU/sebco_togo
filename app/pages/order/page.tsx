'use client'
import {Button, Field} from "@/components";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useEffect, useState} from "react";
import CartModel from "@/models/CartModel";
import {OrderModel} from "@/models/OrderModel";
import {Api} from "@/api/Api";
import {OrderItem} from "@/models/OrderItems";
import {useRouter} from "next/navigation";
import CustomerModel from "@/models/CustomerModel";
import {routes} from "@/recources";


export default function Order() {
    const customerId = useSelector((state: RootState) => state.authReducer.value.uid);
    const item: CartModel[] = useSelector((state: RootState) => state.cartSlice);
    const [totalPrice, setTotalPrice] = useState(0)
    const router = useRouter()
    const [customer, setCustomer] = useState<CustomerModel>()

    useEffect(() => {
        Api.all(`customer/single/${customerId}`).then((cust: any) => {
            setCustomer(cust)
        })
        setTotalPrice(item.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));
    }, []);

    const formik = useFormik({
        initialValues: {
            city: "",
            quarter: "",
            date: "",
            time: "",
            code: "",
            place: "",
            indiqueNumber: "",
            indiqueName: "",
        },
        validationSchema: Yup.object({
            city: Yup.string().required("la ville est obligatoire"),
            quarter: Yup.string().required(" le quartier  est obligatoire"),
            date: Yup.string().required("la date est obligatoire"),
            time: Yup.string().notRequired(),
            code: Yup.string().notRequired(),
            place: Yup.string().notRequired(),
            indiqueName: Yup.string().required("le nom est obligatoire"),
            indiqueNumber: Yup.number().positive("le numéro ne peut pas être négatif").min(9, 'Entrer un numéro valide').integer("Le numéro doit est des chiffres").required("le numéro est obligatoire"),

        }),

        onSubmit:  async (values) => {
            const orderModel = new OrderModel("pass", Number(customerId), 12, totalPrice, values.city, values.quarter, values.date, values.indiqueName, Number(values.indiqueNumber), values.time, "utility", 'alt', 'long', values.code);


            const respOrder = await Api.post(orderModel, 'order/add');

         if(respOrder.ok) {
                const orderId: {id: number} = await respOrder.json()

                item.forEach((items) => {
                    const orderItem = new OrderItem(items.quantity, Number(items.id), Number(orderId.id));
                    Api.post(orderItem, 'order-item/add');
                })
             router.push(routes.congratulation);
           /*  const publicKey = process.env.FEDAPAY_PUBLIC_KEY;
             const am = totalPrice;
             const descr = `payement de la commande `;
             const last = customer?.lastName;
             const first = customer?.firstName;
             const em = customer?.email;
             router.push(`/paement.html?publicKey=${publicKey}&am=${am}&last=${last}&first=${first}&em=${em}`)*/
            }
        }
    })

    const crypto = require('crypto');

// Chiffrement
    function encryptText(text:string, key:string) {
        const cipher = crypto.createCipher('aes-256-cbc', key);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

// Déchiffrement
    function decryptText(encrypted:any, key:string) {
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    const textToEncrypt = "Hello, World!";
    const encryptionKey = "secretkey123";

    const encryptedText = encryptText(textToEncrypt, encryptionKey);
    console.log("Texte chiffré : " + encryptedText);

    const decryptedText = decryptText(encryptedText, encryptionKey);
    console.log("Texte déchiffré : " + decryptedText);

    return (
        <main className=" flex items-center justify-center w-full md:p-20 p-5">

            <div
                className={" w-full md:w-[850px] bg-bgopacity  shadow-2xl md:p-5 p-3  rounded-xl "}>
                <h1 className={"md:text-[30px] text-[25px] font-bold text-center"}>Passer la commande</h1>
                <div className={"w-full bg-vert/[50%] p-3 my-10 text-center font-bold  rounded-xl "}>
                    les champs précédé de * sont obligatoires
                </div>
                {/*form*/}
                <div className={""}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={"flex flex-col space-y-5"}>
                            {/*form1*/}
                            <div
                                className={"flex flex-col space-y-5 md:space-y-0 md:content-between md:justify-between md:flex-row"}>
                                <div className={"flex flex-col space-y-3"}>
                                    <label className={`${formik.touched && formik.errors.city && 'text-accent'}`}>
                                        {formik.touched && formik.errors.city ? formik.errors.city : 'Ville'} <span
                                        className={"text-accent"}>*</span>
                                    </label>

                                    <Field type={"text"}
                                           placeholder={"Entrer la ville"}
                                           name={"city"}
                                           style={"w-full"}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.city}
                                    />
                                </div>

                                <div className={"flex flex-col space-y-3"}>
                                    <label className={`${formik.touched && formik.errors.quarter && 'text-accent'}`}>
                                        {formik.touched && formik.errors.quarter ? formik.errors.quarter : 'Quartier'}
                                        <span className={"text-accent"}>*</span>
                                    </label>

                                    <Field type={"text"}
                                           name={"quarter"}
                                           placeholder={"Enter votre quartier"}
                                           style={"w-full"}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.quarter}
                                    />
                                </div>
                            </div>

                            {/*form 2*/}
                            <div
                                className={"flex flex-col space-y-5 md:space-y-0 md:content-between md:justify-between md:flex-row"}>
                                <div className={"flex flex-col space-y-3"}>
                                    <label className={`${formik.touched && formik.errors.date && 'text-accent'}`}>
                                        {formik.touched && formik.errors.date ? formik.errors.date : 'Date de livraison'}
                                        <span className={"text-accent"}>*</span>
                                    </label>

                                    <Field type={"date"}
                                           name={"date"}
                                           placeholder={"Entrer la date de livraison"}
                                           style={"md:w-[330px]"}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.date}
                                    />
                                </div>

                                <div className={"flex flex-col space-y-3"}>
                                    <label className={"date"}>
                                        Heure de livraison souhaité
                                    </label>

                                    <Field type={"time"}
                                           name={"time"}
                                           placeholder={"Entrer l'heure de la livraison"}
                                           style={"md:w-[330px]"}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.time}/>

                                </div>
                            </div>

                            {/*form 3*/}
                            <div
                                className={"flex flex-col space-y-5 md:space-y-0 md:content-between md:justify-between md:flex-row"}>
                                <div className={"flex flex-col space-y-3"}>
                                    <label className={""}>
                                        Code promo
                                    </label>

                                    <Field type={"text"}
                                           name={"code"}
                                           placeholder={"votre code promo"}
                                           style={"w-full"}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.code}
                                    />
                                </div>

                                <div className={"flex flex-col space-y-3"}>
                                    <label className={""}>
                                        Lieu de livraison
                                    </label>

                                    <Field type={"text"}
                                           name={"place"}
                                           placeholder={""}
                                           style={"w-full"}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.place}
                                    />

                                </div>
                            </div>

                            {/*form 4*/}
                            <div
                                className={"flex flex-col space-y-5 md:space-y-0 md:content-between md:justify-between md:flex-row"}>
                                <div className={"flex flex-col space-y-3"}>
                                    <label
                                        className={`${formik.touched && formik.errors.indiqueName && 'text-accent'}`}>
                                        {formik.touched && formik.errors.indiqueName ? formik.errors.indiqueName : "Nom de l'indique"}
                                        <span className={"text-accent"}>*</span>
                                    </label>

                                    <Field type={"text"}
                                           name={"indiqueName"}
                                           placeholder={"Entre le nom de l'indique"}
                                           style={"w-full"}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.indiqueName}
                                    />
                                </div>

                                <div className={"flex flex-col space-y-3"}>
                                    <label
                                        className={`${formik.touched && formik.errors.indiqueNumber && 'text-accent'}`}>
                                        {formik.touched && formik.errors.indiqueNumber ? formik.errors.indiqueNumber : "Numéro de l'indique"}
                                        <span className={"text-accent"}>*</span>
                                    </label>

                                    <Field type={"tel"}
                                           name={"indiqueNumber"}
                                           placeholder={"Entrer le nom de l'indique"}
                                           style={"w-full"}
                                           maxLength={8}
                                           pattern={'[0-9]{8}'}
                                           actionOnchange={formik.handleChange}
                                           value={formik.values.indiqueNumber}
                                    />
                                </div>
                            </div>

                            {/*button*/}
                            <div className={"self-center w-auto my-5"}>
                                <Button title={"Passer a la Caisse"}
                                        type={'submit'}
                                        style={"bg-violet text-white py-2 my-10 text-[25px]"}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </main>
    )
}