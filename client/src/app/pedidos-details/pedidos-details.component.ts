import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Pedidos } from './../pedidos';

@Component({
  selector: 'app-pedidos-details',
  templateUrl: './pedidos-details.component.html',
  styleUrls: ['./pedidos-details.component.scss']
})
export class PedidosDetailsComponent implements OnInit {

  socket = io('http://localhost:4000');

  pedidos: Pedidos = { _id: '', itemId: '', itemName: '', itemPrice: null, itemQty: null, totalPrice: null, updated: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getPedidosDetails(this.route.snapshot.params.id);

    this.socket.on('update-data', function(data: any) {
      this.getPedidosDetails();
    }.bind(this));
  }

  getPedidosDetails(id: string) {
    this.api.getPedidosById(id)
      .subscribe((data: any) => {
        this.pedidos = data;
        console.log(this.pedidos);
        this.isLoadingResults = false;
      });
  }

  deletePedidos(id: any) {
    this.isLoadingResults = true;
    this.api.deletePedidos(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/']);
          this.socket.emit('updatedata', res);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
