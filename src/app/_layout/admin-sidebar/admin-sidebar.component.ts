import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/admin/user",
    title: "Users & Verification",
    icon: "ni-single-02 text-blue",
    class: "",
  },
  {
    path: "/admin/rateandcharge",
    title: "Rates & Charges",
    icon: "ni-money-coins text-orange",
    class: "",
  },
  {
    path: "/user-profile",
    title: "Our Payment Details",
    icon: "ni-credit-card text-yellow",
    class: "",
  },
];

@Component({
  selector: "app-admin-sidebar",
  templateUrl: "./admin-sidebar.component.html",
  styleUrls: ["./admin-sidebar.component.css"],
})
export class AdminSidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.authService.destroyToken();
    this.router.navigate(["/auth/login"]);
  }
}
