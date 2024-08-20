import { Octokit } from '@octokit/rest';
import { token } from '../token';
const oc = new Octokit({
  auth: token
})

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

  async getStarList(): Promise<{ owner: string, repo: string }[]> {
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
    const OcResp = await oc.request('GET /user/starred', {
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

class GetMainLanguageColor{
  LanguageColors: any;
  constructor() {
    (async () => {
      this.LanguageColors = await this.getLanguageColors();
    })();
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

  async getLanguageList(owner: string, repo: string){
    return (await oc.rest.repos.listLanguages({
      owner: owner,
      repo: repo
    })).data
  }

  getMainLanguage(languagelist:{[key: string]: number}) {
    const language = this.findKeyWithMaxValue(languagelist) as string;
    return language
  }

  getMainLanguageColor(languageName: string){
    const defaultColor = '#000000';
    const colors = this.LanguageColors

    let color: string | undefined;
    try {
      color = colors[languageName]?.color;
    } catch (error) {
      console.error('Error accessing color:', error);
    }
    const finalColor = color || defaultColor;
    return finalColor;
  }
}

class GithubAPIUtil {
  private getGithubStars: GithubStarsFetcher;
  private getGithubRepos: GithubReposFetcher;
  private getMianLanguageColor: GetMainLanguageColor;
  constructor() {
    this.getMianLanguageColor = new GetMainLanguageColor;
    this.getGithubStars = new GithubStarsFetcher;
    this.getGithubRepos = new GithubReposFetcher;
  }

  async getStars() {
    return await this.getGithubStars.getStarList();
  }

  async getMianLanguage(owner: string, repo: string){
    return this.getMianLanguageColor.getMainLanguage(await this.getMianLanguageColor.getLanguageList(owner, repo));
  }

  getMainLanguageColor(languageName: string){
    return this.getMianLanguageColor.getMainLanguageColor(languageName);
  }

  // async getMainLanguage(owner: string, repo: string) {
  //   const languages = (await oc.rest.repos.listLanguages({
  //     owner: owner,
  //     repo: repo
  //   })).data;
  //   const language = await this.findKeyWithMaxValue(languages) as string;
  //   return language
  // }
}

export const GithubAPIUtilInstance = new GithubAPIUtil();