<template>
  <div class="loader">
    <div class="blob blob-0"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
    <div class="blob blob-5"></div>
  </div>
</template>

<style scoped>
.loader {
  /* background-color: rgba(0, 0, 0, .4); */
  z-index: 9999;
  cursor: wait
}

.loader .blob {
  width: 2rem;
  height: 2rem;
  /* 可替换主题色 */
  background: rgba(255, 100, 0, 0.07);
  border-radius: 50%;
  box-shadow: 0 0 .5rem hsla(0, 0%, 100%, .2)
}

.loader .blob {
  position: absolute;
  left: calc(50% - 1rem);
  top: calc(50% - 1rem)
}

.loader .blob-2 {
  animation: animate-to-2 1.5s infinite
}

.loader .blob-3 {
  animation: animate-to-3 1.5s infinite
}

.loader .blob-1 {
  animation: animate-to-1 1.5s infinite
}

.loader .blob-4 {
  animation: animate-to-4 1.5s infinite
}

.loader .blob-0 {
  animation: animate-to-0 1.5s infinite
}

.loader .blob-5 {
  animation: animate-to-5 1.5s infinite
}

@keyframes animate-to-2 {

  25%,
  75% {
    transform: translateX(-1.5rem) scale(.75)
  }

  95% {
    transform: translateX(0) scale(1)
  }
}

@keyframes animate-to-3 {

  25%,
  75% {
    transform: translateX(1.5rem) scale(.75)
  }

  95% {
    transform: translateX(0) scale(1)
  }
}

@keyframes animate-to-1 {
  25% {
    transform: translateX(-1.5rem) scale(.75)
  }

  50%,
  75% {
    transform: translateX(-4.5rem) scale(.6)
  }

  95% {
    transform: translateX(0) scale(1)
  }
}

@keyframes animate-to-4 {
  25% {
    transform: translateX(1.5rem) scale(.75)
  }

  50%,
  75% {
    transform: translateX(4.5rem) scale(.6)
  }

  95% {
    transform: translateX(0) scale(1)
  }
}

@keyframes animate-to-0 {
  25% {
    transform: translateX(-1.5rem) scale(.75)
  }

  50% {
    transform: translateX(-4.5rem) scale(.6)
  }

  75% {
    transform: translateX(-7.5rem) scale(.5)
  }

  95% {
    transform: translateX(0) scale(1)
  }
}

@keyframes animate-to-5 {
  25% {
    transform: translateX(1.5rem) scale(.75)
  }

  50% {
    transform: translateX(4.5rem) scale(.6)
  }

  75% {
    transform: translateX(7.5rem) scale(.5)
  }

  95% {
    transform: translateX(0) scale(1)
  }
}
</style>
