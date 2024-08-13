<script setup lang="ts">
import { IonTitle, IonHeader, IonContent, IonSearchbar, IonButton, IonIcon } from '@ionic/vue'
import RepoCard from '@/components/RepoCard.vue'
import { arrowForward } from 'ionicons/icons';
</script>

<template>
  <ion-header class="mt-3 flex flex-row border-b">
    <ion-title size="large">Repository</ion-title>
  </ion-header>
  <ion-content>
    <div class="text-2xl pl-3 font-black mt-5">TRENDING NOW</div>
    <div class="relative h-[600px] scale-[0.7]">
      <Suspense>
        <RepoCard owner="dromara" name="newcar" class="rotate-[-15deg] translate-x-[-40px] absolute top-0 left-0 z-10" />
      </Suspense>
      <Suspense>
        <RepoCard owner="dromara" name="newcar" class="rotate-[-5deg] translate-x-[20px] translate-y-[-40px] absolute top-0 left-0 z-20" />
      </Suspense>
      <Suspense>
        <RepoCard owner="dromara" name="newcar" class="rotate-[5deg] translate-x-[80px] translate-y-[40px] absolute top-0 left-0 z-30" />
      </Suspense>
      <div class="absolute mt-[500px] w-full">
        <ion-button color="medium" expand="block" shape="round" class="flex w-[40%] self-baseline ml-[30%] font-black">
          <ion-icon :icon="arrowForward" slot="end"></ion-icon>
          Explore All
        </ion-button>
      </div>
    </div>
    <div class="border-t">
      <div class="pl-3 font-black text-gray-500 text-2xl mt-5">SEARCH REPO</div>
      <ion-searchbar placeholder="What's you are looking for?"></ion-searchbar>
    </div>
  </ion-content>
</template>
