export const state = () => ({
  audio: null,
  queue: [],
  playing: false,
  pos: -1,
  muted: false
})

export const mutations = {
  audioLoad(state) {
    if (state.audio) {
      state.audio.pause()
    }
    if (state.queue.length && state.pos > -1) {
      const track = state.queue[state.pos]
      if (!state.audio) {
        state.audio = new Audio(track.preview)
      } else {
        state.audio.src = track.preview
      }
      state.audio.load()
    }
  },

  audioPlay(state, value) {
    if (value) {
      state.audio.play()
    } else {
      state.audio.pause()
    }
  },

  setPlaying(state, value) {
    state.playing = value
  },

  setQueue(state, queue) {
    state.queue = queue
  },

  setPos(state, pos) {
    state.pos = pos
  },

  addToQueue(state, track) {
    state.queue.push(track)
  },

  removeFromQueue(state, trackId) {
    state.queue = state.queue.filter((t) => t.id === trackId)
  },

  setMuted(state, value) {
    state.audio.muted = value
    state.muted = value
  }
}

export const getters = {
  currentTrack(state) {
    return state.queue.length && state.queue[state.pos]
  }
}

export const actions = {
  loadFull({ commit, state }, { queue, pos }) {
    commit('setQueue', queue)
    commit('setPos', pos)
    commit('audioLoad')
    state.audio.onpause = () => {
      commit('setPlaying', false)
    }
  },

  loadFullAndPlay({ dispatch }, payload) {
    dispatch('loadFull', payload)
    dispatch('play')
  },

  loadTrack({ commit, state }, pos) {
    commit('setPos', pos)
    commit('audioLoad')
    state.audio.onpause = () => {
      commit('setPlaying', false)
    }
  },

  play({ commit }) {
    commit('setPlaying', true)
    commit('audioPlay', true)
  },

  pause({ commit }) {
    commit('setPlaying', false)
    commit('audioPlay', false)
  },

  next({ state, dispatch }) {
    if (state.pos < state.queue.length - 1) {
      dispatch('loadTrack', state.pos + 1)
      dispatch('play')
    }
  },

  previous({ state, dispatch }) {
    if (state.pos > 0) {
      dispatch('loadTrack', state.pos - 1)
      dispatch('play')
    }
  }
}
