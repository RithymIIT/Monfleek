import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTutorialPage } from './add-tutorial.page';

describe('AddTutorialPage', () => {
  let component: AddTutorialPage;
  let fixture: ComponentFixture<AddTutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTutorialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
