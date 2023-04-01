import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  @Input() progress!: number
  @Input() label!: string
  @Input() size: number = 100
  @Input() strokeWidth: number = 2

  center!: number

  /** The radius of circular progress */
  radius!: number

  /** The circumference of the circle */
  dashArray!: number
  dashOffset!: number
  viewBox!: string
  transform!: string

  ngOnInit() {
    this.viewBox = `0 0 ${this.size} ${this.size}`
    this.center = this.size / 2
    this.transform = `rotate(-90) translate(${-this.size} 0)`
    this.radius = this.center - this.strokeWidth;
    this.dashArray = 2 * Math.PI * this.radius
    this.dashOffset = this.dashArray * ((100 - this.progress) / 100)
  }

}
