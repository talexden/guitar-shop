import {Adapter} from './adapter';
import {mockGuitar} from '../../common/mock-guitars';

describe('Adapter to client', () => {
  const guitar = mockGuitar;
  it('should change previewImg link', () => {
    expect(Adapter.adaptToClient(guitar).previewImg).toEqual('img/content/guitar-1.jpg');
  })
})
