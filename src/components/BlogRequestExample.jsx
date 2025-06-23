import axios from 'axios';

function BlogRequestExample() {
    // 🧠 Hoe halen we alle blogposts op van de NOVI DYNAMIC API?

    // 1. Type request = GET (want dingen ophalen)
    // 2. Complete endpoint = https://novi-backend-api-wgsgz.ondigitalocean.app (BASE) + /api/blogposts
    // 3. Config object nodig? JA! Want we moeten onze persoonlijke API key (polsbandje) meesturen ieder request
    // Hoe ziet het eruit? We zetten een headers-key in het config object met daarin 'novi-education-project-id': 'jouw-api-key' (beide tussen '')
    // 4. Als we parameters willen toevoegen, zoals alleen alle blogposts met meer dan 13 reacties, voegen we een params-key in het config object toe zoals beschreven in de documentatie

    async function fetchBlogposts() {
        try {


            const response = await axios.get('https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts', {
                headers: {
                    'novi-education-project-id': 'ecb55e45-972c-4a35-8fc0-933ef319f560',
                },
                // dit is hetzelfde als dat we het endpoint zo hadden beschreven: https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts?comments[gt]=13
                // Voor alle post gewoon params weghalen :D
                params: {
                    'comments[gt]': 13,
                }
            });

            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button type="button" onClick={fetchBlogposts}>Haal alle blogposts met meer dan 13 reacties op</button>
        </>
    );
}

export default BlogRequestExample;