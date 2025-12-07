"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
    const pathname = usePathname();
    return (
        <Nav variant="pills">
            <NavItem>
                <NavLink href="/" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>
                    home </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/profile" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>
                    profile </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/search" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>
                    search </NavLink>
            </NavItem>





        </Nav>
    );
}