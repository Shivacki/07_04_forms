import React, { useId } from 'react'

import styles from './GenderRadio.module.css'


export type GenderModel = 'male' | 'female';
// Прототип для setter-ф-ии из useState для уст-ки значения Пола
type SetterFn = React.Dispatch<React.SetStateAction<GenderModel>>;

interface GenderRadioProps {
  value: GenderModel;
  setterFn: SetterFn;
}

// Комп-т для выбора пола с пом. радиокнопок
export default function GenderRadio({ value, setterFn }: GenderRadioProps) {

  // useId - Чтобы комп-т корректно работал, если на форме их неск-ко + не конфликтовал с др. id
  const nameGroup = 'gender_radio_' + useId();
  const maleId = 'maleId_' + useId();
  const femaleId = 'femaleId_' + useId();

  const handleMaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setterFn(event.target.value as GenderModel);
  }

  const handleFemaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setterFn(event.target.value as GenderModel);
  }


  return (
    <fieldset>
      <legend>Пол</legend>

      <div>
        <input type='radio' id={maleId} name={nameGroup} value='male' checked={value === 'male'} onChange={handleMaleChange} />
        <label className={styles.labelRadio} htmlFor={maleId}>Мужской</label>
      </div>

      <div>
        <input type='radio' id={femaleId} name={nameGroup} value="female" checked={value === 'female'} onChange={handleFemaleChange} />
        <label htmlFor={femaleId} className={styles.labelRadio}>Женский</label>
      </div>
    </fieldset>
  )

}

