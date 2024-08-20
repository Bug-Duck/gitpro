<script setup lang="ts">
import { Octokit } from '@octokit/core';
import { inject } from 'vue';
import RepoCard2 from './RepoCard2.vue';

const oc = inject('oc') as Octokit

var card2Box: {
  owner: string,
  repo: string
}[] = []
const resp = (await oc.request('GET /user/starred', {
  headers: {
    'Accept': 'application/vnd.github.v3.star+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
}))
const items = resp.data
items.forEach(function (e: any) {
  if (e.starred_at == undefined) {
    return;
  }
  let nowTime = Date.now();
  let dataTime = new Date(e.starred_at).getTime()
  const timeDiff = nowTime - dataTime;
  if (timeDiff <= 30 * 24 * 60 * 60 * 1000) {
    // 报错是正常的
    let tmp = e.repo.full_name.split("/");
    card2Box.push({
      owner: tmp[0],
      repo: tmp[1]
    })
  }
})

</script>
<template>
  <div class="overflow-y-scroll overscroll-contain" style="scrollbar-width: none;">
    <Suspense v-for="card in card2Box">
      <RepoCard2 :owner="card.owner" :name="card.repo" />
    </Suspense>
  </div>
</template>