import { PLAYMODE } from '@/assets/js/constant'

export function selectPlay({ commit, state }, { list, index }) {
  commit('setSequenceList', list)
  commit('setPlayMode', PLAYMODE.sequence)
  commit('setPlayState', true)
  commit('setFullScreen', true)
  commit('setPlayList', list)
  commit('setCurrentIndex', index)
}
