// Расширенный Input - компонент для ввода текста с доп. св-вами
import { InputHTMLAttributes } from 'react'
import classNames from 'classNames'

import styles from './InputExt.module.css'


export type InputExtSizeInfo = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputExtvariantInfo = 'default' | 'filled' | 'unstyled' ;

interface InputExtProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  asize?: InputExtSizeInfo;
  radius?: InputExtSizeInfo;
  variant?: InputExtvariantInfo;
  // Флаг поля ввода со зведочкой
  withAsterisk?: boolean;
  error?: string;
}

// props с обязательной внутренней инициализацией по умолчанию (ост. иниц-ть не обяз-но)
const DEFAULT_PROPS: Pick<InputExtProps, 'asize' | 'radius' | 'variant'> = {asize: 'md', radius: 'xs', variant: 'default'};


export const InputExt = (props: InputExtProps) => {

  const { label, description, asize, radius, variant, withAsterisk, error, ...inputNativeProps}: InputExtProps = {...DEFAULT_PROPS, ...props};
  
  const isError = !!error;

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
      <div>
        <input 
          className={classNames(styles.input, sizeClassName, radiusClassName, variantClassName, 
            {
              [styles.inputError]: isError,
            }
          )}
          
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
