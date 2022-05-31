/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_NAME: string;

	readonly VITE_SERVER_ENV: string;
	readonly VITE_SEVER_CONTEXT: string;
	readonly VITE_SERVER_ORIGIN: string;
	readonly VITE_SERVER_DOMAIN: string;

	readonly VITE_API_SERVER_BASE_PATH: string;
	readonly VITE_EVENT_SERVER_BASE_PATH: string;
	readonly VITE_WS_SERVER_BASE_PATH: string;
	readonly VITE_SERVER_STATIC_PATH: string;
  
	readonly VITE_CLIENT_FETCH_MODE: RequestMode;
	readonly VITE_CLIENT_BUILD_DIR: string;
	readonly VITE_LANDING_URL: string;

	readonly VITE_MAP_KEY: string;
	readonly VITE_EMAIL_KEY: string;
	readonly VITE_PAYMENT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
