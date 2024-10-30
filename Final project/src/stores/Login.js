import { defineStore } from 'pinia'

export const useUserStore = defineStore('member', {
  state: () => ({
    loginCheck: false,
    nickName: '',
    thumbnail: '',
    profileImage: '',
    email: '',
    userId: '',
    snsType: '',
  }),
  //   data를 받아오면 위의 상태안에 값을 넣고 레이아웃네비뷰의 watchEffect로 다시 넘겨준다.
  actions: {
    login(data) {
      // 백엔드와 통신 성공 시 true로 바꿔준다.
      this.loginCheck = true
      this.userId = data.userId
      this.nickName = data.nickName
      this.thumbnail = data.thumbnail
      this.profileImage = data.profileImage
      this.email = data.email
      this.snsType = data.snsType
      sessionStorage.setItem('nickName', this.nickName)
      sessionStorage.setItem('profileImage', this.profileImage)
    },
    logout() {
      this.loginCheck = false
      this.nickName = ''
      this.thumbnail = ''
      this.profileImage = ''
      this.email = ''
      this.userId = ''
      this.snsType = ''
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('nickName')
      sessionStorage.removeItem('profileImage')
    },
  },
})
