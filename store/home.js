export const state = () => ({
  selectedPlaylists: [],
  selectedArtists: [],
  selectedTopTracks: [],
  topPlaylists: []
})

export const mutations = {
  setSelected(
    state,
    { selectedPlaylists, selectedArtists, selectedTopTracks, topPlaylists }
  ) {
    state.selectedPlaylists = selectedPlaylists
    state.selectedArtists = selectedArtists
    state.selectedTopTracks = selectedTopTracks
    state.topPlaylists = topPlaylists
  }
}

export const actions = {
  async loadSelected({ commit }) {
    const selectedPlaylists = await this.$axios.$get('/selected-playlists')
    const selectedArtists = await this.$axios.$get('/selected-artists')
    const selectedTopTracks = await this.$axios.$get('/selected-toptracks')
    const topPlaylists = await this.$axios.$get('/top-playlists')
    commit('setSelected', {
      selectedPlaylists,
      selectedArtists,
      selectedTopTracks,
      topPlaylists
    })
  }
}
