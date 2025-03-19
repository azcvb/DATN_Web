export const validUrl = (urlValue) => {
    if (urlValue === null || typeof urlValue !== 'string') {
        return "";
    }
    urlValue = urlValue.toLowerCase();
    urlValue = urlValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    urlValue = urlValue.replace(/đ/g, 'd');
    urlValue = urlValue.replace(/[()\\{}]/g, "");
    urlValue = urlValue.split(" ").join("-");
    return urlValue;
}