import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import 'swiper/scss';
import 'swiper/scss/navigation';
import './EquipmentSlider.scss';

export function EquipmentSlider({ imagesData }) {
    return (
        <div className="slider__container">
            <Swiper
                className="slider__wrapper"
                modules={[Navigation]}
                slidesPerView="1"
                centeredSlides={true}
                navigation={{
                    nextEl: '.next',
                    prevEl: '.prev',
                }}
            >
                {imagesData.map(({ url, title, _id }) => {
                    return (
                        <SwiperSlide key={_id} className="slider__card">
                            <img
                                className="slider__img"
                                src={url}
                                alt={title}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <button className="prev slider__prev" type="button">
                <ArrowBackIosNewIcon />
            </button>
            <button className="next slider__next" type="button">
                <ArrowForwardIosIcon />
            </button>
        </div>
    );
}
