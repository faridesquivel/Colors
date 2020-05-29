import { Component } from '@angular/core';
import invert, { RGB, RgbArray, HexColor, BlackWhite } from 'invert-color';
import { ifError } from 'assert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  randomColor: string;
  invertedRandomColor: string;
  invertedAproxColor = '#000000';
  selecting = false;
  selectText = 'Buscar color';
  r = 255;
  g = 255;
  b = 255;
  rGoal: number;
  gGoal: number;
  bGoal: number;
  rError = 0;
  gError = 0;
  bError = 0;
  rRelative = 0;
  gRelative = 0;
  bRelative = 0;
  randomRGB: any;
  rgb: string;
  tipR: string;
  tipG: string;
  tipB: string;
  seeTips = false;
  tipsText = 'Ver tips';
  showErrors = false;
  showErrorsText = 'Calcular exactitud';

  constructor() {
    this.randomColor = this.getRandomColor();
    this.invertedRandomColor = invert(this.randomColor, true);
    this.randomRGB = this.hexToRgb(this.randomColor);
    this.setRGB();
    this.onCalculate();
  }

  toggleTips() {
    this.seeTips = !this.seeTips;
    if (this.seeTips) {
      this.tipsText = 'Ocultar tips';
    } else {
      this.tipsText = 'Ver tips';
    }
  }

  toggleErrors() {
    this.showErrors = !this.showErrors;
    if (this.showErrors) {
      this.showErrorsText = 'Ocultar porcentajes';
    } else {
      this.showErrorsText = 'Calcular exactitud';
    }
  }

  onCalculate() {
    console.log(this.randomRGB);
    this.rError = Math.abs((this.randomRGB.r - this.r));
    this.gError = Math.abs((this.randomRGB.g - this.g));
    this.bError = Math.abs((this.randomRGB.b - this.b));

    this.rRelative = (this.rError * 100) / 255;
    this.gRelative = (this.gError * 100) / 255;
    this.bRelative = (this.bError * 100) / 255;

  }

  tipRFunc() {
    if (this.rError > 10) {
      this.tipR = 'sad';
    } else {
      this.tipR = 'happy';
    }
  }

  tipGFunc() {
    if (this.gError > 10) {
      this.tipG = 'sad';
    } else {
      this.tipG = 'happy';
    }
  }

  tipBFunc() {
    if (this.bError > 10) {
      this.tipB = 'sad';
    } else {
      this.tipB = 'happy';
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  changeRealColor() {
    this.randomColor = this.getRandomColor();
    this.invertedRandomColor = invert(this.randomColor, true);
    this.randomRGB = this.hexToRgb(this.randomColor);
    this.onCalculate();
  }

  setColor(color: string) {
    this.randomColor = color;
    this.invertedRandomColor = invert(this.randomColor, true);
    console.log('Will set rgb with color', color);
    this.randomRGB = this.hexToRgb(this.randomColor);
    this.toggleSelecting();
    this.onCalculate();
  }

  rc(event) {
    this.r = event.value;
    console.log(this.r);
    this.setRGB();
  }

  gc(event) {
    this.g = event.value;
    console.log(this.g);
    this.setRGB();
  }

  bc(event) {
    this.b = event.value;
    console.log(this.b);
    this.setRGB();
  }

  setRGB() {
    this.rgb = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    console.log('New rgb: ', this.rgb);
    this.invertedAproxColor = invert([this.r, this.g, this.b], true);
    this.onCalculate();
    this.tipRFunc();
    this.tipGFunc();
    this.tipBFunc();
  }

  toggleSelecting() {
    if (this.selecting === true) {
      this.selectText = 'Buscar color';
    } else {
      this.selectText = 'Cerrar';
    }
    this.selecting = !this.selecting;
  }
}
