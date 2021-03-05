import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	loading?: boolean;
	title?: string;
	info?: string;
  }

@Component({
	selector: 'app-info-dialog',
	templateUrl: './info-dialog.component.html',
	styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<InfoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) { }

	ngOnInit(): void {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
