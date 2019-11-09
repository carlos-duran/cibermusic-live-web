<template>
  <div>
    <ChatbotLogo @click.native="isWindowVisible = !isWindowVisible" />
    <ChatbotWindow v-if="isWindowVisible" @close="isWindowVisible = false" />
  </div>
</template>

<script>
import ChatbotLogo from './chatbot/ChatbotLogo'
import ChatbotWindow from './chatbot/ChatbotWindow'

export default {
  components: {
    ChatbotLogo,
    ChatbotWindow
  },
  data() {
    return {
      isWindowVisible: false
    }
  }
}
</script>

<style scoped>
.chatbot-enter-active,
.chatbot-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.chatbot-enter,
.chatbot-leave-active {
  opacity: 0;
  transform: scale(0.92);
}
</style>
