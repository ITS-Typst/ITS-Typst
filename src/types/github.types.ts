export interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export interface GitHubRepo {
  name: string;
  archived: boolean;
}
