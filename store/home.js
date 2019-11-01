export const state = () => ({
  selectedPlaylists: [],
  selectedArtists: [],
  selectedTop: [],
  selectedTopList: [],
  selectedTopTracks: [],
  selectedTopTracksName: []
})

export const mutations = {
  setSelected(
    state,
    {
      selectedPlaylists,
      selectedArtists,
      selectedTop,
      selectedTopList,
      selectedTopTracks,
      selectedTopTracksName
    }
  ) {
    state.selectedPlaylists = selectedPlaylists
    state.selectedArtists = selectedArtists
    state.selectedTop = selectedTop
    state.selectedTopList = selectedTopList
    state.selectedTopTracks = selectedTopTracks
    state.selectedTopTracksName = selectedTopTracksName
  }
}

export const actions = {
  async loadSelected({ commit }) {
    const selectedPlaylists = await this.$axios.$get('/selected-playlists')
    const selectedArtists = await this.$axios.$get('/selected-artists')
    const selectedTop = await this.$axios.$get('/selected-top')
    const selectedTopList = await this.$axios.$get('/selected-toplist')
    const selectedTopTracks = await this.$axios.$get('/selected-toptracks')
    const selectedTopTracksName = await this.$axios.$get('/api')
    commit('setSelected', {
      selectedPlaylists,
      selectedArtists,
      selectedTop,
      selectedTopList,
      selectedTopTracks,
      selectedTopTracksName
    })
  }
}
