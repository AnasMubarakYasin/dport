import ClientApi from './client-api';
import ClientStore from './client';
import { urlBase64ToUint8Array } from './helper';

// import type { WebPushPayload, WebPushResponse } from '$server/global';

type BeforeInstallPromptEvent = Event & {
	userChoice: Promise<any>;
	prompt: () => Promise<string>;
	platforms: string[];
};
type CustomNavigator = Navigator & {
	getInstalledRelatedApps(): Promise<[]>;
};
type SyncManager = {
	sync: {
		register(tag: string): Promise<void>;
		getTags(): Promise<string>;
	};
};
type PeriodicSyncManager = {
	periodicSync: {
		register(tag: string, options: { minInterval: number }): Promise<void>;
		unregister(tag: string): Promise<void>;
		getTags(): Promise<string>;
	};
};

export class Service {
	public channel!: BroadcastChannel;
	public clientApi!: ClientApi;
	public client!: ClientStore;
	public installed = false;
	public options: { debug: boolean };
	protected message_handlers = new Set<Function>();
	constructor(options: { debug?: boolean }) {
		this.options = Object.assign({}, options, { debug: true });
	}
	public init() {
		this.channel = new BroadcastChannel('main_channel');
		this.channel.addEventListener('message', (event) => {
			this.options.debug && console.log(event);
			for (const handler of this.message_handlers) {
				handler(event.data);
			}
		});
		this.clientApi = new ClientApi({
			base: location.origin + '/server/push',
			debug: this.options.debug,
		});
		this.client = new ClientStore({ debug: this.options.debug }).init();
	}
	public async prompt() {
		console.error("[Service] prompt not binded");
		return "";
	}
	public async update() {
		const service = await navigator.serviceWorker.ready;
		await service.update();
		return this;
	}
	public async register(url: string, { prevent_prompt = false, install_found = () => { }, update_found = () => { } } = {}) {
		if ('ServiceWorker' in window) {
			window.addEventListener('beforeinstallprompt', (event: Event) => {
				console.log('[Service] window beforeinstallprompt');
				this.options.debug && console.log(event);
				this.prompt = (event as BeforeInstallPromptEvent).prompt.bind(event);
				install_found();
				if (prevent_prompt) {
					event.preventDefault();
				}
			});
			window.addEventListener('appinstalled', (event) => {
				console.log('[Service] window appinstalled');
				this.options.debug && console.log(event);
				this.installed = true;
			});

			navigator.serviceWorker.startMessages();
			navigator.serviceWorker.addEventListener('controllerchange', (event) => {
				console.log('[Service] service worker controllerchange');
				this.options.debug && console.log(event);
			});
			navigator.serviceWorker.addEventListener('message', (event) => {
				console.log('[Service] service worker message');
				this.options.debug && console.log(event);
			});
			navigator.serviceWorker.addEventListener('messageerror', (event) => {
				console.log('[Service] service worker messageerror');
				this.options.debug && console.log(event);
			});

			let registration: ServiceWorkerRegistration;

			if (
				!navigator.serviceWorker.controller ||
				navigator.serviceWorker.controller.state == 'redundant'
			) {
				registration = await navigator.serviceWorker.register(url, {
					type: 'module',
					scope: '.',
					updateViaCache: 'imports',
				});
			} else {
				registration = await navigator.serviceWorker.ready;
			}

			registration.addEventListener('updatefound', (event) => {
				console.log('[Service] service worker updatefound');
				this.options.debug && console.log(event);
				update_found();
			});
			const relateds = await (navigator as CustomNavigator).getInstalledRelatedApps();
			console.log('[Service] Related App');
			this.options.debug && console.log(relateds);
		}
	}
	public async unregister() {
		let registration = await navigator.serviceWorker.ready;
		await registration.unregister();
		return this;
	}
	public registered() {
		return !!navigator.serviceWorker.controller;
	}
	public async subscribe(data: {
		role: string;
		userId: number;
		nodeId: number;
	}) {
		const service = await navigator.serviceWorker.ready;
		let subscription = await service.pushManager.getSubscription();
		if (!subscription) {
			const response = await this.clientApi
				.request({ endpoint: 'key' })
				.send<string>();
			const key = urlBase64ToUint8Array(await response.read());
			subscription = await service.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: key,
			});
			const body = {
				role: data.role,
				userId: data.userId,
				nodeId: data.nodeId,
				subscription,
			};
			await this.clientApi
				.request({
					endpoint: 'subscription',
					method: 'POST',
					body,
				})
				.send();
		}
		this.options.debug && console.log(subscription);
		return this;
	}
	public async unsubscribe(data: { nodeId: number }) {
		const service = await navigator.serviceWorker.ready;
		const subscription = await service.pushManager.getSubscription();
		if (subscription) {
			await this.clientApi
				.request({
					endpoint: 'unsubscription',
					method: 'DELETE',
					body: data,
				})
				.send();
			await subscription.unsubscribe();
		}
		return this;
	}
	public async subscribed() {
		const service = await navigator.serviceWorker.ready;
		const subscription = await service.pushManager.getSubscription();
		return !!subscription;
	}
	public async broadcast(data: WebPushPayload) {
		const response = await this.clientApi.request({
			endpoint: 'broadcast',
			method: 'POST',
			body: data,
		}).send<WebPushResponse>();
		return response.read();
	}

	public async sync(tag: string) {
		const service = (await navigator.serviceWorker
			.ready) as ServiceWorkerRegistration & SyncManager;
		await service.sync.register(tag);
		return this;
	}
	public async periodic(tag: string, options: { minInterval: number }) {
		const service = (await navigator.serviceWorker
			.ready) as ServiceWorkerRegistration & PeriodicSyncManager;
		try {
			await service.periodicSync.register(tag, options);
		} catch (error: any) {
			console.log(error);
		}
		return this;
	}
	public async send(message: any) {
		this.channel.postMessage(message);
		return this;
	}
	public async receive(handler: (message: any) => void) {
		this.message_handlers.add(handler);
		return this;
	}
	public async plugin(init: (instance: Service) => Promise<void> | void) {
		await init(this);
		return this;
	}
}
