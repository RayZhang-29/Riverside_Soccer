import {Component, OnInit} from '@angular/core';
import {RefundItem} from "../../shared/models/refund-item.model";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  // refundItem: RefundItem;
  refunds: any[] = [];

  constructor(private os: OrderService) {
  }

  ngOnInit(): void {
    this.os.getRefunds().subscribe((refunds) => {
      console.log(refunds);
      this.refunds = refunds;
    })
  }

  approveRefund(refundId: number) {
    this.os.approveRefund(refundId).subscribe(response => {
      const index = this.refunds.findIndex(
        (refundResponse) => refundResponse.refund.id === refundId
      );
      if (index !== -1) {
        this.refunds[index].refund.status = 'approved';
      }
    },error => {
      console.log(error);
    })
  }

  refuseRefund(refundId: number) {
    this.os.refuseRefund(refundId).subscribe(response => {
      const index = this.refunds.findIndex(
        (refundResponse) => refundResponse.refund.id === refundId
      );
      if (index !== -1) {
        this.refunds[index].refund.status = 'refused';
      }
    }, error => {
      console.log(error);
    })
  }
}
