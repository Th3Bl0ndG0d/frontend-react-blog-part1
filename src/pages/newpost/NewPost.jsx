import './NewPost.css';
import Button from "../../components/button/Button.jsx";
import { useState } from "react";
import { calculateReadTime } from "../../helper/calculateReadTime.js";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "phosphor-react";

function NewPost() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const form = e.target;
        const title = form.title.value.trim();
        const subtitle = form.subtitle.value.trim();
        const author = form.author.value.trim();
        const content = form.content.value.trim();

        if (content.length < 300 || content.length > 2000) {
            setError('content');
            return;
        }

        const result = {
            title,
            subtitle,
            content,
            author,
            created: new Date().toISOString(),
            readTime: calculateReadTime(content),
            comments: 0,
            shares: 0,
        };

        console.log(result);
        form.reset();
        setSuccess(true);

        setTimeout(() => {
            navigate("/AllPosts");
        }, 1500);
    }

    return (
        <div className="outer-container newpost-wrapper">
            <form
                className="inner-container new-post-form"
                onSubmit={handleSubmit}
                onChange={() => setError('')}
            >
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

                {error === 'content' && (
                    <p className="form-error">
                        De blogpost moet tussen de 300 en 2000 karakters lang zijn.
                    </p>
                )}

                {success && (
                    <p className="form-success">
                        <CheckCircle size={18} weight="bold" className="success-icon" />
                        Je post is succesvol toegevoegd!
                    </p>
                )}

                <Button type="submit">Toevoegen</Button>
            </form>
        </div>
    );
}

export default NewPost;
