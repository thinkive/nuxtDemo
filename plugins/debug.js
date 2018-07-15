/* eslint-disable */
import debounce from 'debounce'
const store = {BUILD_INFO: '2015012121'} //后面从git服务器读取
const search = window.location.search
function showBuildInfo () {
  const console = window.console
  console && console.log(store.BUILD_INFO)

  const enableAlert = search.indexOf('__info') > -1
  if (enableAlert) {
    window.prompt('INFO:', store.BUILD_INFO)
  }
}

showBuildInfo()

let isLoading = false
let isLoaded = false

function loadDebugTool () {
  if (isLoading || isLoaded) {
    console.log('already exists')
    return
  }

  const script = document.createElement('script')
  const src = './libs/eruda.min.js'

  script.onload = function () {
    isLoading = false
    isLoaded = true
    console.log(window.eruda)
    // 启用调试工具
    window.eruda.init()
    showBuildInfo()
    console.log('debug mode')
  }
  script.onerror = function () {
    isLoading = false
    console.log('load error')
  }

  script.src = src
  console.log('loading')
  isLoading = true
  document.body.appendChild(script)
}

// 跳转到深度调试模式，也就是同步加载调试工具的模式，
// 有的时候异步调试还不能抓到错误，同步加载调试工具，能捕捉更多的错误
function redirectDeepDebugMode () {
  const loc = window.location
  let url = loc.protocol + '//' + loc.host + loc.pathname
  let search2 = search
  const debugSymbol = '__debug'

  if (search2) {
    search2 += '&' + debugSymbol
  } else {
    search2 = '?' + debugSymbol
  }

  url += search2 + loc.hash

  alert('redirect')

  setTimeout(function () {
    loc.href = url
  }, 300)
}

// 定时器
var debugTimer
// 起点时间
var startingPoint = 0
// 有效的点击次数总计
var validTouchCount = 0
// 有效的点击时间范围
var validTouchRange = 1500

function getTime () {
  return new Date().getTime()
}

function clearTimer () {
  clearTimeout(debugTimer)
  debugTimer = null
}

function enableDebugTool () {
  console.log('enableDebugTool Count:', validTouchCount)
  if (validTouchCount < 2) {
    validTouchCount = 0
    clearTimer()
    // console.log('invalid')
    return
  }

  if (validTouchCount === 2) {
    console.log('loadDebugTool')
    loadDebugTool()
    validTouchCount = 0
    clearTimer()
    return
  }

  if (validTouchCount > 2) {
    console.log('redirectDeepDebugMode')
    validTouchCount = 0
    redirectDeepDebugMode()
  }
}

function handleTouchStart (event) {
  // const length = event.changedTouches.length
  const length = event.touches.length
  // console.log('length', length)
  if (length !== 4) return

  const now = getTime()
  const isExpired = startingPoint && now - startingPoint > validTouchRange
  if (isExpired) {
    validTouchCount = 1
    startingPoint = now
    clearTimer()
    debugTimer = setTimeout(enableDebugTool, validTouchRange)
    // console.log('setTimeout')
  } else {
    if (!startingPoint) startingPoint = now
    validTouchCount++
    // console.log('validTouchCount++:', validTouchCount)
    if (!debugTimer) {
      debugTimer = setTimeout(enableDebugTool, validTouchRange)
    }
  }
}

document.addEventListener('touchstart', debounce(handleTouchStart, 200))
