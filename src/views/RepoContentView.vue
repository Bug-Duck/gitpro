<script setup lang="ts">
import { Octokit } from '@octokit/rest'
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { IonPage, IonCard, IonCardContent, IonContent } from '@ionic/vue';

const route = useRoute()

const oc = inject('oc') as Octokit

const { data } = await oc.rest.repos.get({ owner: route.params.owner as string, repo: route.params.name as string })
</script>

<template>
  <ion-page>
    <div class="my-[16px]">
      <div class="flex flex-row items-center mb-[17px]">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-[16px]">
          <path d="M7 1L1 7L7 13" stroke="#007AFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="ml-[8px] text-[#007AFF]">Search</span>
      </div>
    </div>
    <ion-content>
      <div class="mx-[16px] my-[12px] mt-0">
        <div class="float-left">
          <div class="m-[0.5px] flex flex-row items-center">
            <img class="border-[3px] rounded-[12px] border-gray mr-[12px] w-[42px] h-[42px]"
              :src="data.owner.avatar_url">
            <div class="flex flex-col">
              <div class="text-[14px] text-[rgba(60,60,67,0.60)] font-black pb-0 mb-0 items-center">{{ data.owner.login
                }}/
              </div>
              <div class="text-[24px] font-black items-center mt-0">{{ data.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-[16px]">
        <ion-card class="h-[160px] flex" style="width: calc(100% - 32px)"></ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>
