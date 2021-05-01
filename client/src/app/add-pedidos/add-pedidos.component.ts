import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-pedidos',
  templateUrl: './add-pedidos.component.html',
  styleUrls: ['./add-pedidos.component.scss']
})
export class AddPedidosComponent implements OnInit {

  socket = io('http://localhost:4000');

  pedidosForm: FormGroup;
  itemId = '';
  itemName = '';
  itemPrice: number = null;
  itemQty: number = null;
  totalPrice: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pedidosForm = this.formBuilder.group({
      itemId : [null, Validators.required],
      itemName : [null, Validators.required],
      itemPrice : [null, Validators.required],
      itemQty : [null, Validators.required],
      totalPrice : [null, Validators.required]
    });

    this.pedidosForm.get('totalPrice').disable();
  }

  updateTotalPrice() {
    let itemQty = this.pedidosForm.get('itemQty').value;
    let itemPrice = this.pedidosForm.get('itemPrice').value;
    this.pedidosForm.get('totalPrice').setValue(itemQty * itemPrice);
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addPedidos(this.pedidosForm.getRawValue())
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.socket.emit('updatedata', res);
          this.router.navigate(['/pedidos-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
