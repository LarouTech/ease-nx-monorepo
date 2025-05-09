import { Component, computed, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'small' | 'medium' | 'large';
type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';
type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter';
type ButtonVariant =
  | 'default'
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

@Component({
  selector: 'button-custom',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true,
})
export class ButtonComponent implements OnInit {
  name = input();
  textTransform = input<TextTransform>('capitalize');
  type = input<ButtonType>('button');
  color = input<string>();
  backgroundColor = input('');
  variant = input<ButtonVariant>('default');
  size = input<ButtonSize>('medium');
  fontWeight = input<FontWeight>('normal');
  borderColor = input('transparent');
  borderRadius = input('8px');
  borderWidth = input('0');
  borderStyle = input('solid');
  disabled = input(false);
  icon = input<string>();
  iconLocation = input<'before' | 'after'>('after');
  isIconAnimated = input(false);
  customPadding = input<string>();

  padding = computed(() => {
    switch (this.size()) {
      case 'small':
        return '4px 8px';
      case 'medium':
        return '4px 12px';
      case 'large':
        return '4px 12px';
      default:
        return '8px 12px';
    }
  });

  fontSize = computed(() => {
    switch (this.size()) {
      case 'small':
        return '12px';
      case 'medium':
        return '16px';
      case 'large':
        return '20px';
      default:
        return '16px';
    }
  });

  iconSize = computed(() => {
    switch (this.size()) {
      case 'small':
        return '16px';
      case 'medium':
        return '20px';
      case 'large':
        return '24px';
      default:
        return '20px';
    }
  });

  clickEvent = output<MouseEvent>();

  ngOnInit() {
    console.log(this.textTransform());
  }

  onClick(event: MouseEvent) {
    this.clickEvent.emit(event);
  }
}
