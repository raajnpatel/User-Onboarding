import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = ({errors, touched, values, status})=> {
    const [user, setUser] = useState([]);

    useEffect(() => {
        if(status) {
            setUser([...user, status]);
        }
    }, [status]);

    return (
        <div className = "form-box">
            <Form className = "form-component">
                Please fill in all fields!
                <br/><br/><br/><br/>
                {touched.name && errors.name}
                <Field component = "input" type = "text" name = "name" placeholder = "Name"/>
                <br/><br/>
                {touched.password && errors.password}
                <Field component = "input" type = "text" name = "password" placeholder = "Password"/>
                <br/><br/>
                {touched.email && errors.email}
                <Field component = "input" type = "text" name = "email" placeholder = "Valid Email"/>
                <br/><br/>
                {touched.tos && errors.tos}
                <label>
                    <Field type="checkbox" name="tos" checked={values.tos} />
                    Accept TOS
                </label>
                <br/>
                <label>
                    <Field type="checkbox" name="spam" checked={values.spam} />
                    Mailing List
                </label>
            <br/>
                <button>Submit</button>
            </Form>
            {user.map(person => {
                return <p key={person.email}>{person.name}</p>;
            })}
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

    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
        if (values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already taken" });
        } else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {

                    setSubmitting(false);
                    let user = res.data.name;
                    let email = res.data.email;
                    setStatus({ name: user, email: email });
                    resetForm();
                })
                .catch(err => {
                    console.log(err);
                    setSubmitting(false);
                });
        }
    }
})(LoginForm);
export default FormikLoginForm;