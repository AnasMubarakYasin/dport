import './db';
import type { Handle, } from '@sveltejs/kit';

console.log('[init] hook');

export const handle: Handle = async function ({ event, resolve }) {
	const response = await resolve(event);

	console.log(event.url.toString());

	return response;
};
