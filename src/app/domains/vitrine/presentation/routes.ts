// Routes du site vitrine ATHL, chargées en lazy-loading depuis app.routes.ts.
import { Routes } from '@angular/router';
import { VitrineLayoutComponent } from './layout/vitrine-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { TeamComponent } from './pages/team/team.component';
import { TeamDetailComponent } from './pages/team-detail/team-detail.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CareersComponent } from './pages/careers/careers.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: VitrineLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'a-propos', component: AboutComponent },
      { path: 'actualites', component: NewsComponent },
      { path: 'actualites/:slug', component: NewsDetailComponent },
      { path: 'equipe', component: TeamComponent },
      { path: 'equipe/:id', component: TeamDetailComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'services/:slug', component: ServiceDetailComponent },
      { path: 'projets', component: ProjectsComponent },
      { path: 'carrieres', component: CareersComponent },
      { path: 'devis', component: QuoteComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'recherche', component: SearchComponent },
    ],
  },
];
