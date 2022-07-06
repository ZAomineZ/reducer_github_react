export interface IUserGithub {
  login: string;
  avatar_url: string;
  id: number;
}

export interface IRepoGithub {
  name: string;
  description: string;
  html_url: string;
}
