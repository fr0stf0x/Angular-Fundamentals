import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Toastr, TOASTR_TOKEN } from '../../common/toastr.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {

    profileForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;

    constructor(private auth: AuthService,
        private router: Router,
        @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

    ngOnInit() {
        this.firstName = new FormControl(this.auth.currentUser.firstName,
            [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.lastName = new FormControl(this.auth.currentUser.lastName,
            [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
        });
    }

    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.auth.updateCurrentUser(formValues.firstName, formValues.lastName)
                .subscribe(() => {
                    this.toastr.success('Update info success fully');
                    this.router.navigate(['/events']);
                });
        }
    }

    logout() {
        this.auth.logout().subscribe(() => {
            this.router.navigate(['/events']);
        });
    }

    validateFirstName() {
        return this.firstName.valid || this.firstName.untouched;
    }

    validateLastName() {
        return this.lastName.valid || this.lastName.untouched;
    }

    cancel() {
        this.router.navigate(['/events']);
    }
}
