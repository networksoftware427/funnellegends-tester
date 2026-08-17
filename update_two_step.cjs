const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvas = `
export const createTwoStepOrderCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_two_step_1', name: 'Order Page Content', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_two_step_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_two_step_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
            elements: [
              { id: 'el_ts_1', type: 'headline', name: 'Headline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
              { id: 'el_ts_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#64748b' }, boxModel: { marginBottom: '32px' } }) }
            ]
          }]
        },
        {
          id: 'row_two_step_2', columnCount: 2, gap: '32px', alignItems: 'stretch',
          columns: [
            {
              id: 'col_two_step_2', widthFraction: 0.6, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_ts_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
                { id: 'el_ts_4', type: 'headline', name: 'Secondary Headline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '24px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_ts_5', type: 'paragraph', name: 'Paragraph', props: { text: 'Here is another paragraph with more awesome information. It should be long enough to explain the concepts, but short enough to keep their attention.' }, style: createDefaultStyle({ typography: { fontSize: '16px', textAlign: 'left', color: '#64748b' } }) }
              ]
            },
            {
              id: 'col_two_step_3', widthFraction: 0.4, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_ts_6', type: 'two_step_checkout', name: 'Two Step Checkout', props: {}, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
              ]
            }
          ]
        }
      ]
    }
  ]
});

// System Archetype Templates
`;

t = t.replace('// System Archetype Templates', newCanvas);

t = t.replace(
  /name: 'Two Step Order Form Page', slug: 'order', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createDemoSalesCanvas\(\)/g,
  "name: 'Two Step Order Form Page', slug: 'order', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas()"
);

t = t.replace(
  /name: 'Two Step Order Page', slug: 'order', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createDemoSalesCanvas\(\)/g,
  "name: 'Two Step Order Page', slug: 'order', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas()"
);

fs.writeFileSync(templatesPath, t);
console.log('Added createTwoStepOrderCanvas successfully.');
