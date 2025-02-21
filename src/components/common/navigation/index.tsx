import {FC} from "react";
import classNames from "classnames";
import MegaMenu from "@/components/common/mmenu";
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

    return <ul className={classNames(className)}>
        <li>
            <MegaMenu title={
                <span className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]">Solutions</span>
            }>
                <ul>
                    <li className="py-2 px-4 hover:bg-gray-100 rounded">Menu Item 1</li>
                    <li className="py-2 px-4 hover:bg-gray-100 rounded">Menu Item 2</li>
                    <li className="py-2 px-4 hover:bg-gray-100 rounded">Menu Item 3</li>
                </ul>
            </MegaMenu>

        </li>
        <li>
            <a className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]"
               href="">Pricing</a>
        </li>
        <li>
            <a className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]"
               href="">Resources</a>
        </li>
        <li>
            <a className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]" href="">About</a>
        </li>
    </ul>
}