import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "./comment-dialog/comment-dialog.component";
import {OrderService} from "../../shared/services/order.service";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {RefundItem} from "../../shared/models/refund-item.model";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  user: any;
  total: number;
  userId: number;
  refundItems: RefundItem[] = [];

  constructor(private dialog: MatDialog,
              private os: OrderService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.os.orders$.subscribe((orders) => {
      this.orders = orders;
      console.log("order component", this.orders);
    });

    this.auth.currentUser.subscribe((user) => {
      this.user = JSON.parse(user);
      console.log(`Bearer ${this.user.token}`);

      if (this.user && this.user.token) {
       this.userId = this.auth.getUserIdFromToken(`Bearer ${this.user.token}`);
        console.log(this.userId);

        if (this.userId) {
          this.os.getOrdersByUserId(this.userId).subscribe((orders) => {
            this.os.updateOrders(orders);
          });
        }
      }
    });
  }


  requestRefund(order: any, item: any) {
    console.log(order, "item", item);
    console.log(`'item.status': ${item['status']}`);

    if (item) {
      item.status = 'processing';
      this.os.refundRequest(order, item).subscribe(refund => {
        console.log(refund);
        item['status'] = 'processing'; // 'processing'
      }, error => {
        item['status'] = 'error';
      });
    }
  }


  addComment(item: any) {
    // Open a dialog for the comment or navigate to a comment page
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: { item },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("add comment ", result);
      if (result) {
        this.completeRating(item, result, this.userId);
      }
    });
  }

  completeRating(item: any, ratingData: any, userId: number) {
    console.log("complete rate ", item);
    this.os.submitRating(item['product']['id'], ratingData, userId).subscribe(
      response => {
        console.log('Rating submitted:', response);
        // this.router.navigate(item.type === 'jersey' ? [`/jersey-detail/${item.id}`] : [`/cleat-detail/${item.id}`]).catch();
      },
      error => {
        console.error('Error submitting rating:', error);
        alert("Rate successfully!")
      }
    );
  }
}


// getOrderItems(order: any) {
//   console.log(order);
//   return this.refundItems.filter((refundItem) => refundItem.orderId === order.id);
// }
//
// getRefundItemId(orderNumber: number, itemIndex: number): string {
//   return `${orderNumber}_${itemIndex}`;
// }

// this.orders.forEach((order) => {
//   order.products.forEach((product: Product) => {
//     this.refundItems.push({
//       product: product,
//       // productDto
//       userId: this.userId,
//       orderId: order.orderNumber
//     });
//   });
// });
// console.log(this.refundItems);


// console.log(this.refundItems);
// const refundItem = this.refundItems[i]

// const refundItem = this.refundItems.find((rItem) => {
//   console.log(`rItem.product['product']['id']: ${rItem.product['product']['id']}, item.id: ${item.id},
//   rItem['orderId']: ${rItem['orderId']},  order.orderNumber: ${order.orderNumber}`);
//   return rItem.product['product']['id'] === item['product']['id'] && rItem['orderId'] === order.orderNumber
// });
// console.log("request refund", refundItem)
// console.log("refundItem", refundItem);




// this.os.getStatus(refund['id']).subscribe(response => {
//   item.status = response;
// })

