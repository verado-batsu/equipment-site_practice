import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import './EquipmentSlider.scss';

export function EquipmentSlider({ imagesData }) {
    return (
        <Swiper
            spaceBetween={24}
            slidesPerView="1"
            // loop={true}
        >
            {imagesData.map(({ url, title, _id }) => {
                return (
                    <SwiperSlide key={_id} className="slider__card">
                        <img className="slider__img" src={url} alt={title} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
