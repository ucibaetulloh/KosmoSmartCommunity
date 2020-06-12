export function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}