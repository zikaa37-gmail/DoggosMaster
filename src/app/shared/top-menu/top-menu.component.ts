import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateManagementService } from '../../core/services/state-management.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {
  state = inject(StateManagementService);

  toggleMenu() {
    const isOpen = this.state.isMenuOpen();
    this.state.isMenuOpen.set(!isOpen);
  }
}
