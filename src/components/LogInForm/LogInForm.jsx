import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { emailRegexp } from 'constants';
import { logIn } from '../../redux/users/usersOperations';

import styles from './LogInForm.module.scss';
const {
    loginForm,
    loginFormLabelsWrapper,
    loginFormLabel,
    loginFormTitle,
    loginFormInput,
    loginFormInputError,
    loginFormError,
    visibilityBtn,
    visibilityBtnIcon,
    loginFormSubmit,
    disabled,
} = styles;

const userSchema = yup.object({
    email: yup
        .string()
        .matches(emailRegexp, 'Email is not in correct format')
        .required(),
    password: yup.string().min(6).required(),
});

export function LogInForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    async function handleSubmit(person, { resetForm }) {
        Notify.success(`Form submitted`);

        try {
            await dispatch(logIn(person));
            navigate('/equipments', { replace: true });
        } catch (error) {}

        resetForm();
    }

    function handleVisibilityBtn(e) {
        setShowPassword(prev => !prev);
    }

    return (
        <Formik
            autoComplete="off"
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ errors, touched }) => {
                const isError = Object.keys(errors).length !== 0;
                let isEmailError = false;
                let isPasswordError = false;

                Object.keys(errors).forEach(errorName => {
                    Object.keys(touched).forEach(touch => {
                        if (errorName === 'email' && touch === 'email') {
                            isEmailError = true;
                        }

                        if (errorName === 'password' && touch === 'password') {
                            isPasswordError = true;
                        }
                    });
                });

                return (
                    <Form className={loginForm}>
                        <div className={loginFormLabelsWrapper}>
                            <label className={loginFormLabel}>
                                <span className={loginFormTitle}>
                                    * E-mail:
                                </span>
                                <Field
                                    className={
                                        isEmailError
                                            ? `${loginFormInput} ${loginFormInputError}`
                                            : loginFormInput
                                    }
                                    type="email"
                                    name="email"
                                    placeholder="johnrosie@gmail.com"
                                />
                                <ErrorMessage
                                    className={loginFormError}
                                    component="p"
                                    name="email"
                                />
                            </label>
                            <label className={loginFormLabel}>
                                <span className={loginFormTitle}>
                                    * Password:
                                </span>
                                <Field
                                    className={
                                        isPasswordError
                                            ? `${loginFormInput} ${loginFormInputError}`
                                            : loginFormInput
                                    }
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                />
                                <button
                                    className={visibilityBtn}
                                    type="button"
                                    onClick={handleVisibilityBtn}
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon
                                            className={visibilityBtnIcon}
                                        />
                                    ) : (
                                        <VisibilityIcon
                                            className={visibilityBtnIcon}
                                        />
                                    )}
                                </button>
                                <ErrorMessage
                                    className={loginFormError}
                                    component="p"
                                    name="password"
                                />
                            </label>
                        </div>
                        <button
                            className={
                                isError
                                    ? `${loginFormSubmit} ${disabled}`
                                    : loginFormSubmit
                            }
                            type="submit"
                            disabled={isError}
                        >
                            <span>LogIn</span>
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}
