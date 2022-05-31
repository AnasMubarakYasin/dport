/// <reference no-default-lib="true"/>
/// <reference lib="WebWorker" />

import Service from '$lib/service';
import { build, files, version } from '$service-worker';

const dev = false;
const service = new Service({
	debug: dev,
	cachename: version,
	resources: ['/', ...build, ...files],
});

service.route({
	url: /(chrome-extension:|wss?:).*/,
	method: 'GET',
	handler: async (request, util) => {
		return {
			strategy: 'net-only',
		};
	},
});
service.route({
	url: new RegExp(location.origin + '/(event|server)/' + '.*'),
	method: 'GET',
	handler: async (request, util) => {
		return {
			strategy: 'net-only',
		};
	},
});
service.route({
	url: new RegExp(location.origin + '/api/' + '.*'),
	method: 'GET',
	handler: async (request, util) => {
		return {
			timeout: 1e3,
			retry_interval: 3e3,
			retry_times: 2,
			cache_name: 'api',
			expire: 1e3 * 60 * 60 * 12,
			strategy: 'net-first',
		};
	},
});
service.route({
	url: /.*/,
	method: 'GET',
	handler: async (request, util) => {
		return {
			timeout: 1e3,
			retry_interval: 3e3,
			retry_times: 2,
			cache_name: 'static',
			expire: 1e3 * 60 * 60 * 24,
			strategy: 'cache-first',
		};
	},
});
service.start();
