import "./SearchBox.scss";
import React from "react";

interface SearchBoxProps {
  value?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
}

export function SearchBox({ value, onSubmit }: SearchBoxProps) {
  return (
    <form className="SearchBox" onSubmit={onSubmit}>
      <input
        type="text"
        name="q"
        id="searchUsers"
        placeholder="Chercher user..."
        value={value}
        required
      />
      <input type="submit" value="Envoyer" />
    </form>
  );
}
