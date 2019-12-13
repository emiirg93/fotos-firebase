import { TestBed } from '@angular/core/testing';

import { CargaImagenesService } from './carga-imagenes.service';

describe('CargaImagenesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargaImagenesService = TestBed.get(CargaImagenesService);
    expect(service).toBeTruthy();
  });
});
