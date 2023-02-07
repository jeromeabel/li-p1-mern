import data from '../data';

export default function List() {
  return (
    <div className="mt-5">
      <p>liste</p>
      {data.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
