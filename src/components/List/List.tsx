import "./List.scss";

interface ListProps {
  children: JSX.Element | JSX.Element[];
}

export default function List({ children }: ListProps) {
  return <div className="List">{children}</div>;
}
