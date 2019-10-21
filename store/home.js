export const state = () => ({
  selectedPlaylists: [],
  selectedArtists: []
})

export const mutations = {
  setSelected(state, { selectedPlaylists, selectedArtists }) {
    state.selectedPlaylists = selectedPlaylists
    state.selectedArtists = selectedArtists
  }
}

export const actions = {
  async loadSelected({ commit }) {
    const selectedPlaylists = await this.$axios.$get('/selected-playlists')
    const selectedArtists = await this.$axios.$get('/selected-artists')
    commit('setSelected', { selectedPlaylists, selectedArtists })
  }
}
