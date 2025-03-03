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
    return <div className="w-16 h-[32.81px] relative cursor-pointer inline-block" onClick={onChangeHandler}>
        <div className="w-16 h-[32.81px] left-0 top-0 absolute bg-white rounded-3xl transition" />
        <div className={classNames("w-[26.35px] h-[26.35px] top-[3.23px] absolute bg-primary rounded-full transition-all duration-300", {
            "left-[3px]": !checked,
            "left-[35px]": checked
        })} />
    </div>
}