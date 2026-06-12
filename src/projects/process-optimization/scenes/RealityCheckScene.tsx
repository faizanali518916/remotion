import React from 'react';

import { FlowDiagram, LightSweep, SceneStage } from '../../../components';
import type { StageSide } from '../data';

export const RealityCheckScene: React.FC<{ side: StageSide }> = ({ side }) => (
	<SceneStage side={side}>
		<LightSweep tone="red" />
		<FlowDiagram
			top={128}
			tone="#fb7185"
			steps={[
				{ label: 'real issue', value: 'how work actually moves', tone: '#fb7185' },
				{ label: 'not just', value: 'which tool you bought', tone: '#f97316' },
				{ label: 'fix', value: 'sequence and ownership' },
				{ label: 'then', value: 'add automation' },
			]}
		/>
	</SceneStage>
);
