import {DirectoryType} from "@/types";
import {FC} from "react";

type Props = {
    data: DirectoryType
};

export const Directory: FC<Props> = ({ data }) => {
    return (
        <div className=" bg-white rounded-xl shadow-md overflow-hidden p-6 h-full">
            <img
                className="w-full object-contain mb-4"
                src={data.featuredImage}
                alt={data.altText}
            />
            <div className="text-gray-900 font-semibold text-xl mb-2">
                {data.title}
            </div>
            <div className="text-gray-700 text-base space-y-2 pl-4">
                <div className="flex items-center gap-2">
                    <span className="epkbfa epkbfa-map-marker" />
                    <span>{data.address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="epkbfa epkbfa-phone" />
                    <span>{data.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="epkbfa epkbfa-globe"/>
                    <a
                        href={data.website}
                        className="text-blue-500 hover:text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {data.website}
                    </a>
                </div>
            </div>
            <div className="mt-4 text-sm font-medium text-gray-600 border-t pt-3">
                {data.category}
            </div>
        </div>
    );
};