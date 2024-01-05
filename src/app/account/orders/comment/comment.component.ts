import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comments: any[] = [];
  @Input() readonly: boolean = false;
  newComment: string = '';


  constructor() { }

  ngOnInit(): void {
    console.log("in comment ", this.comments);
  }

  getUsernameFromEmail(email: string): string {
    const username = email.split('@')[0];
    return username;
  }

  // addComment(): void {
  //   if (this.newComment.trim()) {
  //     this.comments.push(this.newComment);
  //     this.newComment = '';
  //   }
  // }
}
