import React from 'react';

import { FlowDiagram, ProcessNodes, SceneStage } from '../../../components';
import type { StageSide } from '../data';

export const MappingScene: React.FC<{ side: StageSide }> = ({ side }) => (
	<SceneStage side={side}>
		<FlowDiagram
			top={116}
			steps={[
				{ label: 'map', value: 'workflow reality' },
				{ label: 'find', value: 'bottlenecks' },
			]}
		/>
		<ProcessNodes mode="map" />
	</SceneStage>
);
