<template>
  <div class="notification_block">
    <transition-group name="notification" tag="div">
      <div v-for="(notification, index) in notifications"
           :key="index"
           class="notification"
           :style="{'background-color': notification.color }"
      >{{notification.text}}</div>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "Notification",
    computed: {
      ...mapGetters("notifications", ["notifications"]),

    }
  }
</script>

<style scoped lang="scss">

  .notification-enter-active {
    animation: opacity 4s;
  }
  .notification-enter {
  }

  .notification-enter-to {
  }

  @keyframes opacity {
    from {
      margin-top: 50px;

    }
    20% {
      margin-top: 10px;
    }
    25% {
      margin-top: 25px;
    }
    30% {
      margin-top: 20px;
      opacity: 1;
    }
    to {
      margin-top: 20px;
      opacity: 0;
    }
  }

  .notification_block {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
  }

  .notification {
    opacity: 0;
    margin: 20px;
    padding: 20px;
    background-color: rgba(red, 0.3);
    border-radius: 10px;
    color: #fff;
  }

</style>