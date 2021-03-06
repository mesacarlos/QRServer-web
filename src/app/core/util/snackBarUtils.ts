import { MatSnackBar } from "@angular/material/snack-bar";

export const openSnackBar = (snackBar: MatSnackBar, message: string, action: string, durationMs: number) => {
	snackBar.open(message, action, {
		duration: durationMs,
		horizontalPosition: 'right',
	});
}