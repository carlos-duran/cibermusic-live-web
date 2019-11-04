export const state = () => ({
  topTracks: [],
  topPlaylists: [],
  selectedPlaylists: []
})

export const mutations = {
  setSelected(state, { topTracks, topPlaylists, selectedPlaylists }) {
    state.topTracks = topTracks
    state.topPlaylists = topPlaylists
    state.selectedPlaylists = selectedPlaylists
  }
}

export const actions = {
  async loadSelected({ commit }) {
    const homeMusic = await this.$axios.$get('/home-music')
    commit('setSelected', homeMusic)
  }
}
