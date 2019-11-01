export const state = () => ({
  selectedPlaylists: [],
  selectedArtists: [],
  selectedTop: [],
  selectedTopList: [],
  selectedTopTracks: []
})

export const mutations = {
  setSelected(
    state,
    {
      selectedPlaylists,
      selectedArtists,
      selectedTop,
      selectedTopList,
      selectedTopTracks
    }
  ) {
    state.selectedPlaylists = selectedPlaylists
    state.selectedArtists = selectedArtists
    state.selectedTop = selectedTop
    state.selectedTopList = selectedTopList
    state.selectedTopTracks = selectedTopTracks
  }
}

export const actions = {
  async loadSelected({ commit }) {
    const selectedPlaylists = await this.$axios.$get('/selected-playlists')
    const selectedArtists = await this.$axios.$get('/selected-artists')
    const selectedTop = await this.$axios.$get('/selected-top')
    const selectedTopList = await this.$axios.$get('/selected-toplist')
    const selectedTopTracks = await this.$axios.$get('/selected-toptracks')
    commit('setSelected', {
      selectedPlaylists,
      selectedArtists,
      selectedTop,
      selectedTopList,
      selectedTopTracks
    })
  }
}
