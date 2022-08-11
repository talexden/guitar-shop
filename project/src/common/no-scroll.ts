export const noScrollAdd = ():void => {
  document.body.classList.add('scroll-lock');
  // document.body.classList.add('scroll-lock-ios');
};

export const noScrollRemove = ():void => {
  document.body.classList.remove('scroll-lock');
  // document.body.classList.remove('scroll-lock-ios');
};


