import React from 'react';

import { FlowDiagram, SceneStage } from '../../../components';
import type { StageSide } from '../data';

export const DefinitionScene: React.FC<{ side: StageSide }> = ({ side }) => (
	<SceneStage side={side}>
		<FlowDiagram
			top={130}
			steps={[
				{ label: 'first', value: 'map the current flow' },
				{ label: 'then', value: 'remove waste' },
				{ label: 'before', value: 'you scale the team' },
				{ label: 'result', value: 'clear repeatable work' },
			]}
		/>
	</SceneStage>
);
