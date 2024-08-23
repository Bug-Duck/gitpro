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
    };
  }
}

class GithubReposFetcher {
  async getRepos(): Promise<{ owner: string, repo: string }[]> {
    const response = await this.getData();
    if (response.status === 200) {
      console.info('get GithubRepos ok');
      const items = response.data;
      const recentRepos = items.filter((item: any)=>{
        return item.fork === false
        // return true
      }).map((item: any) => {
        const [owner, repo] = item.full_name.split('/');
        return { owner, repo };
      });
      return recentRepos;
    }else {
      throw new GithubHttpException(response.status, 'Failed to fetch stars');
    }
  }
  
  async getData() {
    const OcResp = await oc.request('GET /user/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3.star+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'authorization': `${token}`
      }
    });
    return {
      data: OcResp.data,
      status: OcResp.status,
    }
  }
}

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

class GithubStar{
  async isStarted(owner: string, repo: string){
    return (await oc.rest.activity.checkRepoIsStarredByAuthenticatedUser({
      owner: owner,
      repo: repo,
    })).data
  }

  async StarRepo(owner: string, repo: string){
    return (await oc.rest.activity.starRepoForAuthenticatedUser({
      owner: owner,
      repo: repo,
    }))
  }

  async unStarRepo(owner: string, repo: string){
    return (await oc.rest.activity.unstarRepoForAuthenticatedUser({
      owner: owner,
      repo: repo,
    }))
  }
}

class GithubRepo{
  async getContributors(owner: string, repo: string){
    return (await oc.rest.repos.listContributors({
      owner: owner,
      repo: repo
    })).data
  }

  async getRepoData(owner: string, repo: string){
    return (await oc.rest.repos.get({
      owner: owner,
      repo: repo
    })).data
  }

  async ListBranches(owner: string, repo: string){
    const OcResp = await oc.request(`GET /repos/${owner}/${repo}/branches`, {
      headers: {
        'Accept': 'application/vnd.github.v3.star+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return {
      data: OcResp.data,
      status: OcResp.status,
    };
  }

  async ListTags(owner: string, repo: string){
    const OcResp = await oc.request(`GET /repos/${owner}/${repo}/git/refs/tags`, {
      headers: {
        'Accept': 'application/vnd.github.v3.star+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return {
      data: OcResp.data,
      status: OcResp.status,
    };
  }

  BranchesCount(owner: string, repo: string){
    return (async () => {
      const branches = await this.ListBranches(owner, repo);
      return branches.data.length;
    })();
  }

  tagsCount(owner: string, repo: string){
    return (async () => {
      const branches = await this.ListTags(owner, repo);
      return branches.data.length;
    })();
  }
}

class GithubAPIUtil {
  private getGithubStars: GithubStarsFetcher;
  private getGithubRepos: GithubReposFetcher;
  private getMianLanguageColor: GetMainLanguageColor;
  private githubStar: GithubStar;
  private githubRepo: GithubRepo;
  constructor() {
    this.getMianLanguageColor = new GetMainLanguageColor;
    this.getGithubStars = new GithubStarsFetcher;
    this.getGithubRepos = new GithubReposFetcher;
    this.githubStar = new GithubStar;
    this.githubRepo = new GithubRepo;
  }

  async getStars() {
    return await this.getGithubStars.getStarList();
  }

  async getRepos() {
    return await this.getGithubRepos.getRepos();
  }

  async getMianLanguage(owner: string, repo: string){
    return this.getMianLanguageColor.getMainLanguage(await this.getMianLanguageColor.getLanguageList(owner, repo));
  }

  getMainLanguageColor(languageName: string){
    return this.getMianLanguageColor.getMainLanguageColor(languageName);
  }

  isStarted(owner: string, repo: string){
    return this.githubStar.isStarted(owner, repo);
  }

  async StarRepo(owner: string, repo: string){
    return this.githubStar.StarRepo(owner, repo);
  }

  async unStarRepo(owner: string, repo: string){
    return this.githubStar.unStarRepo(owner, repo);
  }

  async getContributors(owner: string, repo: string){
    return this.githubRepo.getContributors(owner, repo);
  }

  async getRepoData(owner: string, repo: string){
    return this.githubRepo.getRepoData(owner, repo);
  }

  numberProcessing(number: number){
    switch (true) {
      case number < 1000:
        return number;
      case number < 1000000:
        return (number / 1000).toFixed(1) + 'K';
      default:
        return (number / 1000000).toFixed(1) + 'M';
    }
  }

  async BranchesCount(owner: string, repo: string){
    return this.githubRepo.BranchesCount(owner, repo);
  }

  async tagsCount(owner: string, repo: string){
    return this.githubRepo.tagsCount(owner, repo);
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
