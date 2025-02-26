import Image from "next/image";
import {get} from 'lodash';
import heroImg from '@/assets/img/hero.png';

export const HomeHeader = () => {

   /* const { data } = await client.query({
        query: gql`
          query GetHomePage {
            page(id: "home-page", idType: URI) {
              id
              title
              date
              content
            }
          }
        `,
        context: { fetchOptions: { next: { revalidate: 10 } } }
      });*/
      const data = {}

      const title = get(data, 'page.homePageSections.headingCopy', 'Some title');
      const description  = get(data, 'page.homePageSections.headerDescription', 'Some description');
      const img = get(data, 'page.homePageSections.heroImage.node.sourceUrl', heroImg);
      const ctaTrial = get(data, 'page.homePageSections.ctaTextForFreeTrialInHeader', 'Register');
      const demo = get(data, 'page.homePageSections.ctaTextForDemoInHeader', 'Demo');

      
    return <div className="bg-primary px-5 pt-10 rounded-bl-[50px] mb-30">

        <div className="flex flex-col gap-0 items-center lg:flex-row lg:gap-10 lg:justify-center lg:max-w-[1280px] lg:mx-auto lg:pb-10 relative">
            <div className="max-w-[353px] flex flex-col gap-6 lg:max-w-full lg:mt-32">
                <div className="pt-6">
                    <span className="text-white text-[46px] font-medium font-['Inter'] leading-[54px] lg:text-[54px] xl:text-[74px] xl:leading-[80px] xl:font-normal lg:block">{title}</span>
                </div>
                <div className="w-[324px] min-h-[61px] text-white text-lg font-normal font-['Inter'] leading-loose lg:w-full">
                    {description}
                </div>
                <div className="flex justify-center items-center gap-4 ax-w-[353px] lg:justify-start">
                    <div className="h-[54px] px-[30px] pt-5 pb-[22px] rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
                        <div className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary">{demo}</div>
                    </div>
                    <div className="h-[54px] px-[30px] pt-5 pb-[22px] bg-white rounded-[100px] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
                        <div className="text-center text-[#0c193a] text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white">{ctaTrial}</div>
                    </div>
                </div>

                <div className="hidden md:block w-[444.67px] h-[95px] relative mt-12">
                    <div className="left-0 top-0 absolute">
                        <svg width="246" height="33" viewBox="0 0 246 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9147 0L19.6699 11.64H31.8295L21.9945 18.83L25.7497 30.47L15.9147 23.28L6.07979 30.47L9.83495 18.83L0 11.64H12.1596L15.9147 0Z" fill="#FFBF00"/>
                        <path d="M55.4655 0L59.2207 11.64H71.3803L61.5453 18.83L65.3005 30.47L55.4655 23.28L45.6306 30.47L49.3857 18.83L39.5508 11.64H51.7104L55.4655 0Z" fill="#FFBF00"/>
                        <path d="M95.0085 0L98.7637 11.64H110.923L101.088 18.83L104.843 30.47L95.0085 23.28L85.1735 30.47L88.9287 18.83L79.0938 11.64H91.2533L95.0085 0Z" fill="#FFBF00"/>
                        <path d="M134.559 0L138.314 11.64H150.474L140.639 18.83L144.394 30.47L134.559 23.28L124.724 30.47L128.479 18.83L118.645 11.64H130.804L134.559 0Z" fill="#FFBF00"/>
                        <path d="M174.111 0L177.866 11.64H190.026L180.191 18.83L183.946 30.47L174.111 23.28L164.276 30.47L168.031 18.83L158.196 11.64H170.356L174.111 0Z" fill="white"/>
                        <path d="M174.111 0L177.866 11.64H190.026L180.191 18.83L183.946 30.47L174.111 23.28L164.276 30.47L168.031 18.83L158.196 11.64H170.356L174.111 0Z" fill="url(#paint0_linear_6749_22)"/>
                        <defs>
                        <linearGradient id="paint0_linear_6749_22" x1="157.956" y1="14.2078" x2="189.745" y2="14.2078" gradientUnits="userSpaceOnUse">
                        <stop offset="0.627382" stopColor="#FFBF00"/>
                        <stop offset="0.629933" stopColor="white"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    </div>
                    <div className="w-[233px] h-[52px] left-[211.67px] top-[8px] absolute text-white text-sm font-light font-['Inter']">4.7 from 330 reviews</div>
                    <div className="w-[247px] h-[52px] left-[0.67px] top-[43px] absolute text-white text-base font-medium font-['Inter']">Trusted by thousands of users</div>
                </div>
            </div>

            <div className="max-w-[353px] lg:max-w-full lg:grow lg:w-[503px] lg:flex-none xl:w-[703px] ">
                <Image src={img} alt="alt" width={100} height={100} className="w-full relative top-30" />
            </div>
        </div>
    </div>
}