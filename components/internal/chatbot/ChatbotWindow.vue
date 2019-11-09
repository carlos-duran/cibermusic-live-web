<template>
  <div class="window max-w-sm w-full fixed bottom-0 right-0 border">
    <div class="chatbot-icon absolute bg-white rounded-full overflow-hidden">
      <img class="w-20 h-20" src="/images/chatbot/bot.svg" alt="Chatbot" />
    </div>
    <div class="chatbot-close-icon absolute right-0 top-0">
      <button
        type="button"
        class="flex p-2 items-center focus:outline-none"
        @click="$emit('close')"
      >
        <icon name="close" class="w-4 h-4" />
      </button>
    </div>
    <div class="w-full h-full text-black flex flex-col scroll-light">
      <div
        ref="messages"
        class="flex-1 min-h-0 min-w-0 overflow-y-auto p-4 bg-gray-200 bg-chat bg-center"
      >
        <div class="pt-8">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="mb-3"
            :class="{ 'text-right': msg.author === 'user' }"
          >
            <div
              class="inline-block p-2 rounded"
              :class="
                msg.author === 'bot' ? 'bg-primary text-white' : 'bg-white'
              "
            >
              {{ msg.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex-none">
        <input
          v-model="message.text"
          class="h-12 w-full px-4 focus:outline-none"
          placeholder="Escriba aquí..."
          @keyup.enter="addMessage(message)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: newMessage(),
      messages: [
        {
          author: 'bot',
          text: 'Hola, ¿en qué puedo ayudarte?'
        },
        {
          author: 'user',
          text: 'Estoy triste.'
        },
        {
          author: 'bot',
          text: 'No estés triste.'
        },
        {
          author: 'user',
          text: 'Gracias, no lo pensé.'
        },
        {
          author: 'bot',
          text: 'De nada, vuelve pronto'
        },
        {
          author: 'user',
          text: 'Sí, volveré.'
        },
        {
          author: 'bot',
          text: 'Me alegra saber eso, ¡aquí estaré!'
        }
      ]
    }
  },
  methods: {
    async addMessage(message) {
      this.messages.push(message)
      this.message = newMessage()
      await this.$nextTick()
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    }
  }
}

function newMessage() {
  return {
    author: 'user',
    text: ''
  }
}
</script>

<style scoped>
.window {
  height: 45vh;
  border-top-left-radius: 5px;
}

.chatbot-icon {
  left: 50%;
  transform: translate(-50%, -50%);
}

.chatbot-close-icon {
  transform: translate(0, -100%);
}

.bg-chat {
  border-top-left-radius: 5px;
  background-image: url('/images/chatbot/bg.png');
}
</style>
