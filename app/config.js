const siteTitle = "Firtsname Lastname :: UCLAX Web 1";

export const config = {
    getPageTitle: (pageTitle) => {
        return pageTitle ? `${pageTitle} :: ${siteTitle}` : siteTitle;
    },
};
