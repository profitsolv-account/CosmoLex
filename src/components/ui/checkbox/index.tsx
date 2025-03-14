import {FC, useState} from "react";
import classNames from "classnames";

type Props = {
    isChecked?: boolean;
    onChange?: (isChecked: boolean) => void;
}

export const Checkbox: FC<Props> = ({isChecked, onChange}) => {
    const [checked, setChecked] = useState(!!isChecked);

    const onChangeHandler = () => {
        const newValue = !checked;
        setChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    }
    return <div className="w-16 h-[2.0506rem] relative cursor-pointer inline-block" onClick={onChangeHandler}>
        <div className="w-16 h-[2.0506rem] left-0 top-0 absolute bg-white rounded-3xl transition" />
        <div className={classNames("w-[1.6469rem] h-[1.6469rem] top-[0.2019rem] absolute bg-primary rounded-full transition-all duration-300", {
            "left-[0.1875rem]": !checked,
            "left-[2.1875rem]": checked
        })} />
    </div>
}