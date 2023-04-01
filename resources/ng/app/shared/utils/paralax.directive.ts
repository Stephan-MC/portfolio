import { Directive, HostListener, Input, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appParalax]'
})
export class ParalaxDirective {
  @Input() root!: any
  @Input() pDirection!: 'horizontal' | 'vertical' | 'both'
  @Input() pRatio!: number
  @Input() pXRatio!: number
  @Input() pYRatio!: number
  @Input() pTop!: number | null


  private rect!: DOMRect
  private top!: number

  constructor(private element: ElementRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnInit() {
  }
  ngAfterViewInit () {
    this.rect = this.element.nativeElement.getBoundingClientRect()
    this.element.nativeElement.style.position = 'relative'
    this.top = Number(this.pTop ?? this.element.nativeElement.style.top ?? 0)
  }

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    let top = this.pTop ?? this.top
    let formula  = top - (this.pRatio * event.target.scrollingElement.scrollTop)
    this.element.nativeElement.style.top = formula + "px"
  }
}
