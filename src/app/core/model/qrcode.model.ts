import { SafeHtml } from "@angular/platform-browser";

export interface QRCode {
	id: string;
	user_id?: number;
	destination_url: string;
	png_image?: string | SafeHtml;
	created_at: Date;
	updated_at: Date;
}