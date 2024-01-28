"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperCore, { Autoplay, Pagination, Navigation  } from 'swiper/modules';
import { useRouter } from 'next/navigation';

const Page1 = () => {
    const route = useRouter();
    return (

        <Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
                delay: 5500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper md:w-[480px] "
        >
            <SwiperSlide className=''>
                <div className='bg-[url("/images/179-sable-0-2.jpg")]  md:w-[480px] md:h-[400px] h-[300px] bg-cover bg-center bg-no-repeat '>

                </div>
            </SwiperSlide>


            <SwiperSlide>
                <div className='bg-[url("/images/1.jpg")] md:w-[480px] md:h-[400px] h-[300px] bg-cover bg-center bg-no-repeat'>

                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className='bg-[url("/images/remblai.jpg")] md:w-[480px] md:h-[400px] h-[300px] bg-cover bg-center bg-no-repeat'>

                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className='bg-[url("/images/materiaux-mysweetimmo.jpg")] md:w-[480px] md:h-[400px] h-[300px] bg-cover bg-center bg-no-repeat'>

                </div>
            </SwiperSlide>



        </Swiper>

    )
}

export default Page1