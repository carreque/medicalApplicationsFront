import { TestBed } from '@angular/core/testing';

import { ConnectionInstanceService } from './connection-instance.service';

describe('ConnectionInstanceService', () => {
  let service: ConnectionInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
