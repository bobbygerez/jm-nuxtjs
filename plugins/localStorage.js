import createPersistedState from 'vuex-persistedstate'

export default ({store, isHMR}) => {
  if (isHMR) return

  window.onNuxtReady(() => {
    createPersistedState({
       reducer: (persistedState) => {
        const stateFilter = Object.assign({}, persistedState)
        const blackList = ['confirmDeleteDialog', 'subcategories', 'user']

        blackList.forEach((item) => {
          delete stateFilter[item]
        })

        return stateFilter
      },

    })(store)
  })
}