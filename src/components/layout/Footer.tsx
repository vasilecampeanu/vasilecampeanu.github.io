import { FC } from "react";

interface FooterProps {
}

const Footer: FC<FooterProps> = () => {
    return (
        <footer className="page-footer">
            <div className="footer-inner-wrapper">
                <div className="copyright-notice">Copyright {new Date().getFullYear()} © Vasile Câmpeanu</div>
            </div>
        </footer>
    )
}

export default Footer;
