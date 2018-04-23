"use strict";

import { Component, Inject, Input, OnInit } from "@angular/core";
import { delay, take } from "rxjs/operators";

import { StarkLoggingService, starkLoggingServiceName } from "../../logging/services";
import { StarkRoutingService, starkRoutingServiceName } from "../../routing/services";
import { StarkUserService, starkUserServiceName } from "../../user/services";

const template: string = require("./preloading-page.component.html");
const componentName: string = "starkPreloadingPage";

/**
 * @ngdoc component
 * @name stark.core.pages.preloading:StarkPreloadingPage
 * @description Preloading Page smart component
 *
 */
@Component({
	selector: componentName,
	template: template
})
export class StarkPreloadingPageComponent implements OnInit {

	@Input() public targetState: string;
	@Input() public targetStateParams: object;

	public userFetchingFailed: boolean;
	public correlationId: string;

	public constructor(@Inject(starkLoggingServiceName) private logger: StarkLoggingService,
					   @Inject(starkUserServiceName) private userService: StarkUserService,
					   @Inject(starkRoutingServiceName) private routingService: StarkRoutingService) {
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		// the result is delayed for some milliseconds,
		// otherwise the page will show an ugly flickering (if the profile is fetched immediately) 
		this.userService.fetchUserProfile()
			.pipe(
				take(1), // this ensures that the observable will be automatically unsubscribed after emitting the value
				delay(200)
			)
			.subscribe(
				(/*user: StarkUser*/) => {
					if (this.targetState) {
						this.routingService.navigateTo(this.targetState, this.targetStateParams);
					} else {
						this.routingService.navigateToHome();
					}
				},
				() => {
					this.correlationId = this.logger.correlationId;
					this.userFetchingFailed = true;
				}
			);

		this.logger.debug(componentName + ": controller initialized");
	}

	public reload(): void {
		this.routingService.reload();
	}
}
