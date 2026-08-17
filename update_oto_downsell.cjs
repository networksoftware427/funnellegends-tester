const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvas = `
export const createOTOCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#f97316', secondaryColor: '#ea580c', accentColor: '#fb923c', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_oto_1', name: 'One Time Offer', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_oto_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_oto_1', widthFraction: 1, verticalAlign: 'top', padding: '32px', margin: '0px',
            elements: [
              { id: 'el_oto_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_oto_2', type: 'headline', name: 'Headline', props: { text: 'WAIT! Your Order Is Not Complete Yet...' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#ea580c' } }) },
              { id: 'el_oto_3', type: 'subheadline', name: 'Subheadline', props: { text: 'Watch this short video to see how you can upgrade your order today.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#64748b' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_oto_4', type: 'video_player', name: 'Sales Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_oto_5', type: 'button', name: 'Upgrade Button', props: { text: 'YES! ADD THIS TO MY ORDER NOW' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }, typography: { fontSize: '20px', fontWeight: '800' } }) }
            ]
          }]
        }
      ]
    }
  ]
});

export const createDownsellCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#ef4444', secondaryColor: '#dc2626', accentColor: '#f87171', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_downsell_1', name: 'Downsell Offer', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_ds_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_ds_1', widthFraction: 1, verticalAlign: 'top', padding: '32px', margin: '0px',
            elements: [
              { id: 'el_ds_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_ds_2', type: 'headline', name: 'Headline', props: { text: 'Too Expensive? Here\\'s A Payment Plan...' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#dc2626' } }) },
              { id: 'el_ds_3', type: 'subheadline', name: 'Subheadline', props: { text: 'We don\\'t want you to miss out. Watch the video below.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#64748b' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_ds_4', type: 'video_player', name: 'Sales Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_ds_5', type: 'button', name: 'Upgrade Button', props: { text: 'YES! I WANT THE PAYMENT PLAN' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }, typography: { fontSize: '20px', fontWeight: '800' } }) }
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
  /stepType: 'Upsell',\s*status: 'Published',\s*canvasState: createDemoSalesCanvas\(\)/g,
  "stepType: 'Upsell', status: 'Published', canvasState: createOTOCanvas()"
);

t = t.replace(
  /stepType: 'Downsell',\s*status: 'Published',\s*canvasState: createDemoSalesCanvas\(\)/g,
  "stepType: 'Downsell', status: 'Published', canvasState: createDownsellCanvas()"
);

fs.writeFileSync(templatesPath, t);
console.log('Added createOTOCanvas and createDownsellCanvas successfully.');
