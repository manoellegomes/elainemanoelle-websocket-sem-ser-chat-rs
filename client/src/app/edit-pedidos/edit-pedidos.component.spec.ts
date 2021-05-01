import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPedidosComponent } from './edit-pedidos.component';

describe('EditPedidosComponent', () => {
  let component: EditPedidosComponent;
  let fixture: ComponentFixture<EditPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
