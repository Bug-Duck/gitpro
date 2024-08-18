import { Octokit as OckitCore } from '@octokit/core';
import { Octokit as OckitRest } from '@octokit/rest';
import { inject } from 'vue';

const OcCore = inject('oc') as OckitCore;
const OcRest = inject('oc') as OckitRest;

class GithubHttpException {
  /**
   * HTTP exception
   * @param status Integer
   * @param message String
   */
  constructor(public status: number, public message: string) {}
}

class GithubStarsFetcher {
  private exception: GithubHttpException;
  constructor() {
    this.exception = new GithubHttpException(0, '');
  }

  async getStarList(): Promise<any[]> {
    const response = await this.getData();
    if (response.status === 200) {
      console.info('get GithubStars ok');
      const items = response.data;
      const recentStars = items.filter((item: any) => {
        const nowTime = Date.now();
        const dataTime = new Date(item.starred_at).getTime();
        return nowTime - dataTime <= 30 * 24 * 60 * 60 * 1000;
      }).map((item: any) => {
        const [owner, repo] = item.repo.full_name.split('/');
        return { owner, repo };
      });
      return recentStars;
    } else {
      throw new GithubHttpException(response.status, 'Failed to fetch stars');
    }
  }

  async getData() {
    const OcResp = await OcCore.request('GET /user/starred', {
      headers: {
        'Accept': 'application/vnd.github.v3.star+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return {
      data: OcResp.data,
      status: OcResp.status,
      headers: OcResp.headers,
      url: OcResp.url
    };
  }
}

class GithubReposFetcher {}

class GithubAPIUtil {
  private getGithubStars: typeof GithubStarsFetcher;
  private getGithubRepos: typeof GithubReposFetcher;

  constructor() {
    this.getGithubStars = GithubStarsFetcher;
    this.getGithubRepos = GithubReposFetcher;
  }

  async getLanguageColors() {
    const response = await fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
    const colors = await response.json();
    console.info('getLanguageColors ok');
    console.info(colors);
    return colors
  }

  findKeyWithMaxValue(obj: Record<string, number>) {
    let maxKey: string | null = null;
    let maxValue = -Infinity;

    for (const key in obj) {
      if (obj[key] > maxValue) {
        maxValue = obj[key];
        maxKey = key;
      }
    }
    return maxKey;
  }

  async getMainLanguage(owner: string, repo: string) {
    const languages = await OcRest.repos.listLanguages({
      owner,
      repo
    });
    console.info('getMainLanguage ok');
    const language = await this.findKeyWithMaxValue(languages.data) as string;
    return language
  }
}

export const GithubAPIUtilInstance = new GithubAPIUtil();