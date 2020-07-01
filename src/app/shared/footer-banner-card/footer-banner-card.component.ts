import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-footer-banner-card",
  templateUrl: "./footer-banner-card.component.html",
  styleUrls: ["./footer-banner-card.component.css"],
})
export class FooterBannerCardComponent implements OnInit {
  @Input() imgUrl;

  constructor() {}

  ngOnInit() {}
}
