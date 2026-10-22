import { TestBed } from '@angular/core/testing';
import { BookStack } from './book-stack';

describe('BookStack', () => {
  let service: BookStack;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookStack);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
