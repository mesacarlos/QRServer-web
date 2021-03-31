export interface QRCodeStats {
	total_clicks: number,
	top_browser: {
		access_browser: string,
		total: number
	}[],
	top_os: {
		access_os: string,
		total: number
	}[],
	top_locale: {
		access_language: string,
		total: number
	}[],
	top_device: {
		access_device: string,
		total: number
	}[]
}