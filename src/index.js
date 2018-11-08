import '@babel/polyfill' // 이 라인을 지우지 말아주세요!

import axios from 'axios'

const api = axios.create({
  // 바깥에서 주입해준 환경변수를 사용하는 코드
  // 이 컴퓨터에서만 사용할 환경변수를 설정하기 위해서 .env 파일을 편집하면 된다.
  baseURL: process.env.API_URL
})

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
});

const templates = {
  // 로그인폼의 값으로 #login-form 컨텐츠를 가져옴
  loginForm: document.querySelector('#login-form').content,
  todoList: document.querySelector('#todo-list').content
}

const rootEl = document.querySelector('.root')

// 페이지 그리는 함수 작성 순서
function drawLoginForm() {

  // 1. 템플릿 복사
  // 문서 속 템플릿태그 아이디가 로그인폼인 노드를 복제
  const fragment = document.importNode(templates.loginForm, true)

  // 2. 요소 선택
  const loginFormEl = fragment.querySelector('.login-form')
  // 3. 필요한 데이터 불러오기
  // 4. 내용 채우기
  // 5. 이벤트 리스너 등록하기
  loginFormEl.addEventListener('submit', async e => {
    e.preventDefault()
    // 이벤트를 실제로 일으킨 요소(login-form) 객체 안에있는 elements객체안에 name어트리뷰트가 username인 input요소의 값
    const username = e.target.elements.username.value
    // 이벤트를 실제로 일으킨 요소(login-form) 객체 안에있는 elements객체안에 name어트리뷰트가 password인 input요소의 값
    const password = e.target.elements.password.value
    const res = await api.post('/users/login', {
      username,
      password
    })
    localStorage.setItem('token', res.data.token)
    drawTodoList()
  })

  // 6. 템플릿을 문서에 삽입
  rootEl.textContent = ''
  rootEl.appendChild(fragment)

}

drawLoginForm()


function drawTodoList() {
  // 1. 템플릿 복사
  const fragment = document.importNode(templates.todoList, true)

  // 2. 요소 선택
  const todoList = fragment.querySelector('.todo-list')

  // 3. 필요한 데이터 불러오기

  // 4. 내용 채우기

  // 5. 이벤트 리스너 등록하기

  // 6. 템플릿을 문서에 삽입
  rootEl.textContent = ''
  rootEl.appendChild(fragment)
}
