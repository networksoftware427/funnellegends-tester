const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvas = `
export const createShareCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_share_1', name: 'Share Page Content', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_share_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_share_1', widthFraction: 1, verticalAlign: 'top', padding: '48px', margin: '0px',
            elements: [
              { id: 'el_share_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_share_2', type: 'headline', name: 'Headline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_share_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_share_4', type: 'social_share', name: 'Social Share', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) }
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
  /stepType: 'Share',\s*status: 'Published',\s*canvasState: createDemoSalesCanvas\(\)/g,
  "stepType: 'Share', status: 'Published', canvasState: createShareCanvas()"
);

fs.writeFileSync(templatesPath, t);
console.log('Added createShareCanvas successfully.');
