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
import { toast } from "react-toastify";
import axios from "axios";
import { CheckCircle, WarningCircle } from "phosphor-react";

function NewPost() {
    // Toestand voor ID van aangemaakte post
    const [createdId, setCreatedId] = useState(null);

    const navigate = useNavigate();

    // Handler voor het indienen van het formulier
    // Voert validatie uit, stuurt data naar backend, en toont melding
    async function handleSubmit(e) {
        e.preventDefault(); // voorkom standaard gedrag
        setCreatedId(null); // reset ID bij nieuwe poging

        // Ophalen en trimmen van invoervelden
        const form = e.target;
        const title = form.title.value.trim();
        const subtitle = form.subtitle.value.trim();
        const author = form.author.value.trim();
        const content = form.content.value.trim();

        // Content moet minimaal 300 en maximaal 2000 tekens bevatten
        if (content.length < 300 || content.length > 2000) {
            toast.error(
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <WarningCircle size={20} weight="regular" />
                    De blogpost moet tussen de 300 en 2000 karakters bevatten.
                </span>
            );
            return;
        }

        // Object met blogpostgegevens voor verzending
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
            // Verstuur POST-verzoek naar backend API
            const response = await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts',
                newPost,
                {
                    headers: {
                        'novi-education-project-id': 'ecb55e45-972c-4a35-8fc0-933ef319f560',
                    },
                }
            );

            // Formulier resetten en succesmelding tonen
            form.reset();
            setCreatedId(response.data.id); // post-ID opslaan
            toast.success(
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={20} weight="bold" />
                    Je blogpost is succesvol toegevoegd!!!!!!!!
                </span>
            );
        } catch (e) {
            // Backend foutmelding weergeven
            console.error('Post toevoegen mislukt:', e);
            toast.error(
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <WarningCircle size={20} weight="fill" />
                    Er ging iets mis bij het verzenden. Probeer het later opnieuw.
                </span>
            );
        }
    }

    return (
        <div className="outer-container newpost-wrapper">
            <div className="inner-container new-post-form">

                {/* Formulier voor het toevoegen van een blogpost */}
                <form onSubmit={handleSubmit}>
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
                        ></textarea>
                    </label>

                    <Button type="submit">Toevoegen</Button>
                </form>

                {/* Link naar de nieuw aangemaakte post */}
                {createdId && (
                    <p className="form-success-link">
                        Je kunt je blogpost <Link to={`/posts?id=${createdId}`}>hier bekijken</Link>.
                    </p>
                )}
            </div>
        </div>
    );
}

export default NewPost;
