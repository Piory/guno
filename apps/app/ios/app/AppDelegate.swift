import AppAuth
import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate, RNAppAuthAuthorizationFlowManager {
	public weak var authorizationFlowManagerDelegate: RNAppAuthAuthorizationFlowManagerDelegate?

	override func application(
		_ application: UIApplication,
		didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
	) -> Bool {
		self.moduleName = "app"
		self.dependencyProvider = RCTAppDependencyProvider()
		self.initialProps = [:]
		return super.application(application, didFinishLaunchingWithOptions: launchOptions)
	}

	override func sourceURL(for bridge: RCTBridge) -> URL? {
		self.bundleURL()
	}

	override func bundleURL() -> URL? {
		#if DEBUG
			RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
		#else
			Bundle.main.url(forResource: "main", withExtension: "jsbundle")
		#endif
	}

	override func application(
		_ app: UIApplication,
		open url: URL,
		options: [UIApplication.OpenURLOptionsKey: Any] = [:]
	) -> Bool {
		if let resumed = authorizationFlowManagerDelegate?.resumeExternalUserAgentFlow(with: url),
			resumed
		{
			return true
		}
		return RCTLinkingManager.application(app, open: url, options: options)
	}
}
