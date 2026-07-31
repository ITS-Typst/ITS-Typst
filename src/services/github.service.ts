import { GITHUB_CONFIG } from '@/config/github.config';
import type { GitHubContributor, GitHubRepo } from '@/types/github.types';

function getFetchOptions() {
  const token = process.env.GITHUB_TOKEN;
  return {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ITS-Typst',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  } as const;
}

async function fetchOrgRepos(): Promise<GitHubRepo[]> {
  const { owner, apiBaseUrl } = GITHUB_CONFIG;

  const response = await fetch(
    `${apiBaseUrl}/orgs/${owner}/repos?per_page=100&type=public`,
    getFetchOptions()
  );

  if (!response.ok) {
    const body = await response.text();
    console.error('[github] fetchOrgRepos failed:', response.status, body);
    return [];
  }
  return response.json() as Promise<GitHubRepo[]>;
}

async function fetchRepoContributors(
  repoName: string
): Promise<GitHubContributor[]> {
  const { owner, apiBaseUrl } = GITHUB_CONFIG;

  const response = await fetch(
    `${apiBaseUrl}/repos/${owner}/${repoName}/contributors?per_page=100`,
    getFetchOptions()
  );

  if (response.status === 404 || response.status === 204 || !response.ok) {
    return [];
  }

  return response.json() as Promise<GitHubContributor[]>;
}

export async function fetchContributors(): Promise<GitHubContributor[]> {
  const repos = await fetchOrgRepos();
  const activeRepos = repos.filter((r) => !r.archived);

  const perRepo = await Promise.all(
    activeRepos.map((r) => fetchRepoContributors(r.name))
  );

  const contributorMap = new Map<string, GitHubContributor>();

  for (const contributors of perRepo) {
    for (const contributor of contributors) {
      if (contributor.type === 'Bot') continue;

      const existing = contributorMap.get(contributor.login);
      contributorMap.set(contributor.login, {
        ...contributor,
        contributions:
          (existing?.contributions ?? 0) + contributor.contributions,
      });
    }
  }

  return Array.from(contributorMap.values()).sort(
    (a, b) => b.contributions - a.contributions
  );
}
