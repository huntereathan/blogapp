import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFirstlettercapital]'
})
export class FirstlettercapitalDirective implements OnInit {

  constructor(private elRef:ElementRef) { }

  ngOnInit(): void {
    this.elRef.nativeElement.innerHTML = this.elRef.nativeElement.innerHTML.toUpperCase();
    // this.elRef.nativeElement.style. 
    //this.renderer.setStyle(this.elRef.nativeElement, 'text-transform', 'capitalize')
  }

}
