import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export const openSnackBar = (snackBar: MatSnackBar, message: string, action: string, durationMs: number, horizontalPosition: MatSnackBarHorizontalPosition = 'right', verticalPosition: MatSnackBarVerticalPosition = 'bottom') => {
	snackBar.open(message, action, {
		duration: durationMs,
		horizontalPosition: horizontalPosition,
		verticalPosition: verticalPosition,
	});
}