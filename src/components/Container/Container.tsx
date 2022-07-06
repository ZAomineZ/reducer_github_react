import "./Container.scss";
import React, { InputHTMLAttributes } from "react";
import { useHistory } from "react-router";
import { SearchBox } from "../SearchBox/SearchBox";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
  onSubmit?: (value: string) => void;
}

export function Container({ children, onSubmit }: ContainerProps) {
  const history = useHistory();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { currentTarget } = e;
    const input = currentTarget?.querySelector(
      'input[name="q"]'
    ) as HTMLInputElement;
    const value = input?.value;
    history.push(`?q=${value}`);
    if (onSubmit) onSubmit(value ?? "");
  };

  return (
    <div className="Container">
      <header>
        <h3>Trouver des référentiels par des utilisateurs sur Github</h3>
      </header>
      <SearchBox onSubmit={handleSubmit} />
      <div>{children}</div>
    </div>
  );
}
