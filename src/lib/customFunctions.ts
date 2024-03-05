export function formatted_date() {
    const date = new Date();
    return `${String(+date.getDay() + 1).padStart(2, '0')}.${String(+date.getMonth() + 1).padStart(2, '0')}.${+date.getFullYear()}`;
}