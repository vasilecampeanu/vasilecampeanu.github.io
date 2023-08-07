import { FC } from "react";

import StarsCanvas from "./StarsCanvas";

interface HeaderProps {
    hideSeparator?: boolean
}

const Header: FC<HeaderProps> = ({ hideSeparator }) => {
    return (
        <header className="page-header">
        </header>
    )
}

export default Header;
