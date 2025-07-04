import Image from "next/image";
import React from "react";

type Props = {
    message?: string;
};

const OnWorking: React.FC<Props> = ({ message = "Working in process" }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative w-56 h-56">
                <Image
                    fill={true}
                    alt="on_working"
                    src="/images/OnWorking.jpg"
                ></Image>
            </div>
            <h3>{message}</h3>
        </div>
    );
};

export default OnWorking;

