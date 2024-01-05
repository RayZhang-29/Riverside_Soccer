import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  rated: boolean;
  ratingFrom: FormGroup;

  selectedRating: number = 0;
  highlightedStar: number;
  rating: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder){
  }

  ngOnInit() {
    this.rated = false;
    this.ratingFrom = this.fb.group({
      contents: ['', Validators.required]
    })
  }

  highlightStar(star: number) {
    this.highlightedStar = star;
  }

  resetStars() {
    if (this.rated) {
      this.highlightedStar = this.selectedRating
    } else {
      this.highlightedStar = - 1;
    }
  }

  onRate(rating: number) {
    // Update the item rating here
    this.rated = true;
    this.selectedRating = rating;
    this.rating = rating;
    // console.log('Item:', item);
    console.log('Rating:', rating);
  }

  getFormValue() {
    return {
      ...this.ratingFrom.value,
      rating: this.rating,
    };
  }
}
