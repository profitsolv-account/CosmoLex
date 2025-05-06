import {CustomLink} from "@/components/ui/customLink";


export const SingleBlock = () => {
    return <div className="inline-flex justify-start items-start gap-4 flex-wrap content-start">
        <div className="flex-1 flex justify-between items-center">
            <div data-type="Article" className="h-3 relative">
                <div className="left-0 top-0 justify-start text-primary-dark text-base font-normal uppercase tracking-wider relative">ARTICLE</div>
            </div>
            <CustomLink
                href="/"
                className="text-right justify-start text-primary-dark text-base font-normal relative top-1"
            >
                View All
            </CustomLink>
        </div>
        <img className="rounded-[1.25rem]" src="https://placehold.co/267x170" />
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-primary-dark text-xl font-bold leading-[2rem]">Law Firm Partnership Structure: Understanding Roles and Responsibilities</div>
            <div className="self-stretch justify-start text-primary-dark text-base font-normal leading-[1.875rem]">Law firm partnerships can be as complicated as the cases they handle.</div>
            <div className="inline-flex justify-start items-center gap-[0.438rem]">
                <CustomLink href="" className="justify-start text-primary-dark text-base font-normal leading-[1.875rem]">Read more</CustomLink>
            </div>
        </div>
    </div>
}