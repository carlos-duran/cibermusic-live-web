export const state = () => ({
  selectedPlaylists: [],
  selectedArtists: [],
  selectedTop: []
})

export const mutations = {
  setSelected(state, { selectedPlaylists, selectedArtists, selectedTop }) {
    state.selectedPlaylists = selectedPlaylists
    state.selectedArtists = selectedArtists
    state.selectedTop = selectedTop
  }
}

export const actions = {
  async loadSelected({ commit }) {
    const selectedPlaylists = await this.$axios.$get('/selected-playlists')
    const selectedArtists = await this.$axios.$get('/selected-artists')
    const selectedTop = await this.$axios.$get('/selected-top')
    commit('setSelected', { selectedPlaylists, selectedArtists, selectedTop })
  }
}
