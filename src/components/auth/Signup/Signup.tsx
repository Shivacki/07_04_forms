import React, { useState, useId, useRef, SyntheticEvent } from 'react'

import InputExt from '@InputExt'
import GenderRadio, { GenderModel } from '@GenderRadio'
import * as validation from '@validation'

import styles from './Signup.module.css'


export interface SignupInfoModel {
  firstname: string;
  nickname: string;
  email: string;
  password: string;
  gender: GenderModel;
}

export type SubmitCallback = (data: SignupInfoModel) => Promise<void>;

interface SignupProps {
  onSubmit: SubmitCallback | null;
}


// Форма Регистрация
export default function Signup({ onSubmit }: SignupProps) {
  
  const refFirstname = useRef<HTMLInputElement>(null);
  const refNickname = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword2 = useRef<HTMLInputElement>(null);

  const [firstname, setFirstname] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [gender, setGender] = useState<GenderModel>('male');
  
  
  const [errorFirstname, setErrorFirstname] = useState('');
  const [errorNickname, setErrorNickname] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const firstnameId = 'firstnameId_' + useId();
  const nicknameId = 'nicknameId_' + useId();
  const emailId = 'emailId_' + useId();
  const passwordId = 'passwordId_' + useId();
  const password2Id = 'password2Id_' + useId();


  const validateForm = (): boolean => {
    try {

      if (!firstname) {
        setErrorFirstname('Имя пользователя не задано');
        // console.log('refFirstname.current =', refFirstname.current);
        refFirstname.current?.focus();
        return false;
      }
  
      if (!nickname) {
        setErrorNickname('Ник не задан');
        refNickname.current?.focus();
        return false;
      }
  
      if (!email || !validation.isEmailValid(email)) {
        setErrorEmail('e-mail не задан или некорректен');
        refEmail.current?.focus();
        return false;
      }
  
      if (!password || (password !== password2)) {
        setErrorPassword('Пароли не совпадают или пустой пароль');
        refPassword2.current?.focus();
        return false;
      }

      if (!validation.isPasswordValid(password)) {
        setErrorPassword('Пароль не соответсвует ограничениям');
        refPassword2.current?.focus();
        return false;
      }
  
      return true;
    
    } catch(err) {
      return false;
    }
  }
  
  const resetAllErrors = () => {
    setErrorFirstname('');
    setErrorNickname('');
    setErrorEmail('');
    setErrorPassword('');
  }


  const handleFormSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    // console.log('handleSignupSubmit');
    event.preventDefault();

    if (!validateForm())
      return;
    
    if (!!onSubmit) {
      await onSubmit({firstname, nickname, email, password, gender});
    }
  }

  const handleFormChange = (/*event: React.ChangeEvent<HTMLFormElement>*/) => {
    resetAllErrors();
  }

  const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  }

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handlePassword2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value);
  }


  return (
    <form
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
    >
      <div className={styles.bodyContainer}>
        <InputExt
          label='Имя'
          withAsterisk={true}
          error={errorFirstname}
          id={firstnameId}
          value={firstname}
          onChange={handleFirstnameChange}
          ref={refFirstname}
        />

        <InputExt
          label='Ник'
          description='Если задан, то отображается вместо имени'
          error={errorNickname}
          id={nicknameId}
          value={nickname}
          onChange={handleNicknameChange}
          ref={refNickname}
        />

        <InputExt
          label='E-mail'
          description='Используется в качестве логина при входе'
          withAsterisk={true}
          error={errorEmail}
          id={emailId}
          value={email}
          onChange={handleEmailChange}
          ref={refEmail}
          icon={<img src='/at.svg' className={styles.imgEmail} alt=' '></img>}
        />

        <GenderRadio value={gender} setterFn={setGender}/>

        <InputExt
          label='Пароль'
          description='Не менее 8 символов'
          id={passwordId}
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />

        <InputExt
          label='Повторите пароль'
          error={errorPassword}
          id={password2Id}
          type='password'
          value={password2}
          onChange={handlePassword2Change}
          ref={refPassword2}
        />

      </div>

      <div>
        <input type='submit' value='Зарегистрироваться'/>
      </div>
    </form>
  )
}


