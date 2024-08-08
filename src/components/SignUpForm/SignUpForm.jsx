import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { emailRegexp } from 'constants';
import { signUp } from '../../redux/users/usersOperations';

import styles from './SignUpForm.module.scss';
import { useNavigate } from 'react-router-dom';
const {
    signupForm,
    signupFormLabelsWrapper,
    signupFormLabel,
    signupFormTitle,
    signupFormInput,
    signupFormInputError,
    signupFormError,
    visibilityBtn,
    visibilityBtnIcon,
    signupFormSubmit,
    disabled,
} = styles;

const userSchema = yup.object({
    name: yup.string().required(),
    email: yup
        .string()
        .matches(emailRegexp, 'Email is not in correct format')
        .required(),
    password: yup.string().min(6).required(),
    teacherId: yup.string().required(),
});

export function SignUpForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        teacherId: '',
    };

    async function handleSubmit(person, { resetForm }) {
        Notify.info(`Form submitted`);

        try {
            await dispatch(signUp(person));
            navigate('/login', { replace: true });
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
                let isNameError = false;
                let isEmailError = false;
                let isPasswordError = false;
                let isTeacherIdError = false;

                Object.keys(errors).forEach(errorName => {
                    Object.keys(touched).forEach(touch => {
                        if (errorName === 'name' && touch === 'name') {
                            isNameError = true;
                        }

                        if (errorName === 'email' && touch === 'email') {
                            isEmailError = true;
                        }

                        if (errorName === 'password' && touch === 'password') {
                            isPasswordError = true;
                        }

                        if (
                            errorName === 'teacherId' &&
                            touch === 'teacherId'
                        ) {
                            isTeacherIdError = true;
                        }
                    });
                });

                return (
                    <Form className={signupForm}>
                        <div className={signupFormLabelsWrapper}>
                            <label className={signupFormLabel}>
                                <span className={signupFormTitle}>* Name:</span>
                                <Field
                                    className={
                                        isNameError
                                            ? `${signupFormInput} ${signupFormInputError}`
                                            : signupFormInput
                                    }
                                    type="text"
                                    name="name"
                                    placeholder="Джон Роузі"
                                />
                                <ErrorMessage
                                    className={signupFormError}
                                    component="p"
                                    name="name"
                                />
                            </label>
                            <label className={signupFormLabel}>
                                <span className={signupFormTitle}>
                                    * E-mail:
                                </span>
                                <Field
                                    className={
                                        isEmailError
                                            ? `${signupFormInput} ${signupFormInputError}`
                                            : signupFormInput
                                    }
                                    type="email"
                                    name="email"
                                    placeholder="johnrosie@gmail.com"
                                />
                                <ErrorMessage
                                    className={signupFormError}
                                    component="p"
                                    name="email"
                                />
                            </label>
                            <label className={signupFormLabel}>
                                <span className={signupFormTitle}>
                                    * Password:
                                </span>
                                <Field
                                    className={
                                        isPasswordError
                                            ? `${signupFormInput} ${signupFormInputError}`
                                            : signupFormInput
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
                                    className={signupFormError}
                                    component="p"
                                    name="password"
                                />
                            </label>
                            <label className={signupFormLabel}>
                                <span className={signupFormTitle}>
                                    * Teacher Id:
                                </span>
                                <Field
                                    className={
                                        isTeacherIdError
                                            ? `${signupFormInput} ${signupFormInputError}`
                                            : signupFormInput
                                    }
                                    type="password"
                                    name="teacherId"
                                />
                                <ErrorMessage
                                    className={signupFormError}
                                    component="p"
                                    name="teacherId"
                                />
                            </label>
                        </div>
                        <button
                            className={
                                isError
                                    ? `${signupFormSubmit} ${disabled}`
                                    : signupFormSubmit
                            }
                            type="submit"
                            disabled={isError}
                        >
                            <span>Sign Up</span>
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}
