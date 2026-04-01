import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from 'swiper/modules';

import slide1 from "../../assets/Slide 1.jpg";
import slide2 from "../../assets/Slide 2.jpg";
import slide3 from "../../assets/Slide 3.jpg";
import slide4 from "../../assets/Slide 4.jpg";
import slide5 from "../../assets/Slide 5.jpg";
import slide6 from "../../assets/Slide 6.jpg";
import slide7 from "../../assets/Slide 7.jpg";
const Category = () => {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper max-w-5xl mx-auto mt-10"
        >
            <SwiperSlide className="h-64">
                <img className="w-full h-full object-cover" src={slide1} alt="Slide 1" />
            </SwiperSlide>

            <SwiperSlide className="h-64">
                <img className="w-full h-full object-cover" src={slide2} alt="Slide 2" />
            </SwiperSlide>

            <SwiperSlide className="h-64">
                <img className="w-full h-full object-cover" src={slide3} alt="Slide 3" />
            </SwiperSlide>

            <SwiperSlide className="h-64">
                <img className="w-full h-full object-cover" src={slide4} alt="Slide 4" />
            </SwiperSlide>

            <SwiperSlide className="h-64">
                <img className="w-full h-full object-cover" src={slide5} alt="Slide 5" />
            </SwiperSlide>
            <SwiperSlide className="h-64">
                <img className="w-full h-full object-cover" src={slide6} alt="Slide 6" />
            </SwiperSlide>
            <SwiperSlide className="h-64">
                <img className="w-full h-full object-cover" src={slide7} alt="Slide 7" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Category;