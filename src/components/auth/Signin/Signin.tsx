import React, { useState, SyntheticEvent } from 'react'

import styles from './Signin.module.css'

import InputExt from '@InputExt'
// import InputExt from '@components/common/InputExt'


interface LoginInfoModel {
  email: string;
  password: string;
}

type SubmitCallback = (loginInfo: LoginInfoModel) => Promise<void>;

interface SigninProps {
  onSubmit: SubmitCallback | null;
}

// Логический префикс в модели комп-та для получения текстовых идентификаторов. 
// М.б. исп-н для разных целей: формирование id и др.
const mprefix = 'sign_in_cmpnt';


// Форма Логин
export default function Signin({ onSubmit }: SigninProps) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');


  const validateForm = (): boolean => {
    try {
      if (!email) {
        setErrorEmail('Не задан e-mail');
        return false;
      }
  
      return true;
    
    } catch(err) {
      return false;
    }
  }
  
  const resetAllErrors = () => {
    setErrorEmail('');
    setErrorPassword('');
  }


  const handleFormSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('handleSigninSubmit');

    if (!validateForm())
      return;
    
    if (!!onSubmit) {
      await onSubmit({email, password});
    }
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    resetAllErrors();
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }


  return (
    <form
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
    >
      {/* Вход */}
      <div className={styles.bodyContainer}>
        <InputExt
          label='Логин (e-mail)'
          description='Эл. почта пользователя'
          // asize='lg'
          // radius='md'
          withAsterisk={true}
          error={errorEmail}
          id={`${mprefix}Email`}
          type='email'
          value={email}
          onChange={handleEmailChange}
        />

        <InputExt
          label='Пароль'
          error={errorPassword}
          id={`${mprefix}Password`}
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />

      </div>

      <div>
        <input type='submit' value='Войти'/>
      </div>
    </form>
  )
}

