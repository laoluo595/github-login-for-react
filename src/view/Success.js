import React, {
  useEffect,
  useState
} from 'react'
import { message, Descriptions, Button } from 'antd';
import { getUserInfo } from '@/api/aouth'
import { useNavigate } from "react-router-dom";
import { removeStorage } from '@/utils/util';
import '@/css/Login.less'

export default function Success() {
  const navigate = useNavigate()
  const [data, setData] = useState({ login: '', avatar_url: '' });
  // 获取用户信息
  const httpUser = () => {
    getUserInfo()
    .then(res => {
      const { code, result } = res
      if (code === 0) {
        const { login, avatar_url } = result
        setData({
          ...data,
          login,
          avatar_url
        })
        message.success('获取用户信息成功')
      } else {
        message.error(res.message)
      }
    })
    .catch(err => {
      message.error('呵呵，访问github失效了')
    })
  }
  // 退出登录
  const logout = () => {
    removeStorage('token')
    navigate('/login')
  }
  useEffect(() => {
    httpUser()
    // eslint-disable-next-line
  },[])
  return (
    <div className='container direction'>
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="登录名">{ data.login }</Descriptions.Item>
        <Descriptions.Item label="头像">
          <img className='user-pic' src={ data.avatar_url } alt="" />
        </Descriptions.Item>
      </Descriptions>
      <Button className='mt-30' type="primary" shape="round" onClick={ logout }>退出</Button>
    </div>
  )
}
