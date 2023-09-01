type AxisAccessors = {
		x: string;
		y: string;
	};

  export function transformDatasetData(data: any[], axisKeys: AxisAccessors) {
    console.log(data)
		return data.map((record) => ({
			x: record[axisKeys.x],
			y: record[axisKeys.y]
		}));
	}
