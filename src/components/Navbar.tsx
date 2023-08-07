import Link from "next/link";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link href="/">
                    Vasile <span>Câmpeanu</span>
                </Link>
            </div>
            <div className="links-wrapper">
                <ul className="links">
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;