export const formatWeekday = (date: string): string => {
    const dateobj = new Date(date);
    return dateobj.toLocaleString("en-US", { weekday: "short" });
};

export const formatMonthday = (date: string): string => {
    const dateobj = new Date(date);
    return dateobj.toLocaleString("en-US", { day: "2-digit" });
};

export const formatMonth = (date: string): string => {
    const dateobj = new Date(date);
    return dateobj.toLocaleString("en-US", { month: "long" });
};
