import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../api/user.service";
import { HttpClient } from "@angular/common/http";
import { Toast } from "@ionic-native/toast/ngx";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  submitted = false;
  authForm: FormGroup;
  type: any = "password";
  log: any = false;

  fieldTextType: boolean = false;

  constructor(
    public UserService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toast: Toast
  ) {
    this.createAuthForm();
    // if (
    //   localStorage.getItem('uid') == '' ||
    //   localStorage.getItem('uid') == null ||
    //   localStorage.getItem('uid') == undefined
    // ) {
    //   this.log = true;
    //   this.createAuthForm();
    // } else {
    //   this.log = false;
    //   console.log(localStorage.getItem('uid'));
    //   var data = {
    //     userid: localStorage.getItem('uid'),
    //   };
    //   this.UserService.login(data).subscribe(
    //     (res) => {
    //       if (res.type == 'user') {
    //         // this.router.navigate(['/tabs']);
    //       } else {
    //         // this.router.navigate(['/tabsinfluencer']);
    //       }
    //     },
    //     (err) => {}
    //   );
    // }
  }

  ngOnInit() {}

  /*******LOADER******** */
  /************CREATE A AUTH FORM************ */
  createAuthForm() {
    this.authForm = this.formBuilder.group(
      {
        phone: ["", [Validators.required, Validators.pattern("[0-9]{4,17}")]],
        password: ["", [Validators.required]],
      },
      {}
    );
  }

  togglePassword() {
    console.log(this.fieldTextType);

    this.fieldTextType = !this.fieldTextType;
  }

  /********VIEW PASSWORD/HIDDEN PASSWORD********* */
  changeType(type: string) {
    // in your case function name is type

    if (
      this.authForm.value.password !== null &&
      this.authForm.value.password !== "" &&
      this.authForm.value.password !== undefined
    ) {
      switch (type) {
        case "password":
          this.type = "text";
          break;
        case "text":
          this.type = "password";
          break;
        default:
      }
    } else {
      console.log("else");
      return false;
    }
  }

  /************AUTH FORM ON SUBMIT************ */
  onSubmit(value: any): void {
    this.submitted = true;
    // Stop if the form validation has failed
    if (this.authForm.invalid) {
      console.log("SUBMITED VALUES", this.authForm);
      return;
    }

    //this.presentLoadingWithOptions();
    console.log(value);
    var data = {
      phone: value.phone,
      password: value.password,
    };
    this.UserService.login(data).subscribe((res) => {
      console.log(res);
      if (res.status === 1) {
        console.log(res.data.id);
        console.log("logged in success");
        localStorage.setItem("userid", res.data.id);

        this.toast.show(res.msg, "5000", "center").subscribe((toast) => {
          console.log(toast);
        });
        this.router.navigate(["/tabs/tab1"]);
      } else if (res.status === 2) {
        this.toast.show(res.msg, "5000", "center").subscribe((toast) => {
          console.log(toast);
        });
      } else {
        this.toast.show(res.msg, "5000", "center").subscribe((toast) => {
          console.log(toast);
        });
      }
    });
  }
  //       // this.loadingController.dismiss();
  //       if (res.status == 0) {
  //         if (res.alldata.block == 0) {
  //           // this.toast
  //           //   .show(
  //           //     `Sorry , Your Account has been Blocked , you cannot login until you are unblocked`,
  //           //     '5000',
  //           //     'center'
  //           //   )
  //           //   .subscribe((toast) => {});
  //         } else {
  //           localStorage.setItem('uid', res.data);
  //           console.log(localStorage.getItem('uid'));
  //           // this.toast
  //           //   .show(`Logged In Successfully`, '5000', 'center')
  //           //   .subscribe((toast) => {});
  //           this.onReset();
  //         //  this.router.navigate(['/tabs']);
  //         }
  //       } else if (res.status == 1) {
  //        // this.toast.show(res.msg, '5000', 'center').subscribe((toast) => {});
  //       } else if (res.status == 2) {
  //       //  this.toast.show(res.msg, '5000', 'center').subscribe((toast) => {});
  //       }
  //     },
  //     (err) => {
  //      // this.loadingController.dismiss();
  //     //   this.toast
  //     //     .show(`Network Error , Try Again!`, '5000', 'center')
  //     //     .subscribe((toast) => {});
  //     // }
  //   //);
  // }

  /***********RESET MY FORM******* */
  onReset() {
    this.submitted = false;
    this.authForm.reset();
  }

  /*****GET AUTH CONTROLS FOR AUTH FORM****** */
  get form() {
    return this.authForm.controls;
  }

  /*******LOGIN WITH INSTAGRAM********** */
}
