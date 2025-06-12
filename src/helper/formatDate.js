export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}