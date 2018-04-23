"use strict";

import {Component, Inject, Input, OnInit} from "@angular/core";
import {StarkUser} from "../../user/entities";

import {StarkLoggingService, starkLoggingServiceName} from "../../logging/services";
import {StarkRoutingService, starkRoutingServiceName} from "../../routing/services";
import {StarkUserService, starkUserServiceName} from "../../user/services";

const template: string = require("./login-page.component.html");
const componentName: string = "starkLoginPage";

/**
 * @ngdoc component
 * @name stark.core.pages.login:StarkLoginPage
 * @description Login Page smart component
 *
 */
@Component({
	selector: componentName,
	template: template
})
export class StarkLoginPageComponent implements OnInit {

	@Input() public targetState: string;
	@Input() public targetStateParams: object;

	private users: StarkUser[];
	private hasClicked: boolean;

	public constructor(@Inject(starkLoggingServiceName) private logger: StarkLoggingService,
					   @Inject(starkUserServiceName) private userService: StarkUserService,
					   @Inject(starkRoutingServiceName) private routingService: StarkRoutingService) {
		this.hasClicked = false;
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.users = this.userService.getAllUsers();
		this.logger.debug(componentName + ": controller initialized");
	}

	public authenticateUser(user: StarkUser): void {
		// this check is a workaround for the bug in <md-list-item> that triggers twice the ng-click handler when Enter is pressed :S
		if (!this.hasClicked) {
			if (user instanceof StarkUser) {
				this.hasClicked = true;
				this.userService.setUser(user);
				if (this.targetState) {
					this.routingService.navigateTo(this.targetState, this.targetStateParams);
				} else {
					this.routingService.navigateToHome();
				}
			} else {
				this.hasClicked = false;
				this.logger.error(componentName + ": User is incorrect.");
			}
		}
	}

	public userProfilesAvailable(): boolean {
		return (this.users && this.users.length > 0);
	}

	public getUserRoles(user: StarkUser): string {
		if (user.roles) {
			return user.roles.toString();
		}
		return "";
	}
}
