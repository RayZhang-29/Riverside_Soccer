import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../shared/services/products.service";
import { ChartDataset } from 'chart.js';
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {
  startDate: string;
  endDate: string;

  orders: any[] = [];

  pageSize = 5; // Items per page
  pageSizeOptions: number[] = [5, 10, 25, 100]; // Page size options
  totalOrders = 0; // Total number of products
  pagedOrders: any[] = [];

  constructor(private productsService: ProductsService,
              private os: OrderService) {
  }

  ngOnInit() {
    this.os.getAllOrders().subscribe((orders: any[]) => {
      this.orders = orders;
      this.totalOrders = this.orders.length;
      this.paginateOrders(0, this.pageSize);
    }, error => {
      console.error('Error fetching orders', error);
    });
  }

  public topSellingProductsChartData: ChartDataset[] = [];
  public topSellingProductsChartLabels: string[] = [];
  topSellingProductsChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Top Selling Products',
      },
    },
  };

  updateTopSellingProducts(startDate: string, endDate: string) {
    console.log(startDate, endDate);
    if (startDate === undefined && endDate === undefined) {
      endDate = new Date().toISOString().slice(0, 10);
      startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 10);
      this.startDate = startDate;
      this.endDate = endDate;
    } else if (startDate === undefined) {
      startDate = new Date(new Date(endDate).getFullYear() - 1, new Date(endDate).getMonth(), new Date(endDate).getDate()).toISOString().slice(0, 10);
      this.startDate = startDate;
    } else if (endDate === undefined) {
      endDate = new Date().toISOString().slice(0, 10);
      this.endDate = endDate;
    }

    this.productsService.getTopSellingProducts(startDate, endDate).subscribe(data => {
      this.topSellingProductsChartLabels = data.map(item => item.productName);
      this.topSellingProductsChartData = [
        { data: data.map(item => item.sales), label: 'Sales' }
      ];
    });
  }

  paginateOrders(startIndex: number, endIndex: number) {
    this.pagedOrders = this.orders.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginateOrders(startIndex, endIndex);
  }

}
