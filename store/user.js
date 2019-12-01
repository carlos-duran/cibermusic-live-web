export const state = () => ({
  playlists: []
})

export const mutations = {
  setPlaylists(state, playlists) {
    state.playlists = playlists
  }
}

export const actions = {
  async loadPlaylists({ commit }) {
    const playlists = await this.$axios.$get('/playlists')
    commit('setPlaylists', playlists)
  },
  async createPlaylist({ dispatch }, newPlaylist) {
    const playlist = await this.$axios.$post('/playlists', newPlaylist)
    await dispatch('loadPlaylists')
    return playlist
  },
  async addTrackToPlaylist({ dispatch }, { playlist, track }) {
    const result = await this.$axios.$post(`/playlists/${playlist}/song`, track)
    if (result.ok) {
      await dispatch('loadPlaylists')
    }
  }
}
