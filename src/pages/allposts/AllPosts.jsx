// import posts from '/src/constants/data.json';
// import { Link } from 'react-router-dom';
// import './AllPosts.css';
//
// function AllPosts() {
//     return (
//         <div className="outer-container all-posts-wrapper">
//             <div className="inner-container all-posts-card">
//                 <h1>Bekijk alle {posts.length} posts op het platform</h1>
//                 <ul className="post-list">
//                     {posts.map(post => (
//                         <li key={post.id} className="post-card">
//                             <p>
//                                 <Link to={`/posts/${post.id}`} className="link post-title">
//                                     {post.title}
//                                 </Link>{' '}
//                                 <span className="post-author">({post.author})</span>
//                             </p>
//                             <p className="meta">
//                                 {post.comments} reacties - {post.shares} keer gedeeld
//                             </p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }
//
// export default AllPosts;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AllPosts.css';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBlogposts() {
            const toastId = 'fetch-posts';

            const promise = axios.get(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts',
                {
                    headers: {
                        'novi-education-project-id': 'ecb55e45-972c-4a35-8fc0-933ef319f560',
                    },
                }
            );

            toast.promise(promise, {
                pending: {
                    render: 'Posts worden geladen...',
                    toastId: toastId,
                },
                success: {
                    render: 'Blogposts succesvol geladen!',
                    toastId: toastId,
                },
                error: {
                    render: 'Fout bij ophalen van blogposts',
                    toastId: toastId,
                },
            });

            try {
                const response = await promise;
                setPosts(response.data);
            } catch (e) {
                console.error('Fout bij ophalen van blogposts:', e);
                setError('Kon de blogposts niet laden.');
            } finally {
                setLoading(false);
            }
        }

        fetchBlogposts();
    }, []);


    if (loading) return null;
    if (error) return <p>{error}</p>;

    return (
        <div className="outer-container all-posts-wrapper">
            <div className="inner-container all-posts-card">
                <h1>Bekijk alle {posts.length} posts op het platform</h1>
                <ul className="post-list">
                    {posts.map((post) => (
                        <li key={post.id} className="post-card">
                            <p>
                                {/* Link via query param */}
                                <Link to={`/posts?id=${post.id}`} className="link post-title">
                                    {post.title}
                                </Link>{' '}
                                <span className="post-author">({post.author})</span>
                            </p>
                            <p className="meta">
                                {post.comments} reacties – {post.shares} keer gedeeld
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AllPosts;