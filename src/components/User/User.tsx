import { Link } from "react-router-dom";
import "./User.scss";

interface IUserProps {
  login: string;
  avatarUrl: string;
  id: number;
}

export default function User({ login, avatarUrl, id }: IUserProps) {
  return (
    <Link to={`/user/${login}`} className="User">
      <img src={avatarUrl} className="avatar" alt={`avatar - ${login}`} />
      <div className="informations">
        <strong>{login}</strong>
        <p>ID: {id}</p>
      </div>
    </Link>
  );
}
