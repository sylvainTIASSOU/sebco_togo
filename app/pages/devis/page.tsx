'use client'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useRouter} from "next/navigation";
import { DevisModel } from '@/models/DevisModel';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Api} from "@/api/Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Devis() {
    const route = useRouter();
    const customerId = useSelector((state: RootState) => state.authReducer.value.uid);
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);


    const notify = () => toast.success('Devis envoyer avec succès', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            postal: '',
            ville: '',
            societe: '',
            demande: ''
        },

        validationSchema: Yup.object({
            name: Yup.string().required('le nom est obligatoire'),
            lastName: Yup.string().required('le prénom est obligatoire'),
            email: Yup.string().email('email invalide').required('l email est obligatoire'),
            phone: Yup.number().required('le numéro  est obligatoire'),
            address: Yup.string().required('l addresse est obligatoire'),
            postal: Yup.string().required('l addresse postal est obligatoire'),
            ville: Yup.string().required('la ville est obligatoire'),
            societe: Yup.string().notRequired(),
            demande: Yup.string().notRequired(),

        }),

        onSubmit: async (values) => {
             if(isAuth) {
                  const devisModel = new DevisModel(values.name, values.lastName, values.email, Number(values.phone), values.address, values.postal, values.ville, values.societe, values.demande, Number(customerId));
                  const resp = await Api.post(devisModel, 'devise/add');

                  if(resp.ok) {
                      notify();
                      route.push('/');
                  }
            }
        }
    })

    return (
        <main className="">

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
            <div className='  bg-cover bg-center bg-no-repeat py-3 px-3 md:pl-8'>
                <h1 className='text-[25px] font-bold my-5  '>DEMANDE DE DEVIS</h1>

                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col space-y-8'>
                            {/** information personnel  */}
                            <div className='flex flex-row space-x-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="nom"
                                           className='text-accent'> {formik.touched.name && formik.errors.name ? formik.errors.name : ''} </label>
                                    <input type="text" name='name' placeholder='Nom*'
                                           className='border border-b-5 w-[150px] md:w-[300px] border-t-0 border-x-0 border-b-textbg  bg-transparent '
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="nom"
                                           className='text-accent'>{formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}</label>
                                    <input type="text" name='lastName' placeholder='Prénom*'
                                           className='border border-b-5 border-t-0 w-[150px] md:w-[300px] border-x-0 border-b-textbg  bg-transparent '
                                    />
                                </div>

                            </div>

                            {/** adress  */}
                            <div className='flex flex-row space-x-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="nom"
                                           className='text-accent'>{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</label>
                                    <input type="eamil" name='email' placeholder='Addresse Email*'
                                           className='border border-b-5 w-[150px] md:w-[300px] border-t-0 border-x-0 border-b-textbg  bg-transparent '
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="nom"
                                           className='text-accent'>{formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}</label>
                                    <input type="tel" name='phone' placeholder='Téléphone*'
                                           className='border border-b-5 border-t-0 w-[150px] md:w-[300px] border-x-0 border-b-textbg  bg-transparent '
                                    />
                                </div>

                            </div>
                            {/** adresse  */}
                            <div className='flex flex-col'>
                                <label htmlFor="nom"
                                       className='text-accent'> {formik.touched.address && formik.errors.address ? formik.errors.address : ''}</label>
                                <input type="text" name='address' placeholder='Addresse*'
                                       className='border border-b-5 border-t-0 w-[300px] md:w-[605px] border-x-0 border-b-textbg  bg-transparent '
                                />
                            </div>


                            {/** adress  */}
                            <div className='flex flex-row space-x-3'>
                                <div className='flex flex-col'>
                                    <label htmlFor="nom"
                                           className='text-accent'>{formik.touched.postal && formik.errors.postal ? formik.errors.postal : ''}</label>
                                    <input type="text" name='postal' placeholder='Code Postal*'
                                           className='border border-b-5 w-[150px] md:w-[300px] border-t-0 border-x-0 border-b-textbg  bg-transparent '
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="nom"
                                           className='text-accent'>{formik.touched.ville && formik.errors.ville ? formik.errors.ville : ''}</label>
                                    <input type="tel" name='ville' placeholder='Ville*'
                                           className='border border-b-5 border-t-0 w-[150px] md:w-[300px] border-x-0 border-b-textbg  bg-transparent '
                                    />
                                </div>

                            </div>

                            {/** societé  */}
                            <div className='flex flex-col'>
                                <label htmlFor="nom"></label>
                                <input type="text" name='societe' placeholder='Société'
                                       className='border border-b-5 border-t-0 w-[300px] md:w-[605px] border-x-0 border-b-textbg  bg-transparent '
                                />
                            </div>

                            <div>
              <textarea id="" cols={60} rows={3} name='demande'
                        className='border border-5  w-[300px] md:w-[605px]  border-textbg  bg-transparent '
              >Demande</textarea>
                            </div>

                            <button type="submit" className='text-[25px] w-[300px] font-bold bg-btnbg p-2 '>
                                ENVOYER
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </main>
    )
}