import {FC} from "react";
import classNames from "classnames";
import MegaMenu from "@/components/ui/mmenu";
import {FeaturedPost} from '@/components/common/featuredPost';
type Props = {
    className?: string;
}

export const Navigation:FC<Props> = ({className}) => {

    /* const { data } = await client.query({
         query: gql`
     query GetMenu {
       menu(id: "dGVybToy", idType: ID) {
         name
         menuItems(first: 50) {
           nodes {
             id
             label
             url
             parentId
           }
         }
       }
     }
   `,
         context: { fetchOptions: { next: { revalidate: 10 } } }
     });

     //client.clearStore();

     console.log('main-menu:',data);*/

    return <div>
        <ul className={classNames(className)}>
            <li>
                <MegaMenu title={
                    <span className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]">Solutions</span>
                }>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-[509px] justify-start items-start gap-[50px] inline-flex">
                            <div className="w-[220px] h-[485px]"><span
                                className="text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7">Firm Management<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Calendar & Tasks</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">   </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Stay matter-centric with automated workflows and tasks.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Workflow Automation</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">   </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Stay matter-centric with automated workflows and tasks. <br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Reporting</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">You decide what data is important to you.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Integrations</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Connect seamlessly with tools you already use.</span>
                            </div>
                            <div className="w-[220px] h-[485px]"><span
                                className="text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7">Billing & Payments<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Time & Expense Tracking</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Get paid faster with one-click invoicing and built-in payment processing.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Billing & Invoicing</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">   </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Set yourself up for invoicing success with powerful and easy billing tools.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Payments</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Your clients prefer to pay online. Reduce the friction to making this happen.</span>
                            </div>
                            <div className="w-[220px] h-[485px]"><span
                                className="text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7">Accounting & Finance<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Legal Accounting</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">   </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Ensure every dollar is accounted for accurately. We’re the experts at legal accounting for 15 years.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Trust Accounting</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">   </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Accurate and compliant trust account management.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Financial Reporting</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Stay compliant and up to date with real-time reports on your financial health.</span>
                            </div>
                            <div className="w-[220px] h-[530px]"><span
                                className="text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7">Client Engagement<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Secure Client Portal</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">File sharing, eSignature, SMS text messaging, and online payments.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Document Generation & Management</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Automate document creation and access secure files easily for each client & matter.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Customer Relation Management</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">    </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">A superior experience for  leads and prospects to ensure client growth.<br/></span><span
                                className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Websites</span><span
                                className="text-[#0c193a] text-base font-normal font-['Inter'] leading-normal">   </span><span
                                className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Be found online and grow your practice with a tailored website.</span>
                            </div>
                            <div className="w-[328px] h-[437px] bg-[#eef8fd] rounded-[10px]"/>
                            <div className="w-[328px] h-[206px] bg-[#d9d9d9] rounded-tl-[10px] rounded-tr-[10px]"/>
                            <div className="w-72 h-[163px] relative">
                                <div
                                    className="w-[91px] h-[33px] pr-[13px] py-[9px] left-0 top-0 absolute rounded-[50px] justify-start items-center inline-flex">
                                    <div className="text-black text-xs font-normal font-['Inter'] tracking-wide">FREE
                                        GUIDE
                                    </div>
                                </div>
                                <div
                                    className="w-[283px] h-[45px] left-0 top-[48px] absolute text-black text-base font-medium font-['Inter'] leading-[23px]">The
                                    Legal Firm’s Blueprint: Building a Strong Foundation for Success<br/></div>
                                <div
                                    className="w-72 h-11 left-0 top-[119px] absolute justify-start items-center gap-5 inline-flex">
                                    <div
                                        className="grow shrink basis-0 h-11 px-5 pt-2.5 pb-3 bg-[#0c193a] rounded-[100px] border justify-center items-center gap-2.5 flex">
                                        <div className="text-right text-white text-base font-normal font-['Inter']">Get
                                            Guide
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MegaMenu>

            </li>
            <li>
                <a className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]"
                   href="">Pricing</a>
            </li>
            <li>
                <MegaMenu
                    title={
                        <span className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]">Resources</span>
                    }
                    fullWidth
                >
                    <div className="bg-white">
                        <div className="container px-4 py-4 flex gap-[50px]">

                            <div className="justify-start items-start gap-[50px] grid grid-cols-4">
                                <div className="">
                                    <div className="text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7">Firm Management</div>
                                    <div className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Calendar & Tasks</div>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Stay matter-centric with automated workflows and tasks.</div>
                                    <div className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Workflow Automation</div>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Stay matter-centric with automated workflows and tasks.</div>
                                    <div className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Reporting</div>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">You decide what data is important to you.</div>
                                    <div className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Integrations</div>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Connect seamlessly with tools you already use.</div>
                                </div>
                                <div className="">
                                    <div className="text-[#0c193a] text-lg font-semibold font-['Inter'] leading-7">Billing & Payments</div>
                                    <div className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Time & Expense Tracking</div>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Get paid faster with one-click invoicing and built-in payment processing.</div>
                                    <div className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Billing & Invoicing</div>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Set yourself up for invoicing success with powerful and easy billing tools.</div>
                                    <div className="text-[#0c193a] text-base font-medium font-['Inter'] leading-normal">Payments</div>
                                    <div className="text-[#0c193a] text-base font-light font-['Inter'] leading-normal">Your clients prefer to pay online. Reduce the friction to making this happen.</div>
                                </div>
                            </div>

                            <FeaturedPost />

                        </div>
                    </div>

                    <div className="w-full h-[174px] bg-[#b9dfc3] rounded-bl-[30px] rounded-br-[30px]" />
                </MegaMenu>

            </li>
            <li>
                <MegaMenu title={
                    <span className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]">About</span>
                }>
                   <div className="bg-white p-10 px-30">test</div>
                </MegaMenu>
            </li>
        </ul>
    </div>
}