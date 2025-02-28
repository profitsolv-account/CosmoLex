import {FC} from "react";
import classNames from "classnames";

type Props = {
    className?: string;
}

export const Rating:FC<Props> = ({className}) => {
    return <div className={classNames("relative", className)}>
        <div className="flex gap-2 items-center">
            <div className="left-0 top-0">
                <svg width="200" height="33" viewBox="0 0 200 33" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div className="text-white text-sm font-light font-['Inter']">4.7 from 330 reviews</div>
        </div>
        <div className={classNames("text-white text-base font-medium font-['Inter'] mt-2")}>Trusted by thousands of users</div>
    </div>
}