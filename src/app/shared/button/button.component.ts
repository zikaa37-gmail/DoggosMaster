import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BUTTON_TYPE } from './button.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type = BUTTON_TYPE.PRIMARY;
  @Input() text!: string;
  @Output() buttonClicked = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClicked.emit();
  }
}
