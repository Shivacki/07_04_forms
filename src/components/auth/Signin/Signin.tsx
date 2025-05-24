import React, { useState, useId, SyntheticEvent } from 'react'

import InputText from '@InputText'
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


// Форма Логин
export default function Signin({ onSubmit }: SigninProps) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const emailId = 'emailId_' + useId();
  const passwordId = 'passwordId_' + useId();


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
        <InputText
          label='Логин (e-mail)'
          error={errorEmail}
          id={emailId}
          placeholder='login@domain'
          value={email}
          onChange={handleEmailChange}
        />

        <InputText
          label='Пароль'
          error={errorPassword}
          id={passwordId}
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

