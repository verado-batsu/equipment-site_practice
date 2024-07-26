import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { emailRegexp } from 'constants';

import styles from './SignUpForm.module.scss';
const {
    signupForm,
    signupFormLabelsWrapper,
    signupFormLabel,
    signupFormTitle,
    signupFormInput,
    signupFormInputError,
    signupFormError,
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
    const initialValues = {
        name: '',
        email: '',
        password: '',
        teacherId: '',
    };

    function handleSubmit(person, { resetForm }) {
        Notify.success(`Form submitted`);
        resetForm();
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
                                    type="text"
                                    name="password"
                                />
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
                                    type="text"
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
