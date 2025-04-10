import {headers} from "next/headers";

export const getLanguage = async () => {

    const headersList = headers();
    const hr = await headersList;

    const host = hr.get('host') || '';

    let lang = 'eng';
    if (host.includes('.ca')) {
        lang = 'ca';
    } else if (host.includes('.uk')) {
        lang = 'uk';
    }

    return lang;
}