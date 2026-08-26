import React from "react";
import Router from "next/router";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  // Definir las rutas
  const companyItems = [
    { key: "Datenschutz", route: "/informativePages/termsPage" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* BRAND - Logo */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img
              src="/img/logo-salotto.png"
              alt="Salotto Logo"
              className={styles.logoImg}
            />
          </div>
          <p className={styles.brandDesc}>
            Willkommen im Salotto – Ihre Location für unvergessliche Momente. 
            Genuss, Events und Gastfreundschaft in einzigartiger Atmosphäre.
          </p>
    
        </div>

        {/* COMPANY */}
        <div className={styles.column}>
          <h3>Unternehmen</h3>
          <ul>
            {companyItems.map((item, index) => (
              <li 
                key={index}
                onClick={() => Router.push(item.route)}
                className={styles.clickable}
              >
                {item.key}
              </li>
            ))}
          </ul>
        </div>

        {/* ÖFFNUNGSZEITEN */}
        <div className={styles.column}>
          <h3>Öffnungszeiten</h3>
          <ul className={styles.openingHours}>
            <li>
              <span className={styles.day}>Montag - Freitag</span>
              <span>10:00 - 15:00</span>
            </li>
            <li>
              <span className={styles.day}>Privatanlässe auf Anfrage</span>

          
            </li>
           
          </ul>
        </div>

        {/* CONTACT */}
        <div className={`${styles.column} ${styles.contact}`}>
          <h3>Kontakt</h3>

          <div className={styles.contactItem}>
            <Mail size={18} />
            <a href="mailto:info@salotto-zurich.ch">info@salotto-zurich.ch</a>
          </div>

          <div className={styles.contactItem}>
            <Phone size={18} />
            <a href="tel:+41762275543">+41 76 227 55 43</a>
          </div>

          <div className={styles.contactItem}>
            <MapPin size={18} />
            <a 
              href="https://www.google.com/maps/place/Salotto+Bar+I+Lunch+I+Eventlocation/@47.3933226,8.5087277,671m/data=!3m1!1e3!4m15!1m8!3m7!1s0x47900a48ae02bb3d:0xa1205263669fd54e!2sHardturmstrasse+169,+8005+Z%C3%BCrich!3b1!8m2!3d47.3933226!4d8.5113026!16s%2Fg%2F11q2x8smfb!3m5!1s0x47900a48ad4fe49d:0x40c09eb32643d4f4!8m2!3d47.393454!4d8.511219!16s%2Fg%2F1jglsnd9t?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Hardturmstrasse 169, 8005 Zürich
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} Salotto. Alle Rechte vorbehalten.
        </span>
        <div className={styles.bottomLinks}>
          <span onClick={() => Router.push("/informativePages/termsPage")}>
            Datenschutz
          </span>
         
        </div>
      </div>
    </footer>
  );
}