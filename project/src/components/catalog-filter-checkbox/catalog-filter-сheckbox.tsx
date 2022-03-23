import {checkboxStoreInit, CheckboxStoreType} from '../../store/app-filter/app-filter';
import {useDispatch, useSelector} from 'react-redux';
import {setCheckboxStore, setGuitarsFilteredByCheckbox, setGuitarStrings} from '../../store/action';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../common/const';
import {getCheckboxStore, getGuitarStrings} from '../../store/app-filter/selectors';
import {CheckboxType, StringsType} from '../../types/const-type';
import {useEffect, useState} from 'react';
import CheckboxList from '../checkbox-list/checkbox-list';
import {GuitarType} from '../../types/stateType';
import {getFilteredByString, isCheckboxTypeChecked} from '../../common/filter';
import {getGuitars} from '../../store/app-data/selectors';

type checkboxStringType = {
  [key:string]: number,
}

let checkboxString: checkboxStringType = {};

CHECKBOX_STRING_TYPE.forEach((checkbox)=> {
  checkboxString = {...checkboxString, [checkbox.name]: checkbox.string[0]};
});

const disableCheckbox = (checkboxState: CheckboxStoreType, checkboxType: CheckboxType[], guitarStrings: number[]) => {
  let state = {...checkboxState};
  checkboxType.forEach((type) => {
    const checkboxName: string = type.name;
    const isStringCheckboxDisable = !guitarStrings.includes(checkboxString[checkboxName]);
    const isDisableFlag = checkboxString[checkboxName] && guitarStrings.length > 0 ?  isStringCheckboxDisable : false;
    const isCheckedFlag = isDisableFlag ? false : state[checkboxName].isChecked;

    const currentCheckbox = {
      name: checkboxName,
      isDisabled: isDisableFlag,
      isChecked: isCheckedFlag,
    };

    state = {...state, [checkboxName]: currentCheckbox};
  });

  return state;
};


function  CatalogFilterCheckbox (): JSX.Element {
  const guitarStrings = useSelector(getGuitarStrings);
  const checkboxStore = useSelector(getCheckboxStore);
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();
  const [checkState, setCheckState] = useState(checkboxStoreInit);


  const handleCb = (name: string) => {
    let state = {...checkState};
    const currentCheckbox = {...state[name], isChecked: !state[name].isChecked};
    state = {...state, [name]: currentCheckbox};
    setCheckState(state);
  };

  useEffect(()=>{
    const state = disableCheckbox(checkState, CHECKBOX_STRING_TYPE, guitarStrings);
    dispatch(setCheckboxStore(state));
    console.log({state, guitarStrings});
  }, [dispatch, checkState]);


  // Filtering by checkbox
  useEffect(() => {
    let currentGuitars: GuitarType[] = [];
    let checkboxGuitarStrings: StringsType = [];

    const isGuitarTypeChecked = isCheckboxTypeChecked(CHECKBOX_GUITAR_TYPE, checkboxStore);

    if (isGuitarTypeChecked){
      CHECKBOX_GUITAR_TYPE.forEach((type) => {
        if (checkboxStore[type.name].isChecked) {
          const checkedTypeGuitars = guitars.filter((guitar) => checkboxStore[type.name] && guitar.type === type.name);
          currentGuitars = [...new Set([...currentGuitars, ...checkedTypeGuitars])];
          checkboxGuitarStrings = [...new Set([...checkboxGuitarStrings,...type.string])];
        }
      });
    }

    // if (checkboxGuitarStrings !== guitarStrings) {
    //   dispatch(setGuitarStrings(checkboxGuitarStrings));
    // }

    currentGuitars =  isGuitarTypeChecked ? currentGuitars : [...guitars];

    const isStringTypeChecked = isCheckboxTypeChecked(CHECKBOX_STRING_TYPE, checkboxStore);

    if (isStringTypeChecked) {
      let checkboxStrings: StringsType = [];
      CHECKBOX_STRING_TYPE.forEach((checkbox) => {
        const strings: StringsType = checkboxStore[checkbox.name].isChecked ? checkbox.string : [];
        checkboxStrings = [...new Set([...checkboxStrings,...strings])];
      });
      currentGuitars = getFilteredByString(currentGuitars, checkboxStrings);
    }

    dispatch(setGuitarsFilteredByCheckbox(currentGuitars));
  }, [dispatch, guitars, checkboxStore]);


  return(
    <>
      <CheckboxList checkboxType={CHECKBOX_GUITAR_TYPE} cb={handleCb} />
      <CheckboxList checkboxType={CHECKBOX_STRING_TYPE} cb={handleCb} />
    </>
  );
}

export default CatalogFilterCheckbox;
