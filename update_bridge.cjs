const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvas = `
export const createBridgeCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_bridge_1', name: 'Bridge Content', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_bridge_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_bridge_1', widthFraction: 1, verticalAlign: 'top', padding: '48px', margin: '0px',
            elements: [
              { id: 'el_bridge_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_bridge_2', type: 'headline', name: 'Headline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_bridge_3', type: 'video_player', name: 'Bridge Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_bridge_4', type: 'headline', name: 'Sub Headline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '24px', fontWeight: '700', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
              { id: 'el_bridge_5', type: 'paragraph', name: 'Paragraph', props: { text: 'Here\\'s where you write your compelling message. Keep your sentences and paragraphs short.\\n\\nUse bold, underline and italics to emphasize important points.\\n\\nDon\\'t be boring! Pretend you\\'re telling a mystery story. Keep your audience captivated. Eliminate any and all superfluous redundant words that only serve to unnecessarily complicate and hinder the flow and ease of the reader\\'s experience (i.e. get to the point).' }, style: createDefaultStyle({ typography: { fontSize: '16px', textAlign: 'center', color: '#64748b' }, boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '48px' } }) },
              { id: 'el_bridge_6', type: 'button', name: 'Continue Button', props: { text: 'Go To Step #2 Now ?', iconName: 'ArrowRight' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }, typography: { fontSize: '20px', fontWeight: '800' } }) }
            ]
          }]
        }
      ]
    }
  ]
});

// System Archetype Templates
`;

t = t.replace('// System Archetype Templates', newCanvas);

t = t.replace(
  /stepType: 'Bridge',\s*status: 'Published',\s*canvasState: createDemoSalesCanvas\(\)/g,
  "stepType: 'Bridge', status: 'Published', canvasState: createBridgeCanvas()"
);

fs.writeFileSync(templatesPath, t);
console.log('Added createBridgeCanvas successfully.');
