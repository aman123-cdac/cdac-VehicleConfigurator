import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enRegister from "./locales/en/register.json";
import frRegister from "./locales/fr/register.json";
import hiRegister from "./locales/hi/register.json";
import mrRegister from "./locales/mr/register.json";
import saRegister from "./locales/sa/register.json";

import enSignin from "./locales/en/signin.json";
import frSignin from "./locales/fr/signin.json";
import hiSignin from "./locales/hi/signin.json";
import mrSignin from "./locales/mr/signin.json";
import saSignin from "./locales/sa/signin.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { register: enRegister, signin: enSignin },
        fr: { register: frRegister, signin: frSignin },
        hi: { register: hiRegister, signin: hiSignin },
        mr: { register: mrRegister, signin: mrSignin },
        sa: { register: saRegister, signin: saSignin },
    },

    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    ns: ["signin", "register"],
    defaultNS: "signin",
    debug: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
});

export default i18n;
