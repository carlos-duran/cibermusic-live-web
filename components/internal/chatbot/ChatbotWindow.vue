<template>
  <div class="chatbot-wrapper md:max-w-sm w-full fixed bottom-0 right-0">
    <div class="chatbot-icon absolute bg-white rounded-full overflow-hidden">
      <img class="w-20 h-20" src="/images/chatbot/bot.svg" alt="Chatbot" />
    </div>
    <div class="chatbot-close-icon absolute right-0 top-0 text-white">
      <button
        type="button"
        class="flex p-2 items-center focus:outline-none cursour-pointer"
        @click="$emit('close')"
      >
        <icon name="close" class="w-4 h-4" />
      </button>
    </div>
    <div class="chatbot-messages w-full h-full flex flex-col scroll-light">
      <div ref="messages" class="flex-1 min-h-0 min-w-0 overflow-y-auto p-4">
        <div class="pt-8">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="mb-3"
            :class="{ 'text-right': msg.author === 'user' }"
          >
            <div
              class="max-w-4/5 inline-block p-2 rounded"
              :class="
                msg.author === 'bot' ? 'bg-primary text-white' : 'bg-white'
              "
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="anchorify(msg.text)"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-none">
        <input
          v-model="message.text"
          class="h-12 w-full px-4 focus:outline-none"
          placeholder="Escriba aquí..."
          @keyup.enter="submitMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import anchorme from 'anchorme'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      message: newMessage()
    }
  },
  computed: {
    ...mapState('chatbot', ['messages'])
  },
  watch: {
    messages: {
      handler: 'scrollToBottom',
      immediate: true
    }
  },
  methods: {
    ...mapActions('chatbot', ['sendMessage']),
    submitMessage() {
      this.sendMessage(this.message)
      this.message = newMessage()
    },
    async scrollToBottom() {
      await this.$nextTick()
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    },
    anchorify(text) {
      return anchorme(text, { files: false })
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

<style>
.chatbot-messages a {
  text-decoration: underline;
}
</style>

<style lang="postcss" scoped>
.chatbot-wrapper {
  height: 70vh;
}

.chatbot-icon {
  left: 50%;
  transform: translate(-50%, -50%);
}

.chatbot-close-icon {
  transform: translate(0, -100%);
}

.chatbot-messages {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-image: url('/images/chatbot/bg.png');
  @apply bg-gray-200 bg-center border text-black;
}

.max-w-4\/5 {
  max-width: 80%;
}

@screen md {
  .chatbot-wrapper {
    height: 45vh;
    min-height: 400px;
  }

  .chatbot-messages {
    border-radius: 0;
    border-top-left-radius: 5px;
  }
}
</style>
