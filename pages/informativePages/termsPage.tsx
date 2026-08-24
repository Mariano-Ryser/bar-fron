import { useRouter } from "next/router";
import styles from './privacyPage.module.css';
import Footer from '../../components/footer/Footer';
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
    } else {
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const currentDate = new Date().toLocaleDateString('de-DE', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.background}>
        <div className={styles.logoWatermark}>
          <img
            src="/img/logo80.webp"
            alt="Stockercloud Logo"
            className={styles.watermarkLogo}
          />
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <button 
            onClick={() => router.back()} 
            className={styles.backButton}
          >
            ← Zurück
          </button>
          <div className={styles.headerRight}>
            <span className={styles.badge}>🍽️ Stockercloud Zürich</span>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.headerSection}>
            <h1>Datenschutzerklärung</h1>
            <p className={styles.effectiveDate}>
              Stand: {currentDate}
            </p>
          </div>

          <div className={styles.sections}>
            {/* Einleitung */}
            <section className={styles.section}>
              <p>
                Die Website der Stockercloud AG (nachfolgend «Website») unterliegt schweizerischem Datenschutzrecht, 
                insbesondere gemäss dem Bundesgesetz über den Datenschutz (DSG) sowie allenfalls anwendbarem 
                ausländischem Datenschutzrecht wie beispielsweise der Datenschutz-Grundverordnung (DSGVO) der 
                Europäischen Union (EU). Die EU anerkennt, dass das schweizerische Datenschutzrecht einen 
                angemessenen Datenschutz gewährleistet.
              </p>
              <p>
                Wir können unsere Datenschutzerklärung jederzeit durch Veröffentlichung auf dieser Website anpassen. 
                Der Zugriff auf diese Website erfolgt mittels Transportverschlüsselung (SSL/TLS). Der Zugriff auf 
                diese Website unterliegt – wie jede Internet-Nutzung – der allgemeinen, anlasslosen, unterschiedslosen 
                und verdachtsunabhängigen Massenüberwachung durch Sicherheitsbehörden in der Schweiz, in der EU, 
                in den USA und in anderen Staaten.
              </p>
            </section>

            {/* Zugriffsdaten */}
            <section className={styles.section}>
              <h2>Zugriffsdaten / Server-Logfiles</h2>
              <p>
                Der Webhoster erhebt Daten über Zugriffe auf diese Website und speichert diese als «Server-Logfiles» ab. 
                Folgende Daten werden so protokolliert:
              </p>
              <ul>
                <li>Besuchte Website</li>
                <li>Uhrzeit zum Zeitpunkt des Zugriffes</li>
                <li>Menge der gesendeten Daten in Byte</li>
                <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
                <li>Verwendeter Browser</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Verwendete IP-Adresse</li>
              </ul>
              <p>
                Die erhobenen Daten dienen lediglich statistischen Auswertungen und zur Verbesserung der Webserver. 
                Der Webhoster behält sich allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten 
                konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
              </p>
            </section>

            {/* Umgang mit personenbezogenen Daten */}
            <section className={styles.section}>
              <h2>Umgang mit personenbezogenen Daten</h2>
              <p>
                Grundsätzlich können Sie diese Website besuchen, ohne dabei Angaben über Ihre Person zu machen. 
                Wir speichern lediglich Daten ohne Bezug zu Ihrer Person wie insbesondere den Namen Ihres 
                Internet-Providers, eventuell Seiten, die Sie vorher besucht haben, oder Felder, die Sie auf 
                dieser Website anklicken. Um das Angebot weiter zu verbessern, werten wir diese Daten aus. 
                Die Daten erlauben jedoch keinen Rückschluss auf Ihre Person.
              </p>
            </section>

            {/* Kontakt */}
            <section className={styles.section}>
              <h2>Kontakt</h2>
              <p>
                Personenbezogene Daten werden durch uns erfasst, wenn Sie uns diese von sich aus mitteilen, 
                beispielsweise wenn Sie mit uns in Kontakt treten. Die uns auf diese Weise übermittelten 
                personenbezogenen Daten werden wir selbstverständlich ausschliesslich für den Zweck verwenden, 
                zu dem Sie uns diese bei der Kontaktaufnahme zur Verfügung stellen.
              </p>
              <p>
                Eine Mitteilung dieser Angaben erfolgt ausdrücklich auf freiwilliger Basis und mit Ihrer Einwilligung. 
                Soweit es sich hierbei um Angaben zu Kommunikationskanälen (beispielsweise E-Mail-Adresse, Telefonnummer) 
                handelt, willigen Sie ausserdem ein, dass wir Sie ggf. auch über diesen Kommunikationskanal kontaktieren, 
                um Ihr Anliegen zu beantworten.
              </p>
              <p>
                Ihre Einwilligungserklärungen können Sie selbstverständlich jederzeit für die Zukunft widerrufen. 
                Bitte wenden Sie sich hierfür an uns per E-Mail.
              </p>
            </section>

            {/* Kontaktformulare */}
            <section className={styles.section}>
              <h2>Kontaktformulare</h2>
              <p>
                Die von Ihnen auf Kontaktformulare eingegebenen Daten werden zum Zweck der individuellen Kommunikation 
                mit Ihnen gespeichert. Hierfür ist die Angabe einer gültigen E-Mail-Adresse sowie Ihres Namens erforderlich. 
                Diese Daten werden gespeichert um eine Zuordnung zur Anfrage und eine Beantwortung der Anfrage zu ermöglichen. 
                Welche Daten in einem Formular erforderlich sind, ist durch eine Sternmarkierung (*) beim entsprechenden 
                Datenfeld erkennbar.
              </p>
            </section>

            {/* Google Analytics */}
            <section className={styles.section}>
              <h2>Einsatz von Google-Analytics mit Anonymisierungsfunktion</h2>
              <p>
                Diese Website benutzt «Google Analytics», einen Webanalysedienst der Firma Google Inc., 
                1600 Amphitheatre Parkway, Mountain View, CA 94043 USA, nachfolgend «Google». 
                Google Analytics verwendet sogenannte Cookies. Das sind Textdateien, die auf Ihrem Computer 
                gespeichert werden und die eine Analyse Ihrer Benutzung der Website ermöglichen. Die durch das 
                Cookie erzeugten Informationen über Ihre Benutzung der Website werden in der Regel an einen 
                Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der 
                IP-Anonymisierung auf der Website wird Ihre IP-Adresse von Google jedoch innerhalb der 
                Mitgliedstaaten der Europäischen Union (EU) oder in anderen Vertragsstaaten des Abkommens über 
                den Europäischen Wirtschaftsraum (EWR) zuvor gekürzt. Nur in Ausnahmefällen wird die volle 
                IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.
              </p>
              <p>
                In unserem Auftrag wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, 
                um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und 
                der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die 
                im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen 
                Daten von Google zusammengeführt.
              </p>
              <p>
                Sie können die Speicherung der Cookies durch eine entsprechende Anpassung Ihrer Browser-Einstellungen 
                verhindern. Wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche 
                Funktionen dieser Website vollumfänglich nutzen können. Sie können darüber hinaus die Erfassung der 
                durch das Cookie erzeugten und auf Ihre Nutzung dieser Website bezogenen Daten (inkl. Ihrer IP-Adresse) 
                an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem 
                folgenden Link (http://tools.google.com/dlpage/gaoptout?hl=de) verfügbare Browser-Plugin herunterladen 
                und installieren.
              </p>
              <p>
                Nähere Informationen zu Nutzungsbedingungen und Datenschutz finden Sie unter 
                http://www.google.com/analytics/terms/de.html und https://www.google.de/intl/de/policies/. 
                Wir weisen Sie darauf hin, dass auf dieser Website Google Analytics um den Code «anonymizeIp» 
                erweitert wurde, um eine anonymisierte Erfassung von IP-Adressen (sog. IP-Masking) zu gewährleisten.
              </p>
            </section>

            {/* Google Tag Manager */}
            <section className={styles.section}>
              <h2>Einsatz vom Google Tag Manager</h2>
              <p>
                Google Tag Manager ist eine Lösung, mit der wir sog. Website-Tags über eine Oberfläche verwalten können 
                und so z.B. Google Analytics sowie andere Google-Marketing-Dienste in unser Onlineangebot einbinden können. 
                Das Tool Tag Manager (das die Tags implementiert) ist eine cookielose Domain und erfasst keine 
                personenbezogenen Daten. Das Tool sorgt für die Weiterleitung von Daten und Auslösung anderer Tags, 
                die ihrerseits unter Umständen Daten erfassen können.
              </p>
              <p>
                Google Tag Manager greift nicht auf diese Daten zu. Wenn auf Domain- oder Cookie-Ebene eine Deaktivierung 
                vorgenommen wurde, bleibt diese für alle Tracking-Tags bestehen, die mit Google Tag Manager implementiert werden.
              </p>
              <p>
                Im Hinblick auf die Verarbeitung der personenbezogenen Daten der Nutzer wird auf die folgenden Angaben 
                zu den Google-Diensten verwiesen. Nutzungsrichtlinien: 
                https://www.google.com/intl/de/tagmanager/use-policy.html.
              </p>
            </section>

            {/* Google Maps */}
            <section className={styles.section}>
              <h2>Einsatz von Google-Maps</h2>
              <p>
                Auf dieser Website wird die Komponente «Google Maps» von Google eingesetzt.
              </p>
              <p>
                Bei jedem einzelnen Aufruf der Komponente Google Maps wird von Google ein Cookie gesetzt, um bei der 
                Anzeige der Seite, auf der die Komponente Google Maps integriert ist, Nutzereinstellungen und -daten 
                zu verarbeiten. Dieses Cookie wird im Regelfall nicht durch das Schliessen des Browsers gelöscht, 
                sondern läuft nach einer bestimmten Zeit ab, soweit es nicht von Ihnen zuvor manuell gelöscht wird.
              </p>
              <p>
                Wenn Sie mit dieser Verarbeitung Ihrer Daten nicht einverstanden sind, so besteht die Möglichkeit, 
                den Service von Google Maps zu deaktivieren und auf diesem Weg die Übertragung von Daten an Google 
                zu verhindern. Dazu müssen Sie die Javascript-Funktion in Ihrem Browser deaktivieren, dies kann aber 
                zur Folge haben, dass nicht mehr alle Funktionen auf dieser Website einwandfrei funktionieren.
              </p>
              <p>
                Die Nutzung von Google Maps und der über Google Maps erlangten Informationen erfolgt gemäss den 
                Google-Nutzungsbedingungen http://www.google.de/intl/de/policies/terms/regional.html sowie der 
                zusätzlichen Geschäftsbedingungen für Google Maps 
                https://www.google.com/intl/de_de/help/terms_maps.html.
              </p>
            </section>

            {/* Google Webfonts */}
            <section className={styles.section}>
              <h2>Verwendung von Google Webfonts</h2>
              <p>
                Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend darzustellen, verwenden wir 
                auf dieser Website «Google Web Fonts» der Google LLC (1600 Amphitheatre Parkway, Mountain View, 
                CA 94043, USA; nachfolgend «Google») zur Darstellung von Schriften.
              </p>
              <p>
                Die Datenschutzrichtlinie des Bibliothekbetreibers Google finden Sie hier: 
                https://www.google.com/policies/privacy/
              </p>
            </section>

            {/* Cookies */}
            <section className={styles.section}>
              <h2>Cookies</h2>
              <p>
                Cookies sind kleine Textdateien, die beim Besuch dieser Website in Ihrem Computer dauerhaft oder 
                temporär gespeichert werden. Zweck der Cookies ist insbesondere die Analyse der Nutzung dieser 
                Website zur statistischen Auswertung sowie für kontinuierliche Verbesserungen.
              </p>
              <p>
                Falls Sie auf Ihrem Gerät gespeicherte Cookies einschränken oder sperren wollen, können Sie dies 
                über die Einstellungen Ihres Browsers tun. Informationen hierzu finden Sie in der Hilfe-Funktion 
                Ihres Browsers. Umfassende Informationen darüber, wie Sie Cookies bei vielen Browsern sperren können, 
                finden Sie auch auf computerhope.com. Bei deaktivierten Cookies stehen Ihnen allenfalls nicht mehr 
                alle Funktionen dieser Website zur Verfügung.
              </p>
            </section>

            {/* Rechte des Nutzers */}
            <section className={styles.section}>
              <h2>Rechte des Nutzers: Auskunft, Berichtigung und Löschung</h2>
              <p>
                Sie als Nutzer erhalten auf Antrag Ihrerseits kostenlose Auskunft darüber, welche personenbezogenen 
                Daten über Sie gespeichert wurden. Sofern Ihr Wunsch nicht mit einer gesetzlichen Pflicht zur 
                Aufbewahrung von Daten (z. B. Vorratsdatenspeicherung) kollidiert, haben Sie ein Anrecht auf 
                Berichtigung falscher Daten und auf die Sperrung oder Löschung Ihrer personenbezogenen Daten.
              </p>
            </section>

            {/* Kontakt bei Fragen */}
            <section className={styles.section}>
              <h2>Kontakt bei Datenschutzfragen</h2>
              <p>Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:</p>
              <div className={styles.contactInfo}>
                <p><strong>Stockercloud AG</strong></p>
                <p>Hohlstrasse 405</p>
                <p>8004 Zürich</p>
                <p>Schweiz</p>
                <p>📧 rysermariano@gmail.com</p>
                <p>📞 +41 78 874 79 74</p>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}