<template>
  <div class="preloader"></div>
</template>

<script>
  export default {
    name: "Preloader"
  }
</script>

<style scoped lang="scss">
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: 2;
    background-color: rgba(#519839, 0.5);
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 5px;
      background-color: #519839;
      animation: move ease infinite 1s;
    }
  }
  @keyframes move {
    from {
      width: 0;
      margin-right: 100%;
    }
    50% {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
    }
    to {
      width: 0;
      margin-left: 100%;
    }
  }
</style>