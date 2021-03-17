import axios from 'axios'

window.requestInstance = []
window.requestKey = []

axios.interceptors.request.use(config => {
  const { url } = config 
  const requestKey = `${url}_${Date.now()}`
  config.cancelToken = new axios.CancelToken( cancel => {
    window.requestInstance.push({cancel})
    window.requestKey.push(requestKey)
  })
  config.requestKey = requestKey
  return config 
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(
	(response) => {
		// 请求响应完成后，将当当前对应的请求全局保存的信息从axiosKeyArr和axiosPromiseArr中移除
		const reqIndex = window.axiosKeyArr.indexOf(response.config.configKey)
		window.axiosKeyArr.splice(reqIndex, 1)
		window.axiosPromiseArr.splice(reqIndex, 1)
		// Do something with response data
		// 接口请求成功后，判断当前用户会话是否超时，200表示http码为200，请求成功
		if (response.status === 200) {
			// 如果needLogin为true，表示用户会话超，需要跳转至用户登录页面
			if (response.data.needLogin !== undefined && !!response.data.needLogin) {
				log.error('用户会话超时，需重新登录！当前接口地址为：', response.config.url)
				// 页面跳转前，清空所有用户相关信息
				console.log('页面跳转前，清空所有用户相关信息')
				// store.dispatch('clearUserCache')
				// 如果响应结果中带有跳转地址，则跳转至响应结果中的地址，否则跳转至当前系统中默认的登录页面
				if (response.data.location) {
					window.location.href = response.data.location
				} else {
					router.push({ path: config.LOGIN_PAGE })
				}
				response.data = httpNull
			}
			return response
		} else {
			return response
		}
	},
	(error) => {
		// Do something with response error
		// 请求失败，执行请求失败的函数reject
		return Promise.reject(error)
	}
)

// 当用户会话超时，返回一个空的对象，避免页面出现错误提示
let httpNull = {
	msgCode: '0',
	msgContent: '',
	page: null,
	returnObj: null,
	success: true
}

const httpError = {
	msgCode: '-1',
	msgContent: '网络错误',
	page: null,
	returnObj: null,
	success: false
}

export default function request(url, data, config) {
	if (!url || !url.trim().length) {
		// log.error('fetch请求接口地址为空，终止请求')
		return new Promise((resolve) => {
			resolve(httpError)
		})
	}
	config = config || {}
  const userInfo = store.getters.userInfo
	if (userInfo) {
    const { access_token } = userInfo

    if (access_token && !config.noNeedToken) {
      config.headers = {
        ticket: store.getters.userInfo.access_token || '',
        locale: i18n.locale || ''
      }
    }
	}

	data = data || {}
	
	return new Promise((resolve) => {
		axios
			.post(url, data, config)
			.then(
				(response) => {
					resolve(response.data)
				},
				(err) => {
					// 所有请求失败也执行resolve方法，封装统一的错误消息给业务接口调用处
					// 只有当存在返回消息时，才返回错误消息
					if (err.message) {
						log.error('fetch接口请求失败，请求url为：', url, '；请求参数为：', param, '；错误消息为：', err)
						resolve(httpError)
					} else {
						// 如message为空，则表示当前请求被取消，不需要进行返回
						log.info('fetch接口请求被取消，请求url为：', url)
					}
				}
			)
			.catch((err) => {
				log.error('fetch接口请求失败，请求url为：', url, '；请求参数为：', param, '；错误消息为：', err)
				if (err.message) {
					resolve(httpError)
				} else {
					// 如message为空，则表示当前请求被取消，不需要进行返回
					log.info('fetch接口请求被取消，请求url为：', url)
				}
			})
	})
}