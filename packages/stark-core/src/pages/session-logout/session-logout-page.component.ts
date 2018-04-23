"use strict";

import { Component, Inject, OnInit } from "@angular/core";

import { StarkLoggingService, starkLoggingServiceName } from "../../logging/services";
import { StarkApplicationConfig, STARK_APP_CONFIG } from "../../configuration/entities";

const template: string = require("./session-logout-page.component.html");
const componentName: string = "starkSessionLogoutPage";

/**
 * @ngdoc component
 * @name stark.core.pages.session-logout:StarkSessionLogoutPage
 * @description Session logout page smart component
 *
 */
@Component({
	selector: componentName,
	template: template
})
export class StarkSessionLogoutPageComponent implements OnInit {


	public constructor(@Inject(starkLoggingServiceName) private logger: StarkLoggingService,
					   @Inject(STARK_APP_CONFIG) private appConfig: StarkApplicationConfig) {
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");
	}

	public logon(): void {
		// reload app base URL (stark will redirect to the Login/Preloading page)
		window.open(this.appConfig.baseUrl, "_self");
	}
}
