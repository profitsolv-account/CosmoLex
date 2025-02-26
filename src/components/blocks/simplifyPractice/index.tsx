import workInTeam from '@/assets/img/simple-practice/work-in-team.webp';
import goodExperience from '@/assets/img/simple-practice/good-experience.webp';
import workRemotely from '@/assets/img/simple-practice/work-remotely.webp';

export const SimplifyPractice = () => {
    return (
        <div className="container mt-20">
           <div className="w-full max-w-[353px] mx-auto relative z-10 md:max-w-[1171px]">
               <h3 className="text-center text-primary-dark text-4xl font-bold leading-[48px] px-10 mb-9">Simplify your practice with one tool.</h3>

              <div className="flex flex-col gap-5 md:flex-row md:gap-[37px]">
                  <div className="flex flex-col justify-between w-[353px] bg-[#badfc3] rounded-[15px] pt-10 overflow-hidden md:w-1/2 md:rounded-[30px] md:pt-18">

                      <div className="px-9 mb-10">

                          <h4 className="text-center text-primary-dark text-3xl font-bold leading-[50px] tracking-[-1px] mb-3 md:text-[40px] md:mb-7">Book a demo.</h4>
                          <p className="text-center text-primary-dark text-base font-medium leading-[25px] mb-6 md:max-w-[380px] md:mx-auto md:text-lg md:mb-8">
                              Tell us your needs, and we’ll show you how to personalize CosmoLex for them.
                          </p>
                          <div className="flex justify-center">
                              <a href="/" className="base-btn w-auto mx-auto bg-primary-dark text-white inline-flex px-8 hover:bg-transparent hover:text-primary-dark">Schedule now</a>
                          </div>
                      </div>

                      <div className="w-full h-[207px] relative flex justify-between gap-2.5">

                          <div className="h-[207px] left-0 top-0 relative rounded-tr-[5px] rounded-bl-[15px]  bg-cover bg-[-160px_center] bg-no-repeat w-[30%]" style={{
                              backgroundImage: "url("+workInTeam.src+")",
                          }} />
                          <div className="h-[178px] top-[29px] relative rounded-tl-[5px] rounded-tr-[5px] bg-cover bg-[-60px_center] bg-no-repeat w-[40%]" style={{
                              backgroundImage: "url("+goodExperience.src+")",
                          }}/>
                          <div className="h-[207px] top-0 relative rounded-tl-[5px] rounded-br-[15px] bg-cover bg-[-120px_center] bg-no-repea w-[30%]" style={{
                              backgroundImage: "url("+workRemotely.src+")",
                          }}/>
                      </div>
                  </div>

                  <div className="w-[353px] bg-[#fd937a] rounded-[15px] px-5 pt-10 overflow-hidden md:w-1/2 md:rounded-[30px] md:pt-18">
                     <div className="px-4 mb-10">
                         <h4 className="text-center text-primary-dark text-3xl font-bold leading-[50px] tracking-[-1px] mb-3 md:text-[40px] md:mb-7">Try for free.</h4>
                         <p className="text-center text-primary-dark text-base font-medium leading-[25px] mb-6 md:max-w-[380px] md:mx-auto md:text-lg md:mb-8">
                             No wait. No credit card. Just click to get started with CosmoLex for free.
                         </p>
                         <div className="flex justify-center">
                             <a href="/" className="base-btn w-auto mx-auto bg-primary-dark text-white inline-flex px-8 hover:bg-transparent hover:text-primary-dark">Get started</a>
                         </div>
                     </div>

                      <div className="h-[162px] bg-[#838080] rounded-tl-[10px] rounded-tr-[10px] md:h-[245px]" />
                  </div>
              </div>

           </div>
        </div>
    );
}