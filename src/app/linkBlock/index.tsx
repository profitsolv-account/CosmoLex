import {FC} from "react";
import Image from "next/image";

type Props = {
    link: string;
    title: string;
    description: string;
    image: string;
}
export const LinkBlock: FC<Props> = ({
    link,
    title,
    description,
    image
}) => {

    return (
        <a href={link} className="block bg-primary p-10 transition duration-300 hover:bg-primary-dark">
            <div>
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={800}
                    className="w-full mb-10"
                />
                <h3 className="text-white text-center text-4xl font-bold mb-5">{title}</h3>
                <p className="text-white text-center text-xl font-bold">{description}</p>
            </div>
        </a>
    )
}