class StationsList {
	constructor(){
		this.stationsArray = [];
		$.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Rouen&apiKey=e034af446fba8014bb1eecadd35b88910fc35695', (stationsList) => {
			var id = 0;
			stationsList.forEach((data) => {
				let station = new Station(data, id);
				this.stationsArray.push(station);
				id++;
			});
			stationsMap.cluster();
		});
	}
}