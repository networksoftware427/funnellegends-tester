const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvas = `
export const createOfferWallCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_offerwall_1', name: 'Offer Wall Content', isFullWidth: false, displayMode: 'flex', paddingTop: '48px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_ow_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_ow_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
            elements: [
              { id: 'el_ow_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '120px', marginBottom: '24px', marginLeft: '0px', marginRight: 'auto' } }) },
              { id: 'el_ow_2', type: 'headline', name: 'Headline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' } }) },
              { id: 'el_ow_3', type: 'subheadline', name: 'Subheadline', props: { text: 'This is your sub-headline to increase credibility or curiosity' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#64748b' } }) },
              { id: 'el_ow_4', type: 'order_summary', name: 'Order Summary', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginTop: '32px', marginBottom: '32px' } }) }
            ]
          }]
        },
        {
          id: 'row_ow_2', columnCount: 3, gap: '24px', alignItems: 'stretch',
          columns: [
            {
              id: 'col_ow_2', widthFraction: 0.33, verticalAlign: 'top', padding: '8px', margin: '0px',
              elements: [
                { id: 'el_ow_5', type: 'image', name: 'Offer Image 1', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_ow_6', type: 'button', name: 'Offer Button 1', props: { text: 'SPECIAL OFFER CLICK HERE' }, style: createDefaultStyle({ boxModel: { width: '100%' }, typography: { fontSize: '14px', fontWeight: '700' } }) }
              ]
            },
            {
              id: 'col_ow_3', widthFraction: 0.33, verticalAlign: 'top', padding: '8px', margin: '0px',
              elements: [
                { id: 'el_ow_7', type: 'image', name: 'Offer Image 2', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_ow_8', type: 'button', name: 'Offer Button 2', props: { text: 'SPECIAL OFFER CLICK HERE' }, style: createDefaultStyle({ boxModel: { width: '100%' }, typography: { fontSize: '14px', fontWeight: '700' } }) }
              ]
            },
            {
              id: 'col_ow_4', widthFraction: 0.33, verticalAlign: 'top', padding: '8px', margin: '0px',
              elements: [
                { id: 'el_ow_9', type: 'image', name: 'Offer Image 3', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_ow_10', type: 'button', name: 'Offer Button 3', props: { text: 'SPECIAL OFFER CLICK HERE' }, style: createDefaultStyle({ boxModel: { width: '100%' }, typography: { fontSize: '14px', fontWeight: '700' } }) }
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

// Replace all OfferWall occurrences
t = t.replace(
  /stepType: 'OfferWall',\s*status: 'Published',\s*canvasState: createDemoSalesCanvas\(\)/g,
  "stepType: 'OfferWall', status: 'Published', canvasState: createOfferWallCanvas()"
);

fs.writeFileSync(templatesPath, t);
console.log('Added createOfferWallCanvas and replaced step types successfully.');
