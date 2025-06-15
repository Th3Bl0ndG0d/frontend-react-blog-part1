export function calculateReadTime(content) {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words * 0.3);
    return minutes;
}