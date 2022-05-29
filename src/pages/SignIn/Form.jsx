import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../../hooks'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Row, Spinner } from 'react-bootstrap'
import { sendNotification } from '../../components/Toast/index'
import { useIntl } from 'react-intl'
import { InputValidationEnum } from 'enums'
import { observer } from 'mobx-react'

const AuthForm = observer(() => {
  const authStore = useStore('authStore')
  const intl = useIntl()
  const location = useLocation()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const schema = yup.object().shape({
    identifier: yup.string().required(intl.formatMessage({ id: 'validation.is_required' })),
    // .matches(InputValidationEnum.NO_SPACES, intl.formatMessage({ id: 'validation.not_valid' })),
    password: yup
      .string()
      .required(
        intl.formatMessage({
          id: 'validation.is_required',
        }),
      )
      .matches(InputValidationEnum.NO_SPACES_WITH_CHARACTERS, intl.formatMessage({ id: 'validation.not_valid' })),
  })

  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async data => {
    const { isRemember } = data
    setIsLoading(true)
    try {
      await authStore.signIn(data)
      authStore.setIsRememberMe(isRemember)
      authStore.setIsAuth(true)
      authStore.setUserName(data.identifier)
      sendNotification(`Вы вошли как ${authStore?.user?.userName}`, 'success')
    } catch (error) {
      sendNotification('Ошибка', 'error')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const goHome = () => {
    navigate('/')
  }

  return authStore.isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {errors.identifier && <span>{errors.identifier.message}</span>}
      <label htmlFor="identifier">{intl.formatMessage({ id: 'global.login' })}</label>
      <input name="identifier" ref={register} type="text" placeholder={intl.formatMessage({ id: 'global.name' })} />
      {errors.password && <span>{errors.password.message}</span>}
      <label htmlFor="password">{intl.formatMessage({ id: 'global.password' })}</label>
      <input name="password" ref={register} type="password" placeholder={intl.formatMessage({ id: 'global.password' })} />
      <Row style={{ width: '100%', justifyContent: 'space-between' }}>
        <Button type="submit" variant="dark">
          {isLoading ? <Spinner animation="border" size="sm" /> : <p>Войти</p>}
        </Button>
        <Button onClick={goHome} variant="outline-dark">
          {isLoading ? <Spinner animation="border" size="sm" /> : <p>На главную</p>}
        </Button>
      </Row>
    </form>
  )
})

export default AuthForm
