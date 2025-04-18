import LogoDark from "@/assets/img/logo-dark.svg";
import Crm from "@/assets/img/crm.svg";
import WebsiteIcon from "@/assets/img/websites.svg";
import {FC, ReactNode} from "react";
import {Heading} from "@/components/ui/heading";
import "./styles.css";
import {PricingFeature, SettingsType} from "@/types";
import {CustomLink} from "@/components/ui/customLink";

type AddonType = {
    type: 'crm' | 'websites';
    description: string;
    price: number;
    mPrice: number;
    content: string;
    info: string;
}

const addons:{[key: string]: AddonType} = {"crm": {
    type: 'crm',
    description: 'Grow your law firm and improve your client experience with marketing automation, client intake, and contact management.',
    info: 'USD/month billed annually for up to 3 CosmoLex users',
    price: 147,
    mPrice: 177,
    content: '',
}, "websites":{
    type: 'websites',
    description: 'Grow your business with a powerful and professional mobile-friendly website.',
    info: 'USD per month billed annually',
    price: 149,
    mPrice: 159,
   content: '',
}};

type Props = {
    features: PricingFeature[],
    settings: SettingsType
}

export const AddonsBlock: FC<Props> = ({features, settings}) => {

    const priceAddons: AddonType[] = features.map((f) => ({
        ...addons[f.type],
        ...f,
    } as AddonType));

    return <div className="relative pb-10 pt-10">
        <div className="max-w-[67.8125rem] mx-auto relative z-10 flex flex-col gap-5 px-2">
            <Heading className="md:max-w-[52.8125rem] text-white">Game-changing add-ons to accelerate your law firm’s growth.</Heading>
            {priceAddons.map((data) => ( <Addon addon={data} key={data.type} settings={settings} />))}
        </div>
        <div className="bg-primary h-[25rem] rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] absolute top-0 left-0 w-full" />
    </div>
}

type AddonProps = {
    addon: AddonType,
    settings: SettingsType
}

export const Addon: FC<AddonProps> = ({addon, settings}) => {
    const media: {[index: string]: ReactNode} = {
        'crm': <div className="bg-green rounded-[1.25rem] p-10 w-full h-[12.5rem] flex items-center justify-center">
            <LogoDark className="max-w-[9.0625rem]" />
            <Crm className="max-w-[3.125rem]"/>
        </div>,
        'websites': <div className="bg-salmon rounded-[1.25rem] p-10 w-full h-[12.5rem] flex items-center justify-center">
            <LogoDark className="max-w-[9.0625rem]" />
            <WebsiteIcon className="max-w-[5.3125rem]"/>
        </div>
    }
    return <div className="rounded-[0.9375rem] px-[2.0625rem] py-[1.9375rem] flex flex-col items-start gap-[1.6875rem] justify-center w-full bg-white md:flex-row md:justify-start md:rounded-[1.875rem]">
        <div className="w-full md:w-[19.0625rem] md:flex-none">
            {media[addon.type]}
            <div className="pt-9">
                <div className="text-primary-dark text-[2.875rem] font-bold leading-[3rem] mb-1">${addon.price}</div>
                <div className="text-primary-dark text-[0.55rem] font-normal mb-0">{addon.info}</div>
                <div className="text-primary-dark text-[0.7rem] font-semibold">${addon.mPrice} USD month-to-month</div>
            </div>
        </div>
        <div className="grow" dangerouslySetInnerHTML={{__html: addon.content}} />
        <div className="w-[12.5rem] flex-none">
            <CustomLink href={settings.demoLink} className="base-btn w-full md:px-7 bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark md:w-auto">Request a demo</CustomLink>
        </div>
    </div>
}