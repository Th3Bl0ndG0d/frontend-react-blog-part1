// import './NewPost.css';
// import Button from "../../components/button/Button.jsx";
// import { useState } from "react";
// import { calculateReadTime } from "../../helper/calculateReadTime.js";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle } from "phosphor-react";
//
// function NewPost() {
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);
//     const navigate = useNavigate();
//
//     function handleSubmit(e) {
//         e.preventDefault();
//         setError('');
//         setSuccess(false);
//
//         const form = e.target;
//         const title = form.title.value.trim();
//         const subtitle = form.subtitle.value.trim();
//         const author = form.author.value.trim();
//         const content = form.content.value.trim();
//
//         if (content.length < 300 || content.length > 2000) {
//             setError('content');
//             return;
//         }
//
//         const result = {
//             title,
//             subtitle,
//             content,
//             author,
//             created: new Date().toISOString(),
//             readTime: calculateReadTime(content),
//             comments: 0,
//             shares: 0,
//         };
//
//         console.log(result);
//         form.reset();
//         setSuccess(true);
//
//         setTimeout(() => {
//             navigate("/AllPosts");
//         }, 1500);
//     }
//
//     return (
//         <div className="outer-container newpost-wrapper">
//             <form
//                 className="inner-container new-post-form"
//                 onSubmit={handleSubmit}
//                 onChange={() => setError('')}
//             >
//                 <h1>Post toevoegen</h1>
//
//                 <label>
//                     Titel
//                     <input type="text" name="title" required />
//                 </label>
//
//                 <label>
//                     Subtitle
//                     <input type="text" name="subtitle" required />
//                 </label>
//
//                 <label>
//                     Naam en achternaam
//                     <input type="text" name="author" required />
//                 </label>
//
//                 <label>
//                     Blogpost
//                     <textarea
//                         name="content"
//                         rows="8"
//                         required
//                         minLength={300}
//                         maxLength={2000}
//                         className={error === 'content' ? 'input-error' : ''}
//                     ></textarea>
//                 </label>
//
//                 {error === 'content' && (
//                     <p className="form-error">
//                         De blogpost moet tussen de 300 en 2000 karakters lang zijn.
//                     </p>
//                 )}
//
//                 {success && (
//                     <p className="form-success">
//                         <CheckCircle size={18} weight="bold" className="success-icon" />
//                         Je post is succesvol toegevoegd!
//                     </p>
//                 )}
//
//                 <Button type="submit">Toevoegen</Button>
//             </form>
//         </div>
//     );
// }
//
// export default NewPost;

import './NewPost.css';
import Button from "../../components/button/Button.jsx";
import { useState } from "react";
import { calculateReadTime } from "../../helper/calculateReadTime.js";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "phosphor-react";
import axios from "axios";

function NewPost() {
    // Toestand voor foutmeldingen, successtatus en aangemaakte post-ID
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [createdId, setCreatedId] = useState(null);

    const navigate = useNavigate();

    // Handler voor het indienen van het formulier
    // Valideert invoer, verstuurt data naar backend, en verwerkt resultaat
    async function handleSubmit(e) {
        e.preventDefault(); // voorkom standaard form-actie
        setError('');
        setSuccess(false);
        setCreatedId(null);

        // Extractie en normalisatie van formulierwaarden
        const form = e.target;
        const title = form.title.value.trim();
        const subtitle = form.subtitle.value.trim();
        const author = form.author.value.trim();
        const content = form.content.value.trim();

        // Validatie: contentlengte moet tussen 300–2000 tekens liggen
        if (content.length < 300 || content.length > 2000) {
            setError('content');
            return;
        }

        // Constructie van nieuw blogpost-object
        const newPost = {
            title,
            subtitle,
            content,
            author,
            created: new Date().toISOString(),
            readTime: calculateReadTime(content),
            comments: 0,
            shares: 0,
        };

        try {
            // POST-request naar backend API met bijbehorende headers
            const response = await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts',
                newPost,
                {
                    headers: {
                        'novi-education-project-id': 'ecb55e45-972c-4a35-8fc0-933ef319f560',
                    },
                }
            );

            // Bij succesvolle response: formulier resetten en successtatus activeren
            form.reset();
            setCreatedId(response.data.id); // post-ID uit backend-respons
            setSuccess(true);
        } catch (e) {
            // Fout bij communicatie met backend
            console.error('Post toevoegen mislukt:', e);
            setError('api');
        }
    }

    return (
        <div className="outer-container newpost-wrapper">
            <div className="inner-container new-post-form">

                {/* Succesbericht: post is toegevoegd, met link naar detailpagina */}
                {success && createdId && (
                    <p className="form-success">
                        <CheckCircle size={18} weight="bold" className="success-icon" />
                        De blogpost is succesvol toegevoegd. Je kunt deze {' '}
                        <Link to={`/posts?id=${createdId}`}>hier bekijken</Link>.
                    </p>
                )}

                {/* Formulier wordt enkel getoond indien geen succesvolle verzending */}
                {!success && (
                    <form onSubmit={handleSubmit} onChange={() => setError('')}>
                        <h1>Post toevoegen</h1>

                        <label>
                            Titel
                            <input type="text" name="title" required />
                        </label>

                        <label>
                            Subtitle
                            <input type="text" name="subtitle" required />
                        </label>

                        <label>
                            Naam en achternaam
                            <input type="text" name="author" required />
                        </label>

                        <label>
                            Blogpost
                            <textarea
                                name="content"
                                rows="8"
                                required
                                minLength={300}
                                maxLength={2000}
                                className={error === 'content' ? 'input-error' : ''}
                            ></textarea>
                        </label>

                        {/* Valideer contentlengte */}
                        {error === 'content' && (
                            <p className="form-error">
                                De blogpost moet tussen de 300 en 2000 karakters lang zijn.
                            </p>
                        )}

                        {/* Algemene fout bij verzending naar backend */}
                        {error === 'api' && (
                            <p className="form-error">
                                Er ging iets mis bij het verzenden. Probeer het later opnieuw.
                            </p>
                        )}

                        <Button type="submit">Toevoegen</Button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default NewPost;