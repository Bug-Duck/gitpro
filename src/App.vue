<template>
  <ion-app>
    <Suspense>
      <ion-router-outlet v-if="route.path === '/init'"></ion-router-outlet>
    </Suspense>
    <Suspense>
      <BottomTab v-if="route.path !== '/init'"></BottomTab>
    </Suspense>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import BottomTab from './components/BottomTab.vue'
import { useRoute } from 'vue-router'
import { provide } from 'vue';
import { Octokit } from '@octokit/rest';

//请将token存在src/tocken.ts
import {token} from './token'

const route = useRoute()

provide('oc', new Octokit({
  auth: token
}))
</script>
