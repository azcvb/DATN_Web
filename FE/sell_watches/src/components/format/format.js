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
export const formatUrlToLink = (url) => {
    if (url === undefined) {
        return "";
    }
    url = url.trim()
    url = url.replace("/", "")
    url = url.replace(/-/g, " ");
    const linkTo = url.split("/");
    return linkTo;
}
export const formatLink = (link) => {
    link = link.toLowerCase();
    link = link.replace(/ /g, "-");
    return `/${link}`;
}
export const formatNumber = (number) => {
    return number.toLocaleString('vi-VN');
}
export const validEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
}
export const validPhone = (value) => {
    const regex = /^0\d{9,10}$/;
    return regex.test(value);
}
export const validPassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;
    return regex.test(value);
};
export const validDob = (value) => {
    const dob = new Date(value)
    const today = new Date()

    let age = today.getFullYear() - dob.getFullYear()

    const monthDiff = today.getMonth() - dob.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age >= 18
}