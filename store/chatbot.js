import io from 'socket.io-client'

let socket = null

export const state = () => ({
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
      console.log(message)
      commit('addMessage', message)
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
