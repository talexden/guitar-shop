type CatalogFilterBlockType = {
  blockTitle: string,
  children: React.ReactNode
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
