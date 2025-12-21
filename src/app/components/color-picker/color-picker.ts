import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  templateUrl: './color-picker.html',
})
export class ColorPickerComponent {
  // optional: default color
  selectedColor = '#0000ff';

  onColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    this.selectedColor = color;

    const rgb = this.getRGB(color);
    const textColor = (rgb[0] < 180 && rgb[1] < 140) ? 'white' : 'black';

    document.documentElement.style.setProperty('--nav-bg', color);
    document.documentElement.style.setProperty('--nav-text', textColor);
  }

  private getRGB(hex: string): [number, number, number] {
    // strip leading #
    hex = hex.replace(/^#/, '');

    // handle shorthand (#abc)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
  }
}
