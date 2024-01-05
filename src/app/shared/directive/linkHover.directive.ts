import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appLinkHover]'
})
export class LinkHoverDirective {
  private defaultColor: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.defaultColor = this.el.nativeElement.style.color;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    // '#f3af30'
    this.changeColor('white');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.changeColor(this.defaultColor);
  }

  private changeColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }

}
