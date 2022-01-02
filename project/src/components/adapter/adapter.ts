import {Guitar} from '../../types/state';

export class Adapter {
  static adaptToClient(guitar: Guitar) {
    const adaptedGuitar = Object.assign(
      {},
      guitar,
      {
        previewImg: `img/content/${guitar.previewImg.slice(4)}`,
      },
    );

    return adaptedGuitar;
  }
}
