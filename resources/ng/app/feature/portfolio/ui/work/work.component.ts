import { Component, Input } from '@angular/core';

export interface Work {
  company?: string,
  project?: string,
  role?: string,
  description: string
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  @Input() work!: Work;
}
