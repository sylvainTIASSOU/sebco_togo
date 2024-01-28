import React from "react";
import Image from "next/image";
import {ImageProp} from "@/interfaces";

const ImageComp = ({src, width, height, styles}: ImageProp) => {
    return (

            <Image src={src} alt={"product"}
                   width={width}
                   height={height}
                   className={`${styles} bg-contain  bg-cover`}
                   priority={true}
                   quality={100}
            />
    );
}
export default ImageComp