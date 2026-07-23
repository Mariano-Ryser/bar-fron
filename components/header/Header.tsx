import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const SCROLL_THRESHOLD = 100;

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 8);
      
      if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
        setHidden(true);
        setMobileOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleLogoClick = () => {
    Router.push("/");
    setMobileOpen(false);
  };

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const navItems = [
    // { href: "/bar", text: "Bar" },
    // { href: "/restaurant", text: "Restaurant" },
    { href: "/speisekarte", text: "Speisekarte" },
    { href: "/getrenk", text: "Getränke" },
    { href: "/galerie", text: "Galerie" },
    { href: "/team", text: "Team" },
    // { href: "/events", text: "Events" },
    // { href: "/team", text: "Team" },
    // { href: "/galerie", text: "Galerie" },
    { href: "/kontakt", text: "Kontakt" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    Router.push(href);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden ? styles.hidden : ""}`}>
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo} onClick={handleLogoClick}>
            <img
              src="/img/logo-salotto.png" 
              alt="Logo"
              className={styles.logoImage}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <a 
                key={item.text} 
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  Router.push(item.href);
                }}
              >
                {item.text}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={toggleRef}
            className={styles.mobileToggle}
            onClick={toggleMenu}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            style={{ color: '#ffffff' }}
          >
            {mobileOpen ? (
              <X size={28} style={{ color: '#ffffff', stroke: '#ffffff' }} />
            ) : (
              <Menu size={28} style={{ color: '#ffffff', stroke: '#ffffff' }} />
            )}
          </button>
        </div>
      </header>

      {/* FULL SCREEN MOBILE MENU */}
      <div 
        ref={menuRef}
        className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}
      >
        {/* Botón de cerrar DENTRO del modal - CRUZ BLANCA */}
        <button 
          className={styles.closeButton}
          onClick={closeMenu}
          aria-label="Cerrar menú"
        >
          <X size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
        </button>

        <nav className={styles.mobileNav}>
          <div className={styles.mobileNavList}>
            {navItems.map((item) => (
              <a
                key={item.text}
                href={item.href}
                className={styles.mobileNavItem}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.text}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}