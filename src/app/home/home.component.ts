import { Component } from '@angular/core';
import {Carousel} from "../shared/models/carousel";
import {Product} from "../shared/models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  slides: Carousel[] = [
    // {url: 'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background.png', title: 'predator'},
    {url: 'https://cdn.shopify.com/s/files/1/0570/9706/0542/files/Diadora_W_1520x.progressive.jpg?v=1677171670', title: 'predator'},
    {url: 'https://cdn.shopify.com/s/files/1/0570/9706/0542/files/u90_Man_City_Banner_Website_1520x.progressive.jpg?v=1674843806', title: 'Predator'},
    {url: 'https://cdn.shopify.com/s/files/1/0570/9706/0542/files/Nike_Elite_slider_1520x.png?v=1661877395', title: 'jerseys'}
  ];

  newProducts: Product[] | undefined = [
    {id: 1, name: 'predator', age: 'Adult', gender: 'Male', brand: 'Adidas', size: ['8', '9', '10', '11', '12'], price: 270, type: 'cleat', rating: 2, comments: ['great', 'cool'], color: 'blue', image:'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/090d9384a2904ef2acf5af7900e0ee3c_9366/POGBA_PREDATOR_ACCURACY_PP.3_FG_J_Blue_H03773_22_model.jpg'},
    {id: 2, name: 'x', age: 'Adult', gender: 'Female', brand: 'Adidas', size: ['8', '9', '10', '11', '12'], price: 270, type: 'cleat', rating: 2, comments: ['great', 'cool'], color: 'white', image:'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7f8ba632b28544cd83c5af8d00a41e55_9366/X_SPEEDPORTAL._3_TF_White_ID9327_22_model.jpg'},
    {id: 3, name: 'mercurial', age: 'Youth', gender: 'Male', brand: 'Nike', size: ['8', '9', '10', '11', '12'], price: 270, type: 'cleat', rating: 2, comments: ['great', 'cool'], color: 'red', image:'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d41328a6-d115-46f6-ad70-29767d3c91fa/vapor-edge-pro-360-2-mens-football-cleats-WkQJFN.png'},
    {id: 21, name: 'man city training jersey', color: 'white', brand: 'Puma', rating: 3, comments: ['great!', 'awesome'], size: ['XS', 'S', 'XL'], price: 90, type: 'jersey', age: 'Adult', gender: 'Male', image: 'https://cdn.shopify.com/s/files/1/0570/9706/0542/products/ScreenShot2022-07-26at1.03.00PM_clipped_rev_1_8235fb18-ec95-44c2-b702-e304656516fd_755x.progressive.png.jpg?v=1666821691'},
    {id: 22, name: 'barcelona training jersey', color: 'yellow', brand: 'Nike', rating: 3, comments: ['great!', 'awesome'], size: ['WXS', 'WS', 'WXL'], price: 120, type: 'jersey',age: 'Adult', gender: 'Female', image: 'https://cdn.shopify.com/s/files/1/0570/9706/0542/products/DR5079-729-PHSFH001_clipped_rev_1_4ced1ff6-a368-4156-84ff-fd1f27c57659_755x.progressive.png.jpg?v=1677778987'},
    {id: 23, name: 'barcelona training jersey youth', color: 'white', brand: 'Nike', rating: 3, comments: ['great!', 'awesome'], size: ['YS', 'YL'], price: 60, type: 'jersey', age: 'Youth', gender: 'Female', image: 'https://cdn.shopify.com/s/files/1/0570/9706/0542/products/ScreenShot2022-09-26at5.42.13PM_clipped_rev_1_8b6cf9f9-1029-4848-8a65-3d2bf83f254d_755x.progressive.png.jpg?v=1666814228'}
  ]
}
