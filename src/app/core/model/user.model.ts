export interface User {
	id: number;
	username: string;
	email: string;
	password?: string;
	registration_ip: string;
	is_admin: boolean;
	created_at: Date;
	updated_at: Date;
}