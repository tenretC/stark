"use strict";

import { Component, Inject, OnInit } from "@angular/core";

import { StarkApplicationConfig, STARK_APP_CONFIG } from "../../configuration/entities";
import { StarkLoggingService, starkLoggingServiceName } from "../../logging/services";

const template: string = require("./session-expired-page.component.html");
const componentName: string = "starkSessionExpiredPage";

/**
 * @ngdoc component
 * @name stark.core.pages.session-expired:StarkSessionExpiredPage
 * @description Session expired page smart component
 *
 */
@Component({
	selector: componentName,
	template: template
})
export class StarkSessionExpiredPageComponent implements OnInit {
	
	public constructor(@Inject(starkLoggingServiceName) private logger: StarkLoggingService,
					   @Inject(STARK_APP_CONFIG) private appConfig: StarkApplicationConfig) {
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");
	}

	public reload(): void {
		// reload app base URL (stark will redirect to the Login/Preloading page)
		window.open(this.appConfig.baseUrl, "_self");
	}
}
