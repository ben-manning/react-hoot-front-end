import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import CommentForm from "../CommentForm/CommentForm";
import * as hootService from '../../services/hootService';

const HootDetails = (props) => {
  const [hoot, setHoot] = useState(null);

  const { hootId } = useParams();

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log(hootData)
      setHoot(hootData.hoot);
    };
    fetchHoot();
  }, [hootId]);


  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };


  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          Posted by: {hoot.author_username}
        </p>
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment.id}>
            <header>
              <p>
                Comment by: {comment.comment_author_username}
              </p>
            </header>
            <p>{comment.comment_text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
