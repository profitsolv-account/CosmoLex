import {PageDataType} from "@/types";
import Image from 'next/image';
import img1 from '@/assets/img/login-banner/pexels-fauxels-3184287-scaled-1.webp';
import img2 from '@/assets/img/login-banner/pexels-fauxels-3184465-1-scaled-1.webp';
import img3 from '@/assets/img/login-banner/pexels-olly-927022-scaled-1.webp';

export const LoginBannerTemplate = ({pageData}: { pageData: PageDataType }) => {
    return <div className="min-h-screen flex items-center justify-center login-banner px-4 bg-white">

        <div className="relative z-1 bg-[#cce5d0] rounded-2xl shadow-md max-w-[48rem] w-full p-2.5 text-left overflow-hidden px-12 pr-10 pb-15">
            <div dangerouslySetInnerHTML={{__html: pageData.content}} />

            <div className="image-container grid grid-cols-3 gap-5 mt-18 relative z-10">

                <div className="w-full h-[140px] relative rounded-[0.9375rem] mr-2">
                    <Image
                        src={img1.src}
                        alt="login-banner"
                        width={170}
                        height={140}
                        className="object-cover rounded-[0.9375rem] w-full h-full"
                    />
                </div>

                <div className="w-full h-[140px] relative rounded-[0.9375rem] mr-2">
                    <Image
                        src={img2.src}
                        alt="login-banner"
                        width={170}
                        height={140}
                        className="object-cover rounded-[0.9375rem] w-full h-full"
                    />
                </div>

                <div className="w-full h-[140px] relative rounded-[0.9375rem] mr-2">
                    <Image
                        src={img3.src}
                        alt="login-banner"
                        width={170}
                        height={140}
                        className="object-cover rounded-[0.9375rem] w-full h-full"
                    />
                </div>

            </div>

            <div className="bg-primary absolute bottom-0 h-30 w-full left-0"/>
        </div>
    </div>
}