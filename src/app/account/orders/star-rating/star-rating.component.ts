import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() max: number = 5;
  @Input() rate: number = 0;
  @Input() readonly: boolean = false;
  @Output() rateChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onHover(value: number): void {
    this.rate = value;
  }

  onLeave(value: number): void {
    this.rateChange.emit(this.rate);
  }
}
