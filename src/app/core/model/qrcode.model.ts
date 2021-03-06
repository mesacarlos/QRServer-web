export interface QRCode {
	id: string;
	user_id?: number;
	destination_url: string;
	created_at: Date;
	updated_at: Date;
}