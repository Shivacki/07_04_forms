// React. Модуль 4. Формы. Задание 1. Тестирование функционала

import { useState, MouseEvent  } from 'react'
import classNames from 'classNames'

import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'

import tsfStyles from './TestAuthForm.module.css'


// Тестируемый функционал
enum TestView {
  SIGNIN_VIEW = 'SIGNIN_VIEW',
  SIGNUP_VIEW = 'SIGNUP_VIEW',
}
const viewList = [TestView.SIGNIN_VIEW, TestView.SIGNUP_VIEW];
const viewCaptionMap = new Map([
    [TestView.SIGNIN_VIEW, 'Вход'],
    [TestView.SIGNUP_VIEW, 'Регистрация'],
]);


export default function TestAuthForm() {

  const [view, setView] = useState(TestView.SIGNIN_VIEW);

  const handleViewClick = (event: MouseEvent<HTMLButtonElement>) => {
    setView(event.currentTarget.name as TestView);
    // setView((event.target as HTMLButtonElement).name as TestView);
  }


  return (
    <>
      Тестовый функционал аутентификации:
      <nav>
        <div className={tsfStyles.navRoot}>
          {viewList.map((value, index) => (
            <button 
              key={index} 
              className={classNames({
                [tsfStyles.navButton]: true,
                [tsfStyles.navButtonActive]: view === value,
              })}
              // Чтобы идентифицировать кнопку в обработчике клика
              name={value}
              onClick={handleViewClick}
            >
              {viewCaptionMap.get(value)}
            </button>
          ))}
        </div>
      </nav>
      
      <hr/>

      {/* Тело тестового функционала */}
      <div>
        {(view === TestView.SIGNIN_VIEW) && 
          <Signin onSubmit = {null}/>
        }
        {(view === TestView.SIGNUP_VIEW) && 
          <Signup onSubmit = {null}/>
         }
      </div>
    </>
  )
}

