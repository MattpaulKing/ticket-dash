type AxisAccessors = {
		x: string;
		y: string;
	};

  function intersection(o1, o2) {
    return Object.keys(o1).filter({}.hasOwnProperty.bind(o2));
}

  export function transformDatasetData(data: any[], axisKeys: AxisAccessors) {
		return data.map((record) => ({
			x: record[axisKeys.x],
			y: record[axisKeys.y]
		}));
	}
