import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function LoginForm({touched, errors}) {
    const token = localStorage.getItem('token');

    if (token) {
        return <Redirect to='/profile' />;
    }

    return(
        <Form className='form'>
            <div className='form-group'>
                <label className='label'>UserName</label>
                <Field
                    className='input'
                    name='email'
                    type='email'
                    autocomplete='off'
                />
                <p>{touched.email && errors.email}</p>
            </div>
            <div className='form-group'>
                <label className='label'>Password</label>
                <Field
                    className='input'
                    name='password'
                    type='password'
                    autocomplete='off'
                />
                <p>{touched.password && errors.password}</p>
            </div>
            <button className='btn'>Submit &rarr;</button>
        </Form>
    );
}

export default withFormik({
    mapPropsToValues() {
        return {
            email: '',
            password: ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .min(8)
            .required()
    }),
    handleSubmit(values, formikBag) {
        console.log(formikBag.props)
        const url =
            'http://localhost:5000/api/login';
        axios
            .post(url, values)
            .then(response => {
                localStorage.setItem('token', response.data.payload);
                formikBag.props.history.push('/friends');
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }
})(LoginForm);