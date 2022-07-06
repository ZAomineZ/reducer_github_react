import "./Item.scss";

interface IItemsProps {
  name: string;
  description: string;
  html_url: string;
}

export default function Item({ name, description, html_url }: IItemsProps) {
  return (
    <div className="Item">
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        <strong>{name}</strong>
        <p>{description}</p>
      </a>
    </div>
  );
}
