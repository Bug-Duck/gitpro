<script setup lang="ts">
import RepoCard2 from './RepoCard2.vue';
import { GithubAPIUtilInstance } from '@/Util/GithubAPIUtil';

const items = await GithubAPIUtilInstance.getStars()

</script>
<template>
  <div class="overflow-y-scroll overscroll-contain" style="scrollbar-width: none;">
    <Suspense v-for="card in items">
      <RepoCard2 :owner="card.owner" :name="card.repo" />
    </Suspense>
  </div>
</template>