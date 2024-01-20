import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { WorkComponent } from './ui/work/work.component';
import { TechComponent } from './ui/tech/tech.component';
import { ExperienceComponent } from './ui/experience/experience.component';
import { FeedbackComponent } from './ui/feedback/feedback.component';
import { FeedbacksComponent } from './ui/feedbacks/feedbacks.component';
import { NavbarComponent } from '../../shared/ui/navbar/navbar.component';
import { ParalaxDirective } from '../../shared/utils/paralax.directive';
import { SkillComponent } from './ui/skill/skill.component';


@NgModule({
    imports: [
        CommonModule,
        PortfolioRoutingModule,
        PortfolioComponent,
        WorkComponent,
        TechComponent,
        ExperienceComponent,
        FeedbackComponent,
        FeedbacksComponent,
        NavbarComponent,
        ParalaxDirective,
        SkillComponent
    ]
})
export class PortfolioModule { }
