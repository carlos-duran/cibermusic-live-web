export const state = () => ({
  isDesktop: false,
  sidenavMobile: false,
  sidenavDesktop: true
})

export const getters = {
  isSidenavVisible(state) {
    return state.isDesktop ? !state.sidenavDesktop : !state.sidenavMobile
  }
}

export const mutations = {
  setDesktop(state, value) {
    state.isDesktop = value
  },

  setSidenavMobile(state, value) {
    state.sidenavMobile = value
  },

  toggleSidenav(state, value) {
    if (state.isDesktop) {
      state.sidenavDesktop = !state.sidenavDesktop
    } else {
      state.sidenavMobile = !state.sidenavMobile
    }
  }
}
