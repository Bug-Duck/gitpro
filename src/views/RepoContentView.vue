<script setup lang="ts">
import { Octokit } from '@octokit/rest'
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router';
import { IonPage, IonCard, IonCardContent, IonContent } from '@ionic/vue';
import { GithubAPIUtilInstance } from '@/Util/GithubAPIUtil';

import StarLarge from '@/icons/star-icons/StarLarge.vue';

const route = useRoute()

const oc = inject('oc') as Octokit

const { data } = await oc.rest.repos.get({ owner: route.params.owner as string, repo: route.params.name as string })
const languageName = await GithubAPIUtilInstance.getMianLanguage(route.params.owner as string,route.params.name as string)
const finalColor = GithubAPIUtilInstance.getMainLanguageColor(languageName)

console.log(route.params.owner as string, route.params.name as string)
const stared = ref(await GithubAPIUtilInstance.isStarted(route.params.owner as string, route.params.name as string))
async function starClicked() {
  if (!stared.value)
    await GithubAPIUtilInstance.StarRepo(route.params.owner as string,route.params.name as string)
  else
    await GithubAPIUtilInstance.unStarRepo(route.params.owner as string,route.params.name as string)
  stared.value = !stared.value as never
}
</script>

<template>
  <ion-page>
    <div class="my-[16px]" @click="router.go(-1)">
      <div class="flex flex-row items-center mb-[17px]">
        <svg width="10" height="20" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-[16px]">
          <path d="M7 1L1 7L7 13" stroke="#007AFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <!-- <span class="ml-[8px] text-[#007AFF]">Search</span> -->
      </div>
    </div>
    <ion-content>
      <div class="mx-[16px] my-[12px] mt-0">
        <div class="float-left">
          <div class="m-[0.5px] flex flex-row items-center">
            <img class="border-[3px] rounded-[12px] border-gray mr-[12px] w-[42px] h-[42px]"
              :src="data.owner.avatar_url">
            <div class="flex flex-col">
              <div class="text-[14px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">{{ data.owner.login}}/</div>
              <div class="text-[24px] font-black dark:text-[#cccccc] items-center mt-0">{{ data.name }}</div>
            </div>
            <StarLarge :clicked='stared' @click="starClicked()" />
          </div>
          <div class="text-[20px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">{{ data.description}}</div>
          <div class="flex flex-row items-center">
            <span class="mr-1 w-[16px] h-[16px] rounded-full" :style="{
              backgroundColor: finalColor
            }"></span>
            <div class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">{{ data.language}}</div>
          </div>
          <div class="flex flex-row items-center">
            <div class="basis-1/3">
              <div class="text-[15px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">{{ data.stargazers_count}} stars</div>
              
            </div>
            <div class="basis-1/3">
              <div class="text-150px] text-[rgba(60,60,67,0.60)] dark:text-[#cccccc] font-black pb-0 mb-0 items-center">{{ data.forks_count}} forks</div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-[16px]">
        <ion-card class="h-[160px] flex" style="width: calc(100% - 32px)">
          <ion-card-content class="flex flex-col">
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>
