<script setup lang="ts">
import { Octokit } from '@octokit/rest'
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router';
import NoticeIcon from '@/icons/NoticeIcon.vue';
import SearchIcon from '@/icons/SearchIcon.vue';
import { IonPage, IonCard, IonCardContent, IonContent } from '@ionic/vue';
import { GithubAPIUtilInstance } from '@/Util/GithubAPIUtil';

import StarLarge from '@/icons/star-icons/StarLarge.vue';

const route = useRoute()

const oc = inject('oc') as Octokit

const { data } = await oc.rest.repos.get({ owner: route.params.owner as string, repo: route.params.name as string })
const languageName = await GithubAPIUtilInstance.getMianLanguage(route.params.owner as string, route.params.name as string)
const finalColor = GithubAPIUtilInstance.getMainLanguageColor(languageName)
const branchesCount = await GithubAPIUtilInstance.BranchesCount(route.params.owner as string, route.params.name as string)
const tagsCount = await GithubAPIUtilInstance.tagsCount(route.params.owner as string, route.params.name as string)
console.log(route.params.owner as string, route.params.name as string)
const stared = ref(await GithubAPIUtilInstance.isStarted(route.params.owner as string, route.params.name as string))
async function starClicked() {
  if (!stared.value)
    await GithubAPIUtilInstance.StarRepo(route.params.owner as string, route.params.name as string)
  else
    await GithubAPIUtilInstance.unStarRepo(route.params.owner as string, route.params.name as string)
  stared.value = !stared.value as never
}
function ActivityStatus() {
  if (data.archived == false)
    return "Active"
  else
    return "Archived"
}
const activityStatus = ActivityStatus()
</script>

<template>
  <ion-page>
    <div class="mt-[20px]" @click="router.go(-1)">
      <div class="flex flex-row items-center mb-[0px] px-3">
        <svg width="10" height="20" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-[16px]">
          <path d="M7 1L1 7L7 13" stroke="#007AFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="ml-[8px] mt-[4px] font-medium text-[#007AFF]">back</span>
      </div>
    </div>
    <div class="mx-[16px] mb-[12px] mt-0">
      <div class="float-left">
        <div class="m-[0.5px] flex flex-row items-center">
          <img class="border-[3px] rounded-[12px] border-gray mr-[12px] w-[42px] h-[42px]" :src="data.owner.avatar_url">
          <div class="flex flex-col">
            <div class="text-[14px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">{{
              data.owner.login}}/</div>
            <div class="text-[24px] font-black dark:text-[#cccccc] items-center mt-0">{{ data.name }}</div>
          </div>
          <NoticeIcon class="float-right mt-7 mr-6 fill-black dark:fill-[#cccccc]"/>
          <SearchIcon class="float-right mt-7 mr-6"/>
          <!-- <StarLarge :clicked='stared' @click="starClicked()" /> -->
        </div>
      </div>
    </div>

    <ion-content>
      <div class="my-3">
        <ion-card class="flex flex-col gap-3 my-3" style="width: calc(100% - 32px)">
          <ion-card-content class="flex flex-col">
            <div class="flex flex-row items-center">
              <span class="mr-1 w-[16px] h-[16px] rounded-full" :style="{
              backgroundColor: finalColor
              }"></span>
            <div class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">{{
            data.language}}</div>
        </div>
            <div class="text-auto font-medium text-black dark:text-[#cccccc] pb-0 mb-0 items-center">{{
              data.description}}</div>
            <div class="grid grid-rows-2 gap-2">
              <div class="grid grid-cols-3 gap-3">
                <div class="">
                  <div
                    class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">
                    {{ GithubAPIUtilInstance.numberProcessing(data.forks_count) }} forks</div>
                </div>
                <div class="">
                  <div
                    class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">
                    {{ GithubAPIUtilInstance.numberProcessing(data.stargazers_count) }} stars</div>
                </div>
                <div class="">
                  <div
                    class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">
                    {{ GithubAPIUtilInstance.numberProcessing(data.subscribers_count) }} watching</div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="">
                  <div
                    class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">
                    {{ GithubAPIUtilInstance.numberProcessing(branchesCount)}} Branch</div>
                </div>
                <div class="">
                  <div
                    class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">
                    {{ GithubAPIUtilInstance.numberProcessing(tagsCount) }} Tags</div>
                </div>
                <div class="">
                  <div
                    class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">
                   {{ activityStatus }} </div>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>
