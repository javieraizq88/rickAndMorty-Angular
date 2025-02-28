import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFavoriteComponent } from './character-favorite.component';

describe('CharacterFavoriteComponent', () => {
  let component: CharacterFavoriteComponent;
  let fixture: ComponentFixture<CharacterFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterFavoriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
