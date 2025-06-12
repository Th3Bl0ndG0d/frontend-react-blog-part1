import { useParams, Link } from 'react-router-dom';
import posts from '/src/constants/data.json';
import { formatDate } from '/src/helper/formatDate.js';
import './BlogPost.css';
import { Clock } from 'phosphor-react';
import { CaretLeft } from 'phosphor-react';

function BlogPost() {
    const { id } = useParams();
    const post = posts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="outer-container notfound-wrapper">
                <div className="inner-container notfound-card">
                    <p className="error">Post niet gevonden.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="outer-container blogpost-wrapper">
            <article className="inner-container blogpost-container">
                <header>
                    <h1 className="blogpost-title">{post.title}</h1>
                    <h2 className="blogpost-subtitle">{post.subtitle}</h2>
                    <p className="meta">
                        Geschreven door {post.author} op {formatDate(post.created)}
                    </p>
                    <p className="blogpost-readtime">
                        <Clock size={16} weight="regular" className="readtime-icon" />
                        {post.readTime} minuten lezen
                    </p>
                </header>

                <section className="blogpost-content">
                    <p>{post.content}</p>
                </section>

                <section className="meta">
                    <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                </section>

                <nav>
                    <Link to="/AllPosts" className="link blogpost-back"><CaretLeft /> Terug naar de overzichtspagina</Link>
                </nav>
            </article>
        </div>
    );
}

export default BlogPost;

//Opdracht 1.3Dynamic routing.
// import { useParams } from 'react-router-dom';
//
// function BlogPost() {
//     const { id } = useParams(); // haalt 'id' uit de URL zoals de les
//
//     return (
//         <div>
//             <h1>{id}</h1>
//         </div>
//     );
// }
//
// export default BlogPost;
