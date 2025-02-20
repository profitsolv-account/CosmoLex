import slide1 from '@/assets/img/sliders/1.png';
import slide2 from '@/assets/img/sliders/2.png';
import slide3 from '@/assets/img/sliders/3.png';
import slide4 from '@/assets/img/sliders/4.png';
import Image from 'next/image';
import { Navigations } from './navigations';

export const Footer = () => {
    return (<div>
        <Navigations />
         <div className="w-full relative bg-[#eef8fd] flex items-center justify-center py-10">
        <div className="w-[1298px] p-2.5 left-[107px] top-[38px] bg-[#eef8fd] flex-col justify-center gap-5 items-center">
            <div className="text-center text-[#0c193a] text-2xl font-bold font-['Inter'] mb-10">Other ProfitSolv solutions.</div>
            <div className="grid grid-cols-2 lg:flex lg:justify-center">
                <div className="flex justify-center items-center">
                    <Image src={slide1} alt="alt" width={151} height={82} />
                </div>
                <div className="flex justify-center items-center">
                    <Image src={slide2} alt="alt" width={151} height={151} />  
                </div>
                <div className="flex justify-center items-center">
                    <Image src={slide3} alt="alt" width={151} height={151} />
                </div>
                <div className="flex justify-center items-center">
                    <Image src={slide4} alt="alt" width={100} height={100} />
                </div>
            </div>
        </div>
    </div>
    
    
    </div>);
    
   
}