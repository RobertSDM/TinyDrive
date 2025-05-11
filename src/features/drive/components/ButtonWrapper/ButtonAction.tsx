import { ReactElement } from "react";

type ButtonActionProps = {
    onclick: (event: any) => void;
    style?: string;
    children: ReactElement | string;
};

export default function ButtonAction({
    style,
    onclick,
    children,
}: ButtonActionProps) {
    return (
        <button className={`outline-none ${style}`} onClick={onclick}>
            {children}
        </button>
    );
}
