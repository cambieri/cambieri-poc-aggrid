export function RenderActivity() { }

RenderActivity.prototype.init = function (params: any) {
	let color = "color: ";
	switch (params.data.stato.id) {
		case 'A':
			color += "#00e600;";
			break;
		case 'R':
			color += "#ff4d4d;";
			break;
		case 'W':
			color += "lightgrey;";
			break;
		case 'N':
			color += "#4da6ff;";
			break;
		default:
			color += "white;";
			break;
	}
	this.eGui = document.createElement('ion-icon');
	this.eGui.setAttribute('fill', 'clear');
	this.eGui.setAttribute('style', color)
	this.eGui.setAttribute('size', 'small');
	this.eGui.setAttribute('shape', 'round');
	this.eGui.setAttribute('name', 'ios-radio-button-on');
}

RenderActivity.prototype.getGui = function () { return this.eGui; }

RenderActivity.prototype.refresh = function (params) {
	this.eValue.innerHTML = params.valueFormatted ? params.valueFormatted : params.value;
	return true;
}; 