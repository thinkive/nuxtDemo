export const state = () => ({
  plusNum: 1
})

export const mutations = {
  plusMutations (state) {
    state.plusNum ++
  },
  plusIndex (state) {
    console.log(state)
    state.num ++
    console.log('点击递增index的num')
  }
}
