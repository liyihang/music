export function shuffle(source) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}
// 获取随机整数
function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1)
}
// 数据交换
function swap(arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export function formatTime(interval) {
  interval = interval | 0
  const mimute = ((interval / 60 | 0) + '').padStart(2, '0')
  const second = (interval % 60 + '').padStart(2, '0')
  return `${mimute}:${second}`
}
