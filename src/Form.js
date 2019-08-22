import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = ({errors, touched, values})=> {
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [])

    return (
        <div>
            <Form className = "form-component">
                {touched.name && errors.name}
                <Field component = "input" type = "text" name = "name" placeholder = "name"/>
                {touched.name && errors.name}
                <Field component = "input" type = "text" name = "name" placeholder = "name"/>
                {touched.name && errors.name}
                <Field component = "input" type = "text" name = "name" placeholder = "name"/>
                <label>
                    <Field type="checkbox" name="tos" checked={values.tos} />
                    Accept TOS
                </label>
                <label>
                    <Field type="checkbox" name="spam" checked={values.tos} />
                    Accept TOS
                </label>
                <button>Submit</button>
            </Form>
        </div>
    )
};


const FormikLoginForm = withFormik({
    mapPropsToValues({name, email, password, tos, spam}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
            spam: spam || true,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name Required."),
        email: Yup.string().required("We require an email for confirmation."),
        password: Yup.string().min(4).required("Password Required"),
        tos: Yup.boolean().oneOf([true], "Please Accept Our Terms and Conditions")
    }),

    handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}) {
        axios
            .post("https://reqres.in/api/users", values)
            .then (res => {
                setSubmitting(false);
                let user = res.data.name;
                let email = res.data.email;
                setStatus({name: user, email: email});
                resetForm();
            })
    }
})(LoginForm);

export default FormikLoginForm
