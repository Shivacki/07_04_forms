// Расширенный Input - компонент для ввода текста с доп. св-вами
import { InputHTMLAttributes } from 'react'
import classNames from 'classNames'

import styles from './InputExt.module.css'


export type InputExtSizeInfo = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface InputExtProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  asize?: InputExtSizeInfo;
  radius?: InputExtSizeInfo;
  // Флаг поля ввода со зведочкой
  withAsterisk?: boolean;
  error?: string;
}

const DEFAULT_PROPS: Pick<InputExtProps, 'asize' | 'radius'> = {asize: 'md', radius: 'xs'};


// Удаляет все собств. св-ва из объекта, оставляя только унаследованные св-ва прототипа (typescript delete all fields of T)
// N.B. Мутирует исх. объект !!!
type Empty<T> = { [K in keyof T]?: undefined };
function deleteAllOwnFields<T extends object>(obj: T): Empty<T> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }
  return obj as Empty<T>;
}


export const InputExt = (props: InputExtProps) => {

  const { label, description, asize, radius, withAsterisk, error}: InputExtProps = {...DEFAULT_PROPS, ...props};
  
  const inputNativeProps = deleteAllOwnFields({...props});

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
          className={classNames(styles.input, sizeClassName, radiusClassName,
            {
              [styles.inputError]: isError,
            }
          )}
          
          // {...props}
          // {...deleteAllOwnFields({...props})}
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
