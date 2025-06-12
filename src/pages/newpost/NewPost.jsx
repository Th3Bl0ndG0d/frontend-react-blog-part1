import './NewPost.css';
import Button from "../../components/button/Button.jsx";
function NewPost() {
    return (
        <div className="outer-container newpost-wrapper">
            {/*<div className="inner-container new-post-container">*/}

                <form className="inner-container new-post-form" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Post toegevoegd! (nog geen echte opslag)');
                }}>
                    <h1>Post toevoegen</h1>
                    <label>
                        Titel
                        <input type="text" name="title" required />
                    </label>

                    <label>
                        Subtitle
                        <input type="text" name="subtitle" />
                    </label>

                    <label>
                        Naam en achternaam
                        <input type="text" name="author" required />
                    </label>

                    <label>
                        Blogpost
                        <textarea name="content" rows="8" required></textarea>
                    </label>

                    <Button type="submit">Toevoegen</Button>
                </form>
            {/*</div>*/}
        </div>
    );
}

export default NewPost;
