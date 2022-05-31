import {GuitarType} from '../../types/stateType';

export class Adapter {
  static adaptToClient(guitar: GuitarType) {
    return Object.assign(
      {},
      guitar,
      {
        previewImg: `/img/content/${guitar.previewImg.slice(4)}`,
      },
    );
  }
}
