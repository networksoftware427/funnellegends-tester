const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const regex = /export const createVSLOrderCanvas = \(\): CanvasState => \(\{[\s\S]*?\}\];\n  \}\);/g;

// Fallback search if the regex doesn't match perfectly.
let startIdx = t.indexOf('export const createVSLOrderCanvas = (): CanvasState => ({');
let endIdx = t.indexOf('export const createWebinarRegistrationCanvas');

if (startIdx !== -1 && endIdx !== -1) {
  const newCanvas = `export const createVSLOrderCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_vsl_order_1', name: 'VSL & Order Form', isFullWidth: false, displayMode: 'flex', paddingTop: '48px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_vsl_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_vsl_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
            elements: [
              { id: 'el_vo_1', type: 'headline', name: 'Headline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' } }) },
              { id: 'el_vo_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Here\\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_vo_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px' } }) },
              { id: 'el_vo_4', type: 'button', name: 'Add to Cart', props: { text: 'ADD TO CART', iconName: 'ShoppingCart' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '48px' } }) }
            ]
          }]
        },
        {
          id: 'row_vsl_2', columnCount: 2, gap: '32px', alignItems: 'stretch',
          columns: [
            {
              id: 'col_vsl_2', widthFraction: 0.5, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_vo_5', type: 'headline', name: 'Step 1', props: { text: 'Step 1: Contact' }, style: createDefaultStyle({ typography: { fontSize: '20px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_vo_6', type: 'text_input', name: 'Full Name', props: { placeholder: 'Full Name...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_vo_7', type: 'email_input', name: 'Email Address', props: { placeholder: 'Email Address...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_vo_8', type: 'text_input', name: 'Phone Number', props: { placeholder: 'Phone Number...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '48px' } }) },
                { id: 'el_vo_9', type: 'headline', name: 'Step 2', props: { text: 'Step 2: Shipping Address' }, style: createDefaultStyle({ typography: { fontSize: '20px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_vo_10', type: 'shipping_address', name: 'Shipping Form', props: {}, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
              ]
            },
            {
              id: 'col_vsl_3', widthFraction: 0.5, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_vo_11', type: 'headline', name: 'Step 3', props: { text: 'Step 3: Offer Selection' }, style: createDefaultStyle({ typography: { fontSize: '20px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_vo_12', type: 'order_select', name: 'Order Select', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '24px' } }) },
                { id: 'el_vo_13', type: 'credit_card_form', name: 'Credit Card', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
                { id: 'el_vo_14', type: 'order_bump', name: 'Order Bump', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
                { id: 'el_vo_15', type: 'button', name: 'Add to Cart', props: { text: 'ADD TO CART', iconName: 'ShoppingCart' }, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
              ]
            }
          ]
        }
      ]
    }
  ]
});

`;

  t = t.substring(0, startIdx) + newCanvas + t.substring(endIdx);
  fs.writeFileSync(templatesPath, t);
  console.log('Successfully replaced createVSLOrderCanvas with 2-column layout.');
} else {
  console.log('Could not find createVSLOrderCanvas block.');
}
