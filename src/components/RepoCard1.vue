<script setup lang="ts">
import { GithubAPIUtilInstance } from '@/Util/GithubAPIUtil';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle } from '@ionic/vue'
import { Octokit } from '@octokit/rest'
import { inject } from 'vue'

const oc = inject('oc') as Octokit

const props = defineProps<{
  name: string
  owner: string
}>()

const data =await GithubAPIUtilInstance.getRepoData(props.owner, props.name)

const graphql = oc.graphql.defaults({})
const result = await graphql(`{
  repository(owner: "${data.owner.login}", name: "${data.name}") {
    openGraphImageUrl
  }
}`)
console.log(result)

</script>

<template>
  <ion-card class="rounded-lg">
    <img :src="(result as any).repository.openGraphImageUrl" alt="Card Image">
    <ion-card-header>
      <div class="flex flex-row text-xl">
        <img :src="data.owner.avatar_url" class="w-6 h-6 rounded-lg mr-2">
        <span class="font-black">{{ data.owner.login }}</span>/<span class="font-black">{{ data.name }}</span>
      </div>
    </ion-card-header>
    <ion-card-content class="font-black mr-10">
      {{ data.description }}
    </ion-card-content>
  </ion-card>
</template>