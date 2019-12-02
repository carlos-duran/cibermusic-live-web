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
  if (message.actions) {
    for (const action of message.actions) {
      switch (action.name) {
        case 'navigate':
          this.$router.push(action.value)
          break
        case 'search-play':
          this.$router.push({
            path: '/search',
            query: {
              q: action.value,
              play: true,
              hash: Math.round(Math.random() * 100)
            }
          })

          break
        default:
          break
      }
    }
  }
}
