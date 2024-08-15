import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateManagementService } from '../../core/services/state-management.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  state = inject(StateManagementService);

  toggleMenu() {
    const isOpen = this.state.isMenuOpen();
    this.state.isMenuOpen.set(!isOpen);
  }
}
