const fs = require('fs');
let panelPath = 'src/components/builder/InspectorPanel.tsx';
let panel = fs.readFileSync(panelPath, 'utf8');

panel = panel.replace('import { ElementNode, ElementStyle, SectionNode } from', "import { ElementNode, ElementStyle, SectionNode, RowNode } from");
panel = panel.replace('selectedSection: SectionNode | null;', "selectedSection: SectionNode | null;\n  selectedRow?: RowNode | null;");
panel = panel.replace('onUpdateSection: (updatedSec: SectionNode) => void;', "onUpdateSection: (updatedSec: SectionNode) => void;\n  onUpdateRow?: (updatedRow: RowNode) => void;");
panel = panel.replace('selectedSection,', "selectedSection,\n  selectedRow,\n  onUpdateRow,");

fs.writeFileSync(panelPath, panel);
console.log('InspectorPanel fixed.');

let layoutPath = 'src/components/builder/BuilderLayout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');
layout = layout.replace('import { CanvasState, SectionNode, ColumnNode, ElementNode, GlobalDesignTokens, ClickPopSettings } from', "import { CanvasState, SectionNode, RowNode, ColumnNode, ElementNode, GlobalDesignTokens, ClickPopSettings } from");
fs.writeFileSync(layoutPath, layout);
console.log('BuilderLayout fixed.');
