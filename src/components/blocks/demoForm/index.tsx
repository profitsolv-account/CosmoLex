import { FC } from "react";

export const DemoForm: FC = () => {
    return (
        <div className="relative">
            <div className="max-w-[437px] mx-auto relative z-1 bg-white rounded-[30px] p-[50px]">
                <iframe
                    src="/public/demo-form.html"
                    frameBorder="0"
                    className="w-full h-full"
                    style={{ minHeight: "700px" }}
                />
            </div>
            <div className="bg-primary absolute z-0 w-full h-[190px] left-0 rounded-bl-[100px] top-0" />
        </div>
    );
};

