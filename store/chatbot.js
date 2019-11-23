import io from 'socket.io-client'

let socket = null

export const state = () => ({
  messages: []
})

export const mutations = {
  addMessage(state, message) {
    state.messages.push(message)
  }
}

export const actions = {
  connect({ commit }) {
    socket = io(process.env.API_URL)
    socket.on('chat', (message) => {
      commit('addMessage', message)
      doMessageAction.call(this, message)
    })
  },

  disconnect() {
    socket.disconnect()
    socket = null
  },

  sendMessage({ commit }, message) {
    socket.emit('chat', message)
    commit('addMessage', message)
  }
}

function doMessageAction(message) {
  if (message.action) {
    switch (message.action.name) {
      case 'navigate':
        this.$router.push(message.action.value)
        break
      default:
        break
    }
  }
}