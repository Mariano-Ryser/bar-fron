import React from "react";
import Router from "next/router";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";
import { siteConfig } from "../../config/siteConfig";

export default function Footer() {
  const { company, contact, address, footer } = siteConfig;

  const { company: companyCol, openingHours, contact: contactCol } = footer.columns;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* BRAND */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img
              src={company.logo}
              alt={company.logoAlt}
              className={styles.logoImg}
            />
          </div>
          <p className={styles.brandDesc}>{footer.brandText}</p>
        </div>

        {/* COMPANY */}
        <div className={styles.column}>
          <h3>{companyCol.title}</h3>
          <ul>
            {companyCol.items.map((item, index) => (
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
          <h3>{openingHours.title}</h3>
          <ul className={styles.openingHours}>
            {openingHours.items.map((item, index) => (
              <li key={index}>
                <span className={styles.day}>{item.day}</span>
                {item.hours && <span>{item.hours}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className={`${styles.column} ${styles.contact}`}>
          <h3>{contactCol.title}</h3>

          <div className={styles.contactItem}>
            <Mail size={18} />
            <a href={contact.emailHref}>{contact.email}</a>
          </div>

          <div className={styles.contactItem}>
            <Phone size={18} />
            <a href={contact.phoneHref}>{contact.phone}</a>
          </div>

          <div className={styles.contactItem}>
            <MapPin size={18} />
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              {address.street}, {address.zip} {address.city}
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <span>
          © {currentYear} {company.name}. Alle Rechte vorbehalten.
        </span>
        <div className={styles.bottomLinks}>
          {footer.legal.links.map((link, i) => (
            <span key={i} onClick={() => Router.push(link.route)}>
              {link.text}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}