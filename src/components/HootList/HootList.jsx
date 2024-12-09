import { Link } from "react-router-dom";

const HootList = (props) => {
  return (
    <main>
    {props.hoots.map((hoot) => (
      <Link key={hoot.id} to={`/hoots/${hoot.id}`}>
        <article>
          <header>
            <h2>{hoot.title}</h2>
            <p>
              posted by {hoot.author_username} 
            </p>
          </header>
          <p>{hoot.text}</p>
        </article>
      </Link>
    ))}
  </main>
  );
};

export default HootList;
