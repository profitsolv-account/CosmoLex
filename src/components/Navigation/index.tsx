import {FC} from "react";
import classNames from "classnames";
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
            <a className="text-right text-white text-base font-normal font-['Inter'] md:text-[15px]"
               style={{
                   fontFamily: 'Inter',
                   fontSize: '16px',
                   fontStyle: 'normal',
                   fontWeight: '400',
                   lineHeight: 'normal',
                   WebkitFontSmoothing: 'antialiased',
                   MozOsxFontSmoothing: 'grayscale'
               }}
               href="">Solutions</a>
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