<script setup lang="ts">
import { IonButton, IonIcon, IonInput } from '@ionic/vue'
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
  <div class="w-screen h-screen">
    <div class="mt-[120%] text-center">
      <h1 class="text-6xl">Welcome to GitPro</h1>
      <h1 class="text-3xl text-gray-500">Your Git, Your Way.</h1>
    </div>
    <ion-button expand="block" class="w-[90%] self-center mx-[5%] mt-[20%] next" @click="click()" v-if="!next">
      <ion-icon :ios="logoGithub" :md="logoGithub" slot="start"></ion-icon>
      Continue with GitHub
    </ion-button>
    <ion-input class="w-[90%] self-center mx-[5%] mt-[20%] border rounded-lg" placeholder="You Token" v-if="next"></ion-input>
    <div class="mt-5 text-gray-500 text-center">
      GitPro is a 3rd party client.<br>We are not associated with GitHub.
    </div>
  </div>
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
