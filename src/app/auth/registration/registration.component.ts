import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserToRegister } from "../models/UserToRegister";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  signUpForm1: FormGroup;
  signUpForm2: FormGroup;
  signUpForm3: FormGroup;
  signUpForm4: FormGroup;

  isEmailValid = true;
  isPhoneValid = true;

  isVerifyingEmail = false;
  isVerifyingPhone = false;

  isReferralCodeValid = false;

  isFormSubmitted = false;
  isCompleted = false;
  canMoveToFinalStage = false;
  referralId;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signUpForm1 = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      dateofbirth: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.signUpForm2 = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      postalcode: new FormControl("", [Validators.required]),
    });
    this.signUpForm3 = this.formBuilder.group({
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      iagree: new FormControl(false),
    });

    this.referralId = this.route.snapshot.queryParamMap.get("referrerCode");

    this.verifyReferralCode();
  }

  verifyReferralCode() {
    return this.authService
      .doesReferralCodeExist(this.referralId)
      .subscribe((res) => {
        if (!res) {
          this.isReferralCodeValid = false;
          this.toastr.error("Referral code is invalid!");
        } else {
          this.isReferralCodeValid = true;
        }
      });
  }

  verifyEmail() {
    this.isVerifyingEmail = true;
    const email = this.signUpForm2.get("email").value;
    this.doesEmailExist(email).subscribe((res) => {
      if (res) {
        this.isEmailValid = false;
      } else {
        this.isEmailValid = true;
      }
      this.isVerifyingEmail = false;
    });
  }

  verifyPhone() {
    this.isVerifyingPhone = true;
    const phone = this.signUpForm2.get("phone").value;
    const phoneToSend: string = phone.replace("+", " ").trim();
    if (phoneToSend.length < 5) {
      return false;
    }
    this.doesPhoneExist(phoneToSend).subscribe((res) => {
      if (res) {
        this.isPhoneValid = false;
      } else {
        this.isPhoneValid = true;
      }
      this.isVerifyingPhone = false;
    });
  }

  doesEmailExist(email: string) {
    return this.authService.doesEmailExist(email);
  }

  doesPhoneExist(phone: string) {
    return this.authService.doesPhoneNumberExist(phone);
  }

  onStep1Next(params) {
    if (this.signUpForm1.invalid) {
      this.toastr.error("User Information form was not filled correctly");
    }
  }
  onStep2Next(params) {
    if (!this.isEmailValid) {
    }
    if (!this.isPhoneValid) {
      this.signUpForm1.setErrors({
        phoneNotUnique: true,
      });
    }
    if (this.signUpForm2.invalid) {
      this.toastr.error("Contact Information form was not filled correctly");
    }
    if (!this.isReferralCodeValid) {
      this.toastr.error("Referral code is invalid!");
    }
    // this.verifyReferralCode();
  }
  onStep3Next(params) {
    if (
      this.signUpForm3.invalid ||
      this.signUpForm3.get("iagree").value == false
    ) {
      this.toastr.error("Address Information form was not filled correctly");
    } else {
      this.canMoveToFinalStage = true;
    }
    // this.verifyReferralCode();
  }
  onComplete(params) {
    const isFormUserValid = this.signUpForm1.valid;
    const isFormContactValid = this.signUpForm2.valid;
    const isFormAddressValid = this.signUpForm3.valid;

    if (isFormUserValid && isFormContactValid && isFormAddressValid) {
      this.isCompleted = true;
      const userPayload: UserToRegister = {
        firstName: this.signUpForm1.get("firstName").value,
        lastName: this.signUpForm1.get("lastName").value,
        password: this.signUpForm1.get("password").value,
        gender: this.signUpForm1.get("gender").value,
        dateOfBirth: this.signUpForm1.get("dateofbirth").value,

        phoneNumber: this.signUpForm2.get("phone").value,
        email: this.signUpForm2.get("email").value,
        postalCode: this.signUpForm2.get("postalcode").value,

        address: this.signUpForm3.get("address").value,
        city: this.signUpForm3.get("city").value,
        state: this.signUpForm3.get("state").value,
        country: this.signUpForm3.get("country").value,
      };

      this.registerUser(this.referralId, userPayload).subscribe(
        (_) => {
          this.isFormSubmitted = true;
        },
        (error) => {
          this.toastr.error("Something went wrong");
        }
      );
    } else {
      this.toastr.error("Kindly fill the form appropriately");
    }
  }

  registerUser(referralId: string, payload: UserToRegister): Observable<any> {
    return this.authService.registerUser(referralId, payload);
  }
}
