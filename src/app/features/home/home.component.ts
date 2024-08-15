import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';
import { BUTTON_TYPE } from '../../shared/button/button.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  router = inject(Router);
  BUTTON_TYPE = BUTTON_TYPE;

  navigate() {
    this.router.navigate(['dog-breeds']);
  }
}
