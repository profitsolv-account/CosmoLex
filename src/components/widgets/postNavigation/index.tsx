import {FC} from "react";
import classNames from "classnames";

export type TOCItem = {
    id: string;
    text: string;
    tag: string;
    children?: TOCItem[];
};

type Props = {
    toc: TOCItem[];
};

export const TableOfContents: FC<Props> = ({ toc }) => {
    return (
        <nav
            className="p-6 w-full sticky top-8 text-sm  bg-[#d7effa] rounded-[1.875rem] inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-black text-xl font-bold font-['Inter'] leading-loose">Inside</div>
            <TOCList items={toc} depth={0}/>
        </nav>
    );
};

const TOCList: FC<{ items: TOCItem[]; depth: number }> = ({items, depth}) => {
    return (
        <ul className="space-y-1 list-none pl-0 ml-0 w-full">
            {items.filter(item => !!item.text.length).map(item => (
                <li key={item.id} className={classNames(`pl-${depth * 4} py-2`, {
                    'border-b border-[#0a324f]/20 py-2 last:border-0': depth === 0
                })}>
                    <a href={`#${item.id}`} className="self-stretch justify-start text-primary-dark text-base font-normal decoration-0 no-underline">
                        {item.text}
                    </a>
                    {item.children && <TOCList items={item.children} depth={depth + 1} />}
                </li>
            ))}
        </ul>
    );
};
