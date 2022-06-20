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
export function randomPlay({ commit, state }, list) {
  commit('setSequenceList', list)
  commit('setPlayMode', PLAYMODE.random)
  commit('setPlayState', true)
  commit('setFullScreen', true)
  commit('setPlayList', shuffle(list))
  commit('setCurrentIndex', 0)
}
/**
 * play mode
 *
 */
export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id
  if (mode === PLAYMODE.random) {
    commit('setPlayList', shuffle(state.sequenceList))
  } else {
    commit('setPlayList', state.sequenceList)
  }
  const index = state.playList.findIndex((song) => {
    return song.id === currentId
  })

  commit('setCurrentIndex', index)
  commit('setPlayMode', mode)
}
