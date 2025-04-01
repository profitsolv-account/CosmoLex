import Image from 'next/image';
import CompaniesLogo from '@/assets/img/profitsolve-companies.svg';
import ClearView from '@/assets/img/companies/clearviewsocial.webp';
import CosmoLex from '@/assets/img/companies/cosmolex.webp';
import LawRuler from '@/assets/img/companies/lawruler.webp';
import LexSign from '@/assets/img/companies/lexsign.webp';
import LexShare from '@/assets/img/companies/lexshare.webp';
import Mango from '@/assets/img/companies/mango.webp';
import Paymo from '@/assets/img/companies/paymo.webp';
import RocketMatter from '@/assets/img/companies/rocketmatter.webp';
import Tabs3 from '@/assets/img/companies/tabs3.webp';
import TimeSolv from '@/assets/img/companies/timesolve.webp';
import TitleTap from '@/assets/img/companies/titletap.webp';
import Orion from '@/assets/img/companies/orion.webp';

const companies = [
    {
        logo: ClearView,
        link: 'https://clearviewsocial.com',
        title: 'ClearView Social'
    },
    {
        logo: CosmoLex,
        link: 'https://www.cosmolex.com',
        title: 'CosmoLex',
    },
    {
        logo: LawRuler,
        link: 'https://www.lawruler.com',
        title: 'LawRuler',
    },
    {
        logo: LexSign,
        link: 'https://www.lexsign.io/',
        title: 'LexSign',
    },
    {
        logo: LexShare,
        link: 'https://www.lexshare.io/',
        title: 'LexShare',
    },
    {
        logo: Mango,
        link: 'https://mangopractice.com',
        title: 'Mango'
    },
    {
        logo: Paymo,
        link: 'https://www.paymoapp.com/',
        title: 'Paymo',
    },
    {
        logo: RocketMatter,
        link: 'https://www.rocketmatter.com',
        title: 'RocketMatter',
    },
    {
        logo: Tabs3,
        link: 'https://www.tabs3.com',
        title: 'Tabs3',
    },
    {
        logo: TimeSolv,
        link: 'https://www.timesolv.com/',
        title: 'TimeSolv',
    },
    {
        logo: TitleTap,
        link: 'https://titletap.com',
        title: 'TitleTap',
    },
    {
        logo: Orion,
        link: 'https://orionlaw.com',
        title: 'Orion',
    }
];

export const Companies = () => {
    return <div className="px-2 z-10 relative">
        <div className="max-w-[69.875rem] mx-auto bg-white rounded-[1.875rem] min-h-[25rem]">
            <div className="flex items-center justify-center w-full border-bottom border-primary-dark border-b-[0.125rem] py-10 px-4">
                <CompaniesLogo className="max-w-[28.125rem]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10">
                {companies.map((company) => (
                    <a
                        href={company.link}
                        key={company.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center p-5 cursor-pointer mb-15">
                        <Image
                            src={company.logo.src}
                            alt={company.title}
                            width={company.logo.width}
                            height={company.logo.height}
                            className="w-[176px]"
                        />
                    </a>
                ))}
            </div>
        </div>
    </div>
}