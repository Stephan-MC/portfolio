import { Component, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common'
import { BehaviorSubject, interval, of, throttle, debounce, Observable, map } from 'rxjs'
import { Work } from './ui/work/work.component'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  viewHeight: number = 0
  scroll: number = 0
  anchors: string[] = ['hero', 'works', 'experiences', 'feedbacks']
  anchor$: BehaviorSubject<string> = new BehaviorSubject('')
  works$: Observable<Work[]> = of([
    {
      company: 'Zaza Inc',
      project: 'Zaza website',
      role: 'Frontend & Backend devolper',
      description: 'currently working at Zaza Inc. as a web and only developer for their official website'
    },
    {
      company: 'Digtal',
      project: 'Digtal website',
      role: 'React Frontend devolper',
      description: 'Digtal is a growing group of your innovating developers bringing software solutions to small, medium or large scale companies. I am current working there as React frontend developer'
    },
  ])
  skills$: Observable<Record<string, number>> = of({
    html: 78,
    css: 75,
    javascript: 75,
    typescript: 83,
    angular: 58,
    react: 80,
    vue: 94,
    laravel: 80,
  })

  anchorIndex: { up: number, down: number } = { up: 0, down: 0 }
  nextAnchor: string = ''

  constructor(public viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.anchor$.pipe(debounce(() => interval(200))).subscribe(value => this.navigateToAnchor(value))
  }

  ngAfterViewInit() {
    this.viewHeight = window.innerHeight
    this.scroll = window.scrollY
    this.anchor$.next('hero')
  }

  ngOnDestroy() {
    this.anchor$.unsubscribe()
  }

  parallaxValue(number: number): number {
    return this.scroll > (number - 1) * this.viewHeight && this.scroll < number * this.viewHeight ? -1 : 0
  }

  resetScroll() {
    window.scrollTo(0, 0)
  }

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    this.scroll = event.target?.scrollingElement.scrollTop
  }

  @HostListener('window:orientationchange', ['$event']) onOrientationChange(event: any) {
    this.resetScroll()
    this.viewHeight = event.target?.screen.height
    this.anchor$.next(this.anchor$.value)
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.viewHeight = event.target?.screen.height
    this.anchor$.next(this.anchor$.value)
  }

  navigateToAnchor(anchor: string, offset: [number, number] = [0, 0]) {
    // if (this.anchors.findIndex(a => a == anchor) == 0)
    //   this.viewportScroller.setOffset([0, 96])

    this.viewportScroller.setOffset(offset)

    this.viewportScroller.scrollToAnchor(anchor);

    let index = this.anchors.indexOf(anchor)

    if (index >= this.anchors.length - 1) {
      this.anchorIndex.down = this.anchors.length - 1
      this.anchorIndex.up = this.anchorIndex.down - 1
    }
    else if (index <= 0) {
      this.anchorIndex.up = 0
      this.anchorIndex.down = this.anchorIndex.up + 1
    }
    else {
      this.anchorIndex.up = index - 1
      this.anchorIndex.down = index + 1
    }
  }
}
