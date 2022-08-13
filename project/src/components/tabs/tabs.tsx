import {MouseEvent, useState} from 'react';
import {GuitarType} from '../../types/stateType';

type TabsType = {
  currentGuitar: GuitarType,
}

function Tabs ({currentGuitar}: TabsType):JSX.Element {
  const {vendorCode, type, stringCount, description} = currentGuitar;
  const [tabState, setTabState] = useState({isCharacteristics: true, isDescription: false});

  const handleOnClickCharacteristics = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setTabState({
      isCharacteristics: true,
      isDescription: false,
    });
  };

  const handleOnClickDescription = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setTabState({
      isCharacteristics: false,
      isDescription: true,
    });
  };

  return (
    <div className='tabs'>
      <a
        className={`${tabState.isCharacteristics ? '' : 'button--black-border '} button button--medium tabs__button`}
        onClick={handleOnClickCharacteristics}
        href={'#characteristics'}
      >
        Характеристики
      </a>
      <a
        className={`${tabState.isDescription ? '' : 'button--black-border '} button button--medium tabs__button`}
        onClick={handleOnClickDescription}
        href={'#description'}
      >
        Описание
      </a>
      <div className='tabs__content' id='characteristics'>
        <table className={`${tabState.isCharacteristics ? '' : 'hidden '}tabs__table`}>
          <tbody>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Артикул:</td>
              <td className='tabs__value'>{vendorCode}</td>
            </tr>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Тип:</td>
              <td className='tabs__value'>{type}</td>
            </tr>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Количество струн:</td>
              <td className='tabs__value'>{stringCount} струнная</td>
            </tr>
          </tbody>
        </table>
        {tabState.isDescription && <p className='tabs__product-description'>{description}</p>}
      </div>
    </div>
  );
}

export default Tabs;
