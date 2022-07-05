import React, { useState, useEffect } from 'react'
import { Button, Spin, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { login } from '@/api/aouth'
import { setStorage } from '@/utils/util';
import '@/css/Login.less'

export default function OauthRedirect() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  // 重试
  const retry = () => {
    setIsLoading(true)
    const url = window.location.href
    const hasCode = url.includes('?code=')
    // 如果是跳转进来的，去查token，不是退回登录页
    if (hasCode) {
      const [,code] = url.split('?code=')
      login(code)
      .then(res => {
        const { code, result} = res
        // 0 成功 1 失败
        if (code === 0) {
          setStorage('token', result.token)
          message.success('获取token成功，即将跳转')
          navigate('/success')
        } else {
          message.error('请稍后重试')
        }
      })
      .catch(err => {
        message.error('请检查您的code是否已经过期，或者您本地是否能正常访问github，请稍后重试')
      })
      .finally(() => {
        setIsLoading(false)
      })
    } else {
      // 去登录页
      navigate('/login')
    }
  }
  // 类似mounted
  useEffect(() => {
    // 直接调用重试方法
    retry()
    // eslint-disable-next-line
  }, [])
  return (
    <div className='container'>
      {
        !isLoading ? (<Button type="primary" shape="round" onClick={ retry }>重试</Button>) : (<Spin size="large" tip="正在获取token中..."/>)
      }
    </div>
  )
}
