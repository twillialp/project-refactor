import LinkItem from "./LinkItem";

function LinksList({ links }) {
  if (!links.length) {
    return null; // nothing yet – or you can show a placeholder
  }

  return (
    <div className="links-list">
      {links.map((item) => (
        <LinkItem key={item.id} original={item.original} short={item.short} />
      ))}
    </div>
  );
}

export default LinksList;
