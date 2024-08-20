import { Field, Formik, Form, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';

import { arrOfCategories } from 'constants';

import styles from './CreateEquipmentForm.module.scss';
const {
    signupForm,
    signupFormLabelsWrapper,
    signupFormLabel,
    signupFormTitle,
    signupFormInput,
    signupFormSelect,
    signupFormInputError,
    signupFormError,
    signupFormSubmit,
    disabled,
} = styles;

const equipmentSchema = yup.object({
    category: yup.string().oneOf(arrOfCategories).required(),
    model: yup.string().required(),
    features: yup.array().of(yup.string()).required(),
    photos: yup.array().of(yup.string()).required(),
    describe: yup.string(),
});

export function CreateEquipmentForm() {
    const initialValues = {
        category: '',
        model: '',
        features: [],
        photos: [],
        describe: '',
    };

    async function handleSubmit(equipment, { resetForm }) {
        console.log(equipment);
        // Notify.info(`Form submitted`);

        try {
            // await dispatch(signUp(person));
            // navigate('/login', { replace: true });
        } catch (error) {}

        resetForm();
    }

    return (
        <Formik
            autoComplete="off"
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={equipmentSchema}
        >
            {({ errors, touched, values }) => {
                const isError = Object.keys(errors).length !== 0;
                let isModelError = false;
                let isFeaturesError = false;
                // let isPhotosError = false;

                Object.keys(errors).forEach(errorName => {
                    Object.keys(touched).forEach(touch => {
                        if (errorName === 'model' && touch === 'model') {
                            isModelError = true;
                        }

                        if (errorName === 'features' && touch === 'features') {
                            isFeaturesError = true;
                        }

                        // if (errorName === 'photos' && touch === 'photos') {
                        //     isPhotosError = true;
                        // }
                    });
                });

                return (
                    <Form className={signupForm}>
                        <div className={signupFormLabelsWrapper}>
                            <label className={signupFormLabel}>
                                <span className={signupFormTitle}>
                                    * Category:
                                </span>
                                <Field
                                    className={signupFormSelect}
                                    as="select"
                                    name="category"
                                >
                                    {arrOfCategories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    className={signupFormError}
                                    component="p"
                                    name="category"
                                />
                            </label>
                            <label className={signupFormLabel}>
                                <span className={signupFormTitle}>
                                    * Model:
                                </span>
                                <Field
                                    // className={signupFormInput}
                                    className={
                                        isModelError
                                            ? `${signupFormInput} ${signupFormInputError}`
                                            : signupFormInput
                                    }
                                    type="text"
                                    name="model"
                                    placeholder="C410"
                                />
                                <ErrorMessage
                                    className={signupFormError}
                                    component="p"
                                    name="model"
                                />
                            </label>
                            <FieldArray
                                name="features"
                                render={arrayHelpers => (
                                    <label className={signupFormLabel}>
                                        <span className={signupFormTitle}>
                                            * Features:
                                        </span>
                                        {values.features &&
                                        values.features.length > 0 ? (
                                            values.features.map(
                                                (feature, i) => (
                                                    <div key={i}>
                                                        <Field
                                                            className={
                                                                isFeaturesError
                                                                    ? `${signupFormInput} ${signupFormInputError}`
                                                                    : signupFormInput
                                                            }
                                                            type="text"
                                                            name={`features.${i}`}
                                                        />
                                                        <ErrorMessage
                                                            className={
                                                                signupFormError
                                                            }
                                                            component="p"
                                                            name={`features.${i}`}
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                arrayHelpers.pop()
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                arrayHelpers.push(
                                                                    ''
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.push('')
                                                }
                                            >
                                                Додати характеристику
                                            </button>
                                        )}
                                    </label>
                                )}
                            />

                            {/* <label className={signupFormLabel}>
                                <span className={signupFormTitle}>
                                    * Photos:
                                </span>
                                <Field
                                    className={signupFormInput}
                                    // className={
                                    //     isTeacherIdError
                                    //         ? `${signupFormInput} ${signupFormInputError}`
                                    //         : signupFormInput
                                    // }
                                    type="text"
                                    name="teacherId"
                                />
                                <ErrorMessage
                                    className={signupFormError}
                                    component="p"
                                    name="teacherId"
                                />
                            </label> */}
                            <label className={signupFormLabel}>
                                <span className={signupFormTitle}>
                                    Describe:
                                </span>
                                <Field
                                    className={signupFormInput}
                                    type="text"
                                    name="describe"
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
                            <span>Create</span>
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}
