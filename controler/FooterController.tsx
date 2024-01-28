
import {useFormik} from "formik";
import * as Yup from 'yup'


   export function  formik() {
    const formiks =  useFormik({
        initialValues: {
            name: "",
            email: "",
            content: ""
        },

        validationSchema: Yup.object({
            name: Yup.string().required('le nom est obligatoire'),
            email: Yup.string().email('Email invalide').required('L\'email est obligatoire'),
            content: Yup.string().required('le message est obligatoire')
        }),

        onSubmit: (values) => {
            console.log(values);
        },
    });

    return formiks;

}