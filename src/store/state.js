import { PLAYMODE } from '@/assets/js/constant'
const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAYMODE.sequence,
  currentIndex: 0,
  fullScreen: false
}

export default state
