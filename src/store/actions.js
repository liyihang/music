import { PLAYMODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/utils'

export function selectPlay({ commit }, { list, index }) {
  commit('setSequenceList', list)
  commit('setPlayMode', PLAYMODE.sequence)
  commit('setPlayState', true)
  commit('setFullScreen', true)
  commit('setPlayList', list)
  commit('setCurrentIndex', index)
}

/**
 * 随机播放
 */
export function randomPlay({ commit, state }, { list, index }) {
  commit('setSequenceList', list)
  commit('setPlayMode', PLAYMODE.sequence)
  commit('setPlayState', true)
  commit('setFullScreen', true)
  commit('setPlayList', shuffle(list))
  commit('setCurrentIndex', index)
}
