<script setup lang="ts">
import StarLarge from '@/icons/star-icons/StarLarge.vue';
import StarMiddle from '@/icons/star-icons/StarMiddle.vue';
import UserIcon1 from '@/icons/user-icons/UserIcon1.vue';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/vue'
import { inject, ref } from 'vue'
import { GithubAPIUtilInstance } from '@/Util/GithubAPIUtil';

const props = defineProps<{
  name: string
  owner: string
}>()

const stared = ref(await GithubAPIUtilInstance.isStarted(props.owner, props.name))

async function starClicked() {
  if (!stared.value)
    await GithubAPIUtilInstance.StarRepo(props.owner, props.name)
  else
    await GithubAPIUtilInstance.unStarRepo(props.owner, props.name)
  stared.value = !stared.value as never
}

const data = await GithubAPIUtilInstance.getRepoData(props.owner, props.name)

const contributors = await GithubAPIUtilInstance.getContributors(props.owner, props.name)

const languageName = await GithubAPIUtilInstance.getMianLanguage(props.owner,props.name)
const finalColor = GithubAPIUtilInstance.getMainLanguageColor(languageName)
</script>

<template>
  <ion-card>
    <ion-card-header>
      <div class="flex flex-row items-center">
        <img :src="data.owner.avatar_url" class="w-[16px] h-[16px] rounded-[4px] mr-2">
        <span class="text-[15px] font-black">{{ data.owner.login }}</span>
        <span class="text-[15px] font-black text-[rgba(60,60,67,0.60)]">/</span>
        <span class="text-[15px] font-black">{{ data.name }}</span>
      </div>
    </ion-card-header>
    <ion-card-content>
      <div class="mb-[12px]">{{ data.description }}</div>
      <div class="flex flex-row items-center">
        <div class="flex flex-col float-left w-full">
          <div class="flex flex-row text-[rgba(60,60,67,0.60)] items-center">
            <span class="mr-1 w-[16px] h-[16px] rounded-full" :style="{
              backgroundColor: finalColor
            }"></span>
            {{ languageName }}
          </div>
          <div class="flex flex-row text-[rgba(60,60,67,0.60)] items-center">
            <UserIcon1 class="mr-1"/>
            {{ contributors.length }}
          </div>
        </div>
        <div class="float-right">
          <StarLarge :clicked="stared" @click="starClicked()"/>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>