<script lang="ts" setup>
import TodayIcon from '@/icons/TodayIcon.vue'
import TodayIconSelected from '@/icons/TodayIconSelected.vue'
import RepoIcon from '@/icons/RepoIcon.vue'
import RepoIconSelected from '@/icons/RepoIconSelected.vue'
import { IonTabs, IonTabBar, IonTabButton, IonRouterOutlet, IonIcon, IonLabel } from '@ionic/vue'
import { useRoute } from 'vue-router'
import DiscoverIcon from '@/icons/DiscoverIcon.vue'
import ProfileIcon from '@/icons/ProfileIcon.vue'
import ProfileIconSelected from '@/icons/ProfileIconSelected.vue'

const route = useRoute()
</script>

<template>
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="today" href="/today">
        <TodayIcon v-if="route.path !== '/today'"/>
        <TodayIconSelected v-if="route.path === '/today'"/>
      </ion-tab-button>

      <ion-tab-button tab="discover" href="/discover">
        <DiscoverIcon v-if="route.path !== '/discover'"/>
        <DiscoverIcon v-if="route.path === '/discover'"/>
      </ion-tab-button>

      <ion-tab-button tab="repo" href="/repo">
        <RepoIcon v-if="route.path !== '/repo'"/>
        <RepoIconSelected v-if="route.path === '/repo'"/>
      </ion-tab-button>

      <ion-tab-button tab="profile" href="/profile">
        <ProfileIcon v-if="route.path !== '/profile'"/>
        <ProfileIconSelected v-if="route.path === '/profile'"/>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>