import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Formik, Form, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import RemoveIcon from '@mui/icons-material/Remove';
import { Notify } from 'notiflix';

import { arrOfCategories } from 'constants';
import { capitalizeFirstLetter } from 'helpers';
import { useAddEquipmentMutation } from '../../redux/equipments/equipmentsApi';

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
    describe: yup.string(),
});

export function CreateEquipmentForm() {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [photoError, setPhotoError] = useState(false);

    useEffect(() => {
        setPhotoError(
            photos.some(photo => photo === '' || photo === undefined)
        );
    }, [photos]);

    const [addEquipment, { error }] = useAddEquipmentMutation();

    error && Notify.failure(error.data.message);

    const initialValues = {
        category: '',
        model: '',
        features: [''],
        describe: '',
    };

    async function handleSubmit(values, { resetForm }) {
        Notify.info(`Form submitted`);
        const formData = new FormData();

        photos.forEach(photo => {
            formData.append('photos[]', photo);
        });

        for (const key in values) {
            if (key === 'features') {
                values[key].forEach(item => {
                    formData.append(`features[]`, item);
                });
            } else {
                formData.append(key, values[key]);
            }
        }

        try {
            const response = await addEquipment(formData);
            navigate(`/equipments/${response.data._id}`, { replace: true });
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
                                                        photoError
                                                            ? `${createFormInput} ${createFormInputError}`
                                                            : createFormInput
                                                    }
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={uploadImage}
                                                    name={`photos.${i}`}
                                                />
                                                {photoError && (
                                                    <p
                                                        className={
                                                            createFormError
                                                        }
                                                        name={`photos.${i}`}
                                                    >
                                                        Photos is a required
                                                        field
                                                    </p>
                                                )}

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
                                isError || photoError
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
