import React, { useState, SyntheticEvent } from 'react'

import InputExt from '@InputExt'
// import InputExt from '@components/common/InputExt'
import * as validation from '@validation'

import styles from './Signin.module.css'


export interface SigninInfoModel {
  email: string;
  password: string;
}

export type SubmitCallback = (data: SigninInfoModel) => Promise<void>;

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

      if (!email || !validation.isEmailValid(email)) {
        setErrorEmail('e-mail не задан или некорректен');
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
    // console.log('handleSigninSubmit');
    event.preventDefault();

    if (!validateForm())
      return;
    
    if (!!onSubmit) {
      await onSubmit({email, password});
    }
  }

  const handleFormChange = (/*event: React.ChangeEvent<HTMLFormElement>*/) => {
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
      <div className={styles.bodyContainer}>
        <InputExt
          label='Логин (e-mail)'
          // description='Эл. почта пользователя'
          // asize='lg'
          // radius='md'
          // variant='filled'
          error={errorEmail}
          id={`${mprefix}Email`}
          // type='email'
          // required
          placeholder='login@domain'
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

