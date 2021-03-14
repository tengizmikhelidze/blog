import {Component, Input, OnInit} from '@angular/core';
import {SliderContent} from '../../interfaces/slider-content.interface';

@Component({
  selector: 'app-shared-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() sliderContent: Array<SliderContent>;

  public index = 0;
  public prevDisabled = false;
  public nextDisabled = false;

  constructor() {}

  ngOnInit(): void {
    this.checkForDisable();
  }

  nextSlide(): void {
    this.index++;
    this.checkForDisable();
  }

  prevSlide(): void {
    this.index--;
    this.checkForDisable();
  }

  nextIsAllowed(): void {
    this.nextDisabled = this.sliderContent.length === this.index + 1;
  }
  prevIsAllowed(): void {
    this.prevDisabled = this.index === 0;
  }

  checkForDisable(): void {
    this.prevIsAllowed();
    this.nextIsAllowed();
  }
}
