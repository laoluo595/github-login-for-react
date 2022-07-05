import React from 'react'
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons';
import '@/css/Login.less'
export default function Login() {
  // 跳转至github第三方登录
  const toGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${ process.env.REACT_APP_CLIENT_ID }&redirect_uri=${ process.env.REACT_APP_REDIRECT_URI }`
  }
  return (
    // <a href={`https://github.com/login/oauth/authorize?
    // client_id=${ process.env.REACT_APP_CLIENT_ID }&
    // redirect_uri=${ process.env.REACT_APP_REDIRECT_URI }`}>github-login</a>
    <div className='container'>
      <Button type="primary" shape="round" icon={<GithubOutlined />} onClick={ toGithubLogin }>github-login</Button>
    </div>
  )
}
