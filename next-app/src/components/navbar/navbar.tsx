import Link from "next/link";
import styles from "./navbar.module.css";

const links = [
    { href: "", label: "Home" },
    { href: "", label: "About" },
    { href: "", label: "Projects" },
    { href: "", label: "Contact" },
    { href: "", label: "My Code" },
    { href: "", label: "Resume" },
];
function NavBar() {
    return (
        <nav className="relative">
            <ul className="flex w-full justify-center">
                {links.map((link) => (
                    <li key={link.label} className={styles.navItem}>
                        <Link href={link.href}>{link.label.toUpperCase()}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;

