import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import { Box } from '@mui/material';
import './devicesTiles.css';
import fancyId from '@utils/fancyId';

interface Props {
	devices: number;
}

const DevicesTileMap = ({ devices }: Props): JSX.Element => {
	const config = {
		width: '100%',
		height: '200px',
		layout: { width: 7, height: 7, flat: true, spacing: 1.06 },
		origin: { x: 0, y: 0 },
		map: 'hexagon',
		mapProps: [2],
	};
	const generator = GridGenerator.getGenerator(config.map);
	const hexagons = generator.apply(this, config.mapProps);
	const layout = config.layout;
	const size = { x: layout.width, y: layout.height };

	// console.log(
	// 	'Class: , Function: DevicesTileMap, Line 24 hexagons():',
	// 	hexagons.sort(
	// 		(a, b) => (b.q || Number.MAX_VALUE) - (a.q || Number.MAX_VALUE),
	// 	),
	// );

	// console.log(
	// 	'Class: , Function: DevicesTileMap, Line 24 sorted():',
	// 	hexagons.sort((a, b) =>
	// 		a.q > b.q ? 1 : a.q === b.q ? (a.r > b.r ? 1 : -1) : -1,
	// 	),
	// );

	return (
		<Box sx={{ maxHeight: 200 }}>
			<HexGrid width={config.width} height={config.height}>
				<Layout
					size={size}
					flat={layout.flat}
					spacing={layout.spacing}
					origin={config.origin}
				>
					{hexagons
						// .sort(
						// 	(a, b) => (b.q || Number.MAX_VALUE) - (a.q || Number.MAX_VALUE),
						// )
						.slice(0, devices)
						.map((hex) => (
							<Hexagon key={fancyId()} q={hex.q} r={hex.r} s={hex.s} />
						))}
				</Layout>
			</HexGrid>
		</Box>
	);
};

export default DevicesTileMap;
