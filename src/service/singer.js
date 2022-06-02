import { get } from './base'

// get singer list
export function getSingerList() {
  return get('/api/getSingerList')
}
// get singer detail
export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', { mid: singer.mid })
}
