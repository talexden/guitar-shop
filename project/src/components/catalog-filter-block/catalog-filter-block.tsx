import {ReactNode} from 'react';

type CatalogFilterBlockType = {
  blockTitle: string,
  children: ReactNode,
}

export function CatalogFilterBlock (props: CatalogFilterBlockType):JSX.Element {
  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>{props.blockTitle}</legend>
      {props.children}
    </fieldset>
  );
}

export default CatalogFilterBlock;
