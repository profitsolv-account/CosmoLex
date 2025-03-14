import { FC } from "react";

export const DemoForm: FC = () => {
    return (
        <div className="relative">
            <div className="max-w-[27.3125rem] mx-auto relative z-1 bg-white rounded-[1.875rem] p-[3.125rem]">
                <iframe
                    src="/public/demo-form.html"
                    frameBorder="0"
                    className="w-full h-full"
                    style={{ minHeight: "43.75rem" }}
                />
            </div>
            <div className="bg-primary absolute z-0 w-full h-[11.875rem] left-0 rounded-bl-[6.25rem] top-0" />
        </div>
    );
};

