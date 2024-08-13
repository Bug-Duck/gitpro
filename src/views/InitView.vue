<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { logoGithub } from 'ionicons/icons'
</script>

<template>
  <div class="w-screen h-screen">
    <div class="mt-[120%] text-center">
      <h1 class="text-6xl">Welcome to GitPro</h1>
      <h1 class="text-3xl text-gray-500">Your Git, Your Way.</h1>
    </div>
    <ion-button expand="block" class="w-[90%] self-center mx-[5%] mt-[20%]">
      <ion-icon :ios="logoGithub" :md="logoGithub" slot="start"></ion-icon>
      Continue with GitHub
    </ion-button>
    <div class="mt-5 text-gray-500 text-center">
      GitPro is a 3rd party client.<br>We are not associated with GitHub.
    </div>
  </div>
</template>