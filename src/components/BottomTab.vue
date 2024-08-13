<script lang="ts" setup>
import { IonTabs, IonTabBar, IonTabButton, IonRouterOutlet, IonIcon, IonLabel } from '@ionic/vue'
</script>

<template>
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home" href="/home">
        <ion-icon />
        <ion-label>Today</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="radio" href="/radio">
        <ion-icon />
        <ion-label>Discover</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="library" href="/repo">
        <ion-icon />
        <ion-label>Repo</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="search" href="/search">
        <ion-icon />
        <ion-label>Profile</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>