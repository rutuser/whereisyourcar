export const oneHourAgo = () => {
    const result = new Date();
    result.setHours(result.getHours() - 1);
    return result;
};