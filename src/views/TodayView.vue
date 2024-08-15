<script setup lang="ts">
import RepoCard2Box from '@/components/RepoCard2Box.vue';
import Loader from '@/components/Loader.vue';
import NoticeIcon from '@/icons/NoticeIcon.vue';
import SearchIcon from '@/icons/SearchIcon.vue';
import { IonHeader, IonContent, IonPage, IonTitle, IonButton, IonItemSliding } from '@ionic/vue'
import { ref } from 'vue';

const tabs = ref([
  'Repo',
  'User',
  'Commit',
  'Event',
  'Organization'
])

const currentTab = ref('Repo')
</script>

<template>
  <ion-page>
    <header class="mt-3 ml-3 w-full">
      <h1 class="text-3xl font-black float-left">Today</h1>
      <NoticeIcon class="float-right mt-7 mr-6" />
      <SearchIcon class="float-right mt-7 mr-6" />
    </header>
    <ion-content>
      <div class="flex flex-row py-5 overflow-x-scroll">
        <button v-for="item in tabs" class="mx-[12px] py-[8px] px-[12px] text-[16px] font-black rounded-full" :class="{
          'bg-[rgba(0,0,0,1)]': currentTab === item,
          'text-white': currentTab === item,
          'shadow-[rgba(0,0,0,0.16)]': currentTab === item,
          'shadow-md': currentTab === item,
        }" @click="currentTab = item">{{ item }}</button>
      </div>
      <Suspense>
        <RepoCard2Box/>
          <template #fallback>
            <Loader/>
          </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>
