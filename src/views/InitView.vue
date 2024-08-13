<script setup lang="ts">
import GitProLogo from '@/icons/GitProLogo.vue';
import InitBackground from '@/icons/InitBackground.vue';
import { IonButton, IonIcon, IonInput, IonPage } from '@ionic/vue'
import { logoGithub } from 'ionicons/icons'
import { ref } from 'vue';

const next = ref(false)

function click() {
  setTimeout(() => {
    next.value = true
  }, 500)
}
</script>

<template>
  <ion-page>
    <InitBackground class="fixed w-full" />
    <div class="flex flex-col justify-end items-center h-full w-full z-50 p-4">
      <GitProLogo class="w-[108px] h-[108px] mb-8" />
      <div class="text-center mb-8">
        <h1 class="text-6xl font-black">Welcome to GitPro</h1>
        <h1 class="text-3xl font-black text-gray-500">Your Git, Your Way.</h1>
      </div>

      <ion-button expand="block" class="w-full max-w-md mx-auto next" @click="click()" v-if="!next">
        <ion-icon :ios="logoGithub" :md="logoGithub" slot="start"></ion-icon>
        Continue with GitHub
      </ion-button>
      <ion-input class="w-full max-w-md mx-auto border rounded-lg up mt-4" placeholder="Your Token"
        v-if="next"></ion-input>
      <div class="mt-2 text-gray-500 text-center">
        GitPro is a 3rd party client.<br>We are not associated with GitHub.
      </div>
    </div>
  </ion-page>
</template>



<style>
@keyframes slideOutLeft {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.next:focus {
  animation: slideOutLeft 0.5s ease-out;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.next {
  animation: fadeIn 0.5s ease-out;
  animation-fill-mode: forwards;
}
</style>
