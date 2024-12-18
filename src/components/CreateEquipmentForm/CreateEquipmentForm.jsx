import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Field, Formik, Form, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';

import { arrOfCategories, arrOfTypes } from 'constants';
import { capitalizeFirstLetter, urlToFile } from 'helpers';
import {
    useAddEquipmentMutation,
    useGetEquipmentByIdQuery,
    useUpdateEquipmentByIdMutation,
} from '../../redux/equipments/equipmentsApi';

import styles from './CreateEquipmentForm.module.scss';
const {
    createForm,
    createFormLabelsWrapper,
    createFormLabel,
    createFormRadioGroup,
    createFormRadioLabel,
    createFormRadioValueLabel,
    createFormTitle,
    createFormRadioTitle,
    createFormInput,
    createFormSelect,
    createFormRadio,
    createFormPhotoPreviewWrapper,
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
    typeOfEquipment: yup.string().required(),
    model: yup.string().required(),
    mainFeature: yup.string().required(),
    valueOfMainFeature: yup.number(),
    features: yup
        .array()
        .of(yup.string().required('features is a required field'))
        .required(),
    describe: yup.string(),
});

export function CreateEquipmentForm({ type }) {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('equipmentId');

    const { data: equipmentForEdit, error: getEquipmentError } =
        useGetEquipmentByIdQuery(id, { skip: type === 'create' && true });

    getEquipmentError && toast.error(getEquipmentError.data.message);

    const [photos, setPhotos] = useState(['']);
    const [photoError, setPhotoError] = useState(false);

    const [addEquipment, { error: addEquipmentError }] =
        useAddEquipmentMutation();
    const [editEquipment, { error: editEquipmentError }] =
        useUpdateEquipmentByIdMutation();

    addEquipmentError && toast.error(addEquipmentError.data.message);
    editEquipmentError && toast.error(editEquipmentError.data.message);

    useEffect(() => {
        setPhotoError(
            photos.some(photo => photo === '' || photo === undefined)
        );
    }, [photos]);

    useEffect(() => {
        if (type !== 'edit') {
            return;
        }

        async function filePhotos() {
            const result = await Promise.all(
                equipmentForEdit.photos.map(async ({ url, title }) => {
                    const file = await urlToFile(url, title, 'image/jpeg');

                    return file;
                })
            );
            setPhotos(result);
        }

        filePhotos();
    }, [equipmentForEdit?.photos, type]);

    const initialValues = {
        category: type === 'edit' ? equipmentForEdit.category : '',
        typeOfEquipment:
            type === 'edit' ? equipmentForEdit.typeOfEquipment : '',

        model: type === 'edit' ? equipmentForEdit.model : '',
        mainFeature: type === 'edit' ? equipmentForEdit.mainFeature : '',
        valueOfMainFeature:
            type === 'edit' ? equipmentForEdit.valueOfMainFeature : '',
        features: type === 'edit' ? equipmentForEdit.features : [''],
        describe: type === 'edit' ? equipmentForEdit.describe : '',
    };

    async function handleSubmit(values, { resetForm }) {
        toast.info(`Form submitted`);
        const formData = new FormData();
        console.log(values);

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
            const response =
                type === 'create'
                    ? await addEquipment(formData)
                    : await editEquipment({ id, data: formData });
            toast.success(`Equipment created`);
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
                let isTypeError = false;
                let isMainFeatureError = false;
                let isValueOfMainFeatureError = false;
                let isModelError = false;
                let isFeaturesError = false;

                Object.keys(errors).forEach(errorName => {
                    Object.keys(touched).forEach(touch => {
                        if (errorName === 'category' && touch === 'category') {
                            isCategoryError = true;
                        }

                        if (
                            errorName === 'typeOfEquipment' &&
                            touch === 'typeOfEquipment'
                        ) {
                            isTypeError = true;
                        }

                        if (errorName === 'model' && touch === 'model') {
                            isModelError = true;
                        }

                        if (
                            errorName === 'mainFeature' &&
                            touch === 'mainFeature'
                        ) {
                            isMainFeatureError = true;
                        }

                        if (
                            errorName === 'mainFeature' &&
                            touch === 'mainFeature'
                        ) {
                            isValueOfMainFeatureError = true;
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
                                <span className={createFormTitle}>* Тип:</span>
                                <Field
                                    className={
                                        isTypeError
                                            ? `${createFormSelect} ${createFormInputError}`
                                            : createFormSelect
                                    }
                                    as="select"
                                    name="typeOfEquipment"
                                >
                                    <option value="other" defaultValue>
                                        Інше
                                    </option>
                                    {arrOfTypes.map(type => (
                                        <option key={type} value={type}>
                                            {capitalizeFirstLetter(type)}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    className={createFormError}
                                    component="p"
                                    name="typeOfEquipment"
                                />
                            </label>
                            <div className={createFormRadioGroup} role="group">
                                <span className={createFormTitle}>
                                    * Основна характеристика:
                                </span>
                                <label className={createFormRadioLabel}>
                                    <Field
                                        className={
                                            isMainFeatureError
                                                ? `${createFormRadio} ${createFormInputError}`
                                                : createFormRadio
                                        }
                                        type="radio"
                                        name="mainFeature"
                                        value="-"
                                        checked
                                    />
                                    <span className={createFormRadioTitle}>
                                        Інше
                                    </span>
                                </label>
                                <label className={createFormRadioLabel}>
                                    <Field
                                        className={
                                            isMainFeatureError
                                                ? `${createFormRadio} ${createFormInputError}`
                                                : createFormRadio
                                        }
                                        type="radio"
                                        name="mainFeature"
                                        value="Сила пресу"
                                    />
                                    <span className={createFormRadioTitle}>
                                        Сила пресу, МН:
                                    </span>
                                </label>
                                <label className={createFormRadioLabel}>
                                    <Field
                                        className={
                                            isMainFeatureError
                                                ? `${createFormRadio} ${createFormInputError}`
                                                : createFormRadio
                                        }
                                        type="radio"
                                        name="mainFeature"
                                        value="Маса падаючих частин"
                                    />
                                    <span className={createFormRadioTitle}>
                                        Маса падаючих частин, кг:
                                    </span>
                                </label>
                                <label className={createFormRadioValueLabel}>
                                    <span className={createFormRadioTitle}>
                                        Значення:
                                    </span>
                                    <Field
                                        className={
                                            isValueOfMainFeatureError
                                                ? `${createFormInput} ${createFormInputError}`
                                                : createFormInput
                                        }
                                        type="text"
                                        name="valueOfMainFeature"
                                    />
                                </label>
                                <ErrorMessage
                                    className={createFormError}
                                    component="p"
                                    name="valueOfMainFeature"
                                />
                                <ErrorMessage
                                    className={createFormError}
                                    component="p"
                                    name="mainFeature"
                                />
                            </div>

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
                                        const imagePreviewURL =
                                            photo && URL.createObjectURL(photo);
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
                                                <div
                                                    className={
                                                        createFormPhotoPreviewWrapper
                                                    }
                                                >
                                                    <img
                                                        src={imagePreviewURL}
                                                        alt={photo.name}
                                                    />
                                                </div>

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
                            <span>
                                {type === 'edit' ? 'Змінити' : 'Створити'}
                            </span>
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}
