const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvas = `
export const createThankYouCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_ty_1', name: 'Thank You Section', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_ty_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_ty_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_ty_1', type: 'image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_ty_2', type: 'headline', name: 'Headline', props: { text: 'Success! You Are Registered.' }, style: createDefaultStyle({ typography: { fontSize: '48px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_ty_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_ty_4', type: 'subheadline', name: 'Subheadline', props: { text: 'Watch the important 2-minute video above for your next steps.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) }
        ]
      }]
    }]
  }]
});

// System Archetype Templates
`;

t = t.replace('// System Archetype Templates', newCanvas);

// Replace all occurrences of ThankYou steps using createDemoSalesCanvas() with createThankYouCanvas()
t = t.replaceAll("stepType: 'ThankYou', status: 'Published', canvasState: createDemoSalesCanvas()", "stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas()");

fs.writeFileSync(templatesPath, t);
console.log('Added Thank You canvas and mapped it to all Thank You steps.');
