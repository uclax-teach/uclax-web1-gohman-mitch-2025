import { config } from "@Core/config";

export const getPageTitle = (pageTitle) => {
    const { studentName, title, location } = config.profile;
    const defaultTitle = `${studentName} :: ${title} :: ${location}`;
    return pageTitle ? `${pageTitle} :: ${defaultTitle}` : defaultTitle;
};