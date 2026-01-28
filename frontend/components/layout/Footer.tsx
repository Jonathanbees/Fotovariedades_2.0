"use client";

import React from "react";
import Logo from "../ui/Logo";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform:
    | "facebook"
    | "instagram"
    | "twitter"
    | "whatsapp"
    | "youtube"
    | "tiktok";
  href: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
}

export interface BusinessHours {
  days: string;
  hours: string;
  isClosed?: boolean;
}

export interface FooterProps {
  variant?: "default" | "minimal" | "compact";
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  businessHours?: BusinessHours[];
  showNewsletter?: boolean;
  copyrightText?: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  variant = "default",
  sections = [],
  socialLinks = [],
  contactInfo,
  businessHours = [],
  showNewsletter = false,
  copyrightText = "© 2024 Fotovariedades la 68. Todos los derechos reservados.",
  className = "",
}) => {
  // Social media icons
  const socialIcons: Record<string, React.ReactNode> = {
    facebook: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
    instagram: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    twitter: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
    whatsapp: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    youtube: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    tiktok: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  };

  // Minimal variant - simple footer with copyright and social links
  if (variant === "minimal") {
    return (
      <footer
        className={`
          bg-white dark:bg-gray-900
          border-t border-gray-200 dark:border-gray-800
          py-6
          ${className}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              {copyrightText}
            </p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                    aria-label={social.platform}
                  >
                    {socialIcons[social.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }

  // Compact variant - logo, copyright, social links in one row
  if (variant === "compact") {
    return (
      <footer
        className={`
          bg-gray-900 dark:bg-gray-950
          py-8
          ${className}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Logo variant="white" size="sm" />
              <p className="text-sm text-gray-400">{copyrightText}</p>
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                    aria-label={social.platform}
                  >
                    {socialIcons[social.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }

  // Default variant - full footer with all sections
  return (
    <footer
      className={`
        bg-gray-900 dark:bg-gray-950
        text-gray-300
        pt-12 pb-6
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1 space-y-4">
            <Logo variant="white" size="md" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu solución integral en papelería, fotografía y dulces. Calidad y
              servicio amable desde siempre.
            </p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                    aria-label={social.platform}
                  >
                    {socialIcons[social.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          {contactInfo && (
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                Contacto
              </h4>
              <ul className="space-y-3">
                {contactInfo.phone && (
                  <li>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="bg-gray-800 group-hover:bg-primary/20 p-2 rounded-lg transition-colors">
                        <span className="material-icons-outlined text-sm">
                          phone
                        </span>
                      </span>
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors group"
                    >
                      <span className="bg-gray-800 group-hover:bg-green-500/20 p-2 rounded-lg transition-colors">
                        {socialIcons.whatsapp}
                      </span>
                      {contactInfo.whatsapp}
                    </a>
                  </li>
                )}
                {contactInfo.email && (
                  <li>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="bg-gray-800 group-hover:bg-primary/20 p-2 rounded-lg transition-colors">
                        <span className="material-icons-outlined text-sm">
                          email
                        </span>
                      </span>
                      <span className="truncate">{contactInfo.email}</span>
                    </a>
                  </li>
                )}
                {contactInfo.address && (
                  <li className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="bg-gray-800 p-2 rounded-lg shrink-0">
                      <span className="material-icons-outlined text-sm">
                        location_on
                      </span>
                    </span>
                    <span>{contactInfo.address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Business hours */}
          {businessHours.length > 0 && (
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                Horarios
              </h4>
              <ul className="space-y-2">
                {businessHours.map((schedule, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm gap-4"
                  >
                    <span className="text-gray-400">{schedule.days}</span>
                    <span
                      className={
                        schedule.isClosed
                          ? "text-primary font-medium"
                          : "text-white"
                      }
                    >
                      {schedule.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Newsletter */}
        {showNewsletter && (
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md">
              <h4 className="text-white font-semibold mb-2">
                Suscríbete a nuestro boletín
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Recibe ofertas exclusivas y novedades directamente en tu correo.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Copyright bar */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
