// Расширенный Input - компонент для ввода текста с доп. св-вами
import { InputHTMLAttributes, RefAttributes } from 'react'
import classNames from 'classNames'

import styles from './InputText.module.css'


export type InputTextSizeInfo = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputTextVariantInfo = 'default' | 'filled' | 'unstyled';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement>, RefAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  asize?: InputTextSizeInfo;
  radius?: InputTextSizeInfo;
  variant?: InputTextVariantInfo;
  // Флаг поля ввода со зведочкой
  withAsterisk?: boolean;
  error?: string;
  icon?: any;
}

// props с обязательной внутренней инициализацией по умолчанию (ост. иниц-ть не обяз-но)
const DEFAULT_PROPS: Pick<InputTextProps, 'asize' | 'radius' | 'variant'> = {asize: 'md', radius: 'xs', variant: 'default'};


export const InputText = (props: InputTextProps) => {

  const { label, description, asize, radius, variant, withAsterisk, error, icon, ...inputNativeProps}: InputTextProps = {...DEFAULT_PROPS, ...props};
  // console.log('inputNativeProps.ref =', inputNativeProps.ref, ' onChange = ', inputNativeProps.onChange);

  // css. input
  const inputClassName = classNames({
    [styles.input]: true,
    [styles.inputError]: !!error,    
    [styles.inputImg]: !!icon,
  });
  
  // css. input-контейнер. Исп-ется, напр.  когда 
  const inputContainerClassName = classNames({
    [styles.inputImgContainer]: !!icon,
    [styles.inputImgContainerError]: !!icon && !!error,
  });

  // css. Размер эл-та
  const sizeClassName = classNames({
    [styles.sizeXs]: asize === 'xs',
    [styles.sizeSm]: asize === 'sm',
    [styles.sizeMd]: asize === 'md',
    [styles.sizeLg]: asize === 'lg',
    [styles.sizeXl]: asize === 'xl',
  });

  // css. Радиус закругления
  const radiusClassName = classNames({
    [styles.radiusXs]: radius === 'xs',
    [styles.radiusSm]: radius === 'sm',
    [styles.radiusMd]: radius === 'md',
    [styles.radiusLg]: radius === 'lg',
    [styles.radiusXl]: radius === 'xl',
  });

  // css. Вид
  const variantClassName = classNames({
    '': variant === 'default',
    [styles.inputVariantFilled]: variant === 'filled',
    [styles.inputVariantUnstyled]: variant === 'unstyled',
  });
  

  return (
    <div 
      className={classNames(sizeClassName)}
    >
      <div>
        <label className={styles.label} htmlFor={props.id}>{label}</label>
        {withAsterisk && <span className={styles.asterisk}> *</span>}
      </div>
      {!!description && 
        <div className={styles.description}>
          <span>{description}</span>
        </div>
      }
      <div className={inputContainerClassName}>
        {!!icon && <span>{icon}</span>}
        <input 
          className={classNames(inputClassName, sizeClassName, radiusClassName, variantClassName)}
          
          {...inputNativeProps}
        />
      </div>
      {!!error && 
        <div className={styles.error}>
          <span>{error}</span>
        </div>
      }
    </div>
  )

}
