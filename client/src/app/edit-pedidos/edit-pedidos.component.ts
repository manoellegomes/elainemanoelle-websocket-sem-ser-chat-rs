import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-pedidos',
  templateUrl: './edit-pedidos.component.html',
  styleUrls: ['./edit-pedidos.component.scss']
})
export class EditPedidosComponent implements OnInit {

  socket = io('http://localhost:4000');

  pedidosForm: FormGroup;
  _id = '';
  itemId = '';
  itemName = '';
  itemPrice: number = null;
  itemQty: number = null;
  totalPrice: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getPedidosById(this.route.snapshot.params.id);
    this.pedidosForm = this.formBuilder.group({
      itemId : [null, Validators.required],
      itemName : [null, Validators.required],
      itemPrice : [null, Validators.required],
      itemQty : [null, Validators.required],
      totalPrice : [null, Validators.required]
    });
  }

  getPedidosById(id: any) {
    this.api.getPedidosById(id).subscribe((data: any) => {
      this._id = data._id;
      this.pedidosForm.setValue({
        itemId: data.itemId,
        itemName: data.itemName,
        itemPrice: data.itemPrice,
        itemQty: data.itemQty,
        totalPrice: data.totalPrice
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePedidos(this._id, this.pedidosForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.socket.emit('updatedata', res);
          this.router.navigate(['/pedidos-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  pedidosDetails() {
    this.router.navigate(['/pedidos-details', this._id]);
  }

}
