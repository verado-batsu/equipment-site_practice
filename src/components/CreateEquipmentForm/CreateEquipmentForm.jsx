import { useState } from 'react';
import { Field, Formik, Form, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import RemoveIcon from '@mui/icons-material/Remove';

import { arrOfCategories } from 'constants';
import { capitalizeFirstLetter } from 'helpers';

import blank from '../../assets/images/createEquipmentPage/blank.png';

import styles from './CreateEquipmentForm.module.scss';
const {
    createForm,
    createFormLabelsWrapper,
    createFormLabel,
    createFormTitle,
    createFormInput,
    createFormSelect,
    createFormInputError,
    createFormError,
    removeFeatureBtn,
    removePhotoBtn,
    addFeatureBtnWrapper,
    addPhotoBtnWrapper,
    addFeatureBtn,
    addPhotoBtn,
    createFormSubmit,
    disabled,
} = styles;

const equipmentSchema = yup.object({
    category: yup.string().oneOf(arrOfCategories).required(),
    model: yup.string().required(),
    features: yup
        .array()
        .of(yup.string().required('features is a required field'))
        .required(),
    // photos: yup.array().of(yup.string().required()).required(),
    describe: yup.string(),
});

export function CreateEquipmentForm() {
    const [photos, setPhotos] = useState([]);
    console.log(photos[0]);

    const initialValues = {
        category: '',
        model: '',
        features: [''],
        // photos: [''],
        describe: '',
    };

    async function handleSubmit(equipment, { resetForm }) {
        console.log(equipment);
        // Notify.info(`Form submitted`);

        try {
            // await dispatch(create(person));
            // navigate('/login', { replace: true });
        } catch (error) {}

        resetForm();
    }

    function uploadImage(e) {
        const selectedFile = e.target.files[0];
        const indexOfSelectedFile = Number(e.target.name.split('.')[1]);

        setPhotos(
            photos.map((photo, i) => {
                return photo === '' || indexOfSelectedFile === i
                    ? selectedFile
                    : photo;
            })
        );
        // setImagePreview(imagePreviewURL);
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
                let isCategoryError = false;
                let isModelError = false;
                let isFeaturesError = false;
                let isPhotosError = false;

                Object.keys(errors).forEach(errorName => {
                    Object.keys(touched).forEach(touch => {
                        if (errorName === 'category' && touch === 'category') {
                            isCategoryError = true;
                        }

                        if (errorName === 'model' && touch === 'model') {
                            isModelError = true;
                        }

                        if (errorName === 'features' && touch === 'features') {
                            isFeaturesError = true;
                        }

                        if (errorName === 'photos' && touch === 'photos') {
                            isPhotosError = true;
                        }
                    });
                });

                return (
                    <Form className={createForm}>
                        <div className={createFormLabelsWrapper}>
                            <label className={createFormLabel}>
                                <span className={createFormTitle}>
                                    * Категорія:
                                </span>
                                <Field
                                    className={
                                        isCategoryError
                                            ? `${createFormSelect} ${createFormInputError}`
                                            : createFormSelect
                                    }
                                    as="select"
                                    name="category"
                                >
                                    <option value="" defaultValue>
                                        None
                                    </option>
                                    {arrOfCategories.map(category => (
                                        <option key={category} value={category}>
                                            {capitalizeFirstLetter(category)}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    className={createFormError}
                                    component="p"
                                    name="category"
                                />
                            </label>
                            <label className={createFormLabel}>
                                <span className={createFormTitle}>
                                    * Модель:
                                </span>
                                <Field
                                    className={
                                        isModelError
                                            ? `${createFormInput} ${createFormInputError}`
                                            : createFormInput
                                    }
                                    type="text"
                                    name="model"
                                    placeholder="C410"
                                />
                                <ErrorMessage
                                    className={createFormError}
                                    component="p"
                                    name="model"
                                />
                            </label>
                            <FieldArray
                                name="features"
                                render={arrayHelpers => (
                                    <label className={createFormLabel}>
                                        <span className={createFormTitle}>
                                            * Характеристики:
                                        </span>
                                        {values.features &&
                                            values.features.length > 0 &&
                                            values.features.map(
                                                (feature, i) => (
                                                    <div key={i}>
                                                        <Field
                                                            className={
                                                                isFeaturesError
                                                                    ? `${createFormInput} ${createFormInputError}`
                                                                    : createFormInput
                                                            }
                                                            type="text"
                                                            name={`features.${i}`}
                                                        />
                                                        <ErrorMessage
                                                            className={
                                                                createFormError
                                                            }
                                                            component="p"
                                                            name={`features.${i}`}
                                                        />

                                                        <button
                                                            className={
                                                                removeFeatureBtn
                                                            }
                                                            type="button"
                                                            onClick={() => {
                                                                arrayHelpers.remove(
                                                                    i
                                                                );
                                                            }}
                                                        >
                                                            <RemoveIcon />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        <div className={addFeatureBtnWrapper}>
                                            <button
                                                className={addFeatureBtn}
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.push('')
                                                }
                                            >
                                                Додати характеристику
                                            </button>
                                        </div>
                                    </label>
                                )}
                            />
                            <label className={createFormLabel}>
                                <span className={createFormTitle}>* Фото:</span>
                                {photos &&
                                    photos.length > 0 &&
                                    photos.map((photo, i) => {
                                        return (
                                            <div key={i}>
                                                <input
                                                    className={
                                                        isPhotosError
                                                            ? `${createFormInput} ${createFormInputError}`
                                                            : createFormInput
                                                    }
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={uploadImage}
                                                    name={`photos.${i}`}
                                                />
                                                {/* <ErrorMessage
														className={
															createFormError
														}
														component="p"
														name={`photos.${i}`}
													/> */}
                                                <button
                                                    className={removePhotoBtn}
                                                    type="button"
                                                    onClick={() => {
                                                        setPhotos(
                                                            photos.filter(
                                                                (_, index) =>
                                                                    index !== i
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <RemoveIcon />
                                                </button>
                                            </div>
                                        );
                                    })}
                                <div className={addPhotoBtnWrapper}>
                                    <button
                                        className={addPhotoBtn}
                                        type="button"
                                        onClick={() =>
                                            setPhotos(prev => [...prev, ''])
                                        }
                                    >
                                        Додати фото
                                    </button>
                                </div>
                            </label>
                            {/* <FieldArray
                                name="photos"
                                render={arrayHelpers => (
                                    <label className={createFormLabel}>
                                        <span className={createFormTitle}>
                                            * Фото:
                                        </span>
                                        {values.photos &&
                                            values.photos.length > 0 &&
                                            values.photos.map((photo, i) => (
                                                <div key={i}>
                                                    <Field
                                                        className={
                                                            isPhotosError
                                                                ? `${createFormInput} ${createFormInputError}`
                                                                : createFormInput
                                                        }
                                                        type="file"
                                                        onChange={uploadImage}
                                                        // accept="image/*"
                                                        name={`photos.${i}`}
                                                    />
                                                    <ErrorMessage
                                                        className={
                                                            createFormError
                                                        }
                                                        component="p"
                                                        name={`photos.${i}`}
                                                    />
                                                    <button
                                                        className={
                                                            removePhotoBtn
                                                        }
                                                        type="button"
                                                        onClick={() => {
                                                            arrayHelpers.remove(
                                                                i
                                                            );
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </button>
                                                </div>
                                            ))}
                                        <div className={addPhotoBtnWrapper}>
                                            <button
                                                className={addPhotoBtn}
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.push('')
                                                }
                                            >
                                                Додати фото
                                            </button>
                                        </div>
                                    </label>
                                )}
                            /> */}

                            <label className={createFormLabel}>
                                <span className={createFormTitle}>Опис:</span>
                                <Field
                                    className={createFormInput}
                                    type="text"
                                    name="describe"
                                />
                            </label>
                        </div>
                        <button
                            className={
                                isError
                                    ? `${createFormSubmit} ${disabled}`
                                    : createFormSubmit
                            }
                            type="submit"
                            disabled={isError}
                        >
                            <span>Створити</span>
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}
