import type { JSX } from "react";
import { Helmet } from "react-helmet";

type TitleProps = {
    titleName: string;
};

export default function Title({ titleName }: TitleProps): JSX.Element {
    return (
        <>
            <Helmet>
                <title>
                    Frontend Mentor | Personal finance app - {titleName}
                </title>
            </Helmet>
        </>
    );
}
