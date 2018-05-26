import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
// tslint:disable-next-line:component-class-suffix
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: "app-login-box",
    templateUrl: "./login-box.component.html",
    styleUrls: ["./login-box.component.css"]
})
export class LoginBoxComponent implements OnInit {
    minLength = 4;
    maxLength = 25;
    form = new FormControl("", [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
    ]);

    matcher = new MyErrorStateMatcher();

    constructor() { }

    ngOnInit(): void {
    }

    onSubmit() {
        console.log("hey poulayman", this.form.hasError, this.form);
    }

}
