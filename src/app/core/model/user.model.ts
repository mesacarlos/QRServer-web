export interface User {
	id: number;
	username: string;
	email: string;
	verified_email: boolean;
	is_admin: boolean;
	created_at: Date;
	updated_at: Date;
	api_token?: string;
}