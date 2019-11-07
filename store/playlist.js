export const state = () => ({
    userPlaylists: [],
    playlistTracks: []
})

export const mutation = {
    setSelected(state, { userPlaylists, playlistTracks }) {
        state.userPlaylists = userPlaylists
        state.playlistTracks = playlistTracks
    }
}

export const actions = {
    async loadPlaylists({ commit }) {
        const userPlaylists = await this.$axios.$get('/REEEEEEEEEE')
        const playlistTracks = await this.$axios.$get('/REEEEEEEEEX2')
        commit('setPlaylists', { userPlaylists, playlistTracks })
    }
}

//guardo esto para mas tarde Uu
