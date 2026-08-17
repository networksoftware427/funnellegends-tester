const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvas = `
export const createVSLOrderCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [
    {
      id: 'sec_vsl_1', name: 'Video Sales Letter', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '32px',
      background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [{
        id: 'row_vsl_1', columnCount: 1, gap: '24px', alignItems: 'center',
        columns: [{
          id: 'col_vsl_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
          elements: [
            { id: 'el_vsl_1', type: 'headline', name: 'Headline', props: { text: 'How to Build High-Converting Funnels in Minutes' }, style: createDefaultStyle({ typography: { fontSize: '48px', fontWeight: '800', textAlign: 'center' } }) },
            { id: 'el_vsl_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Watch the video below to discover the exact framework we use to scale brands.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) },
            { id: 'el_vsl_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' } }) },
            { id: 'el_vsl_4', type: 'button', name: 'Button', props: { text: 'YES, I WANT ACCESS NOW' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
          ]
        }]
      }]
    },
    {
      id: 'sec_order_1', name: 'Order Form Section', isFullWidth: false, displayMode: 'flex', paddingTop: '32px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [{
        id: 'row_order_1', columnCount: 1, gap: '24px', alignItems: 'center',
        columns: [{
          id: 'col_order_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
          elements: [
            { id: 'el_ord_1', type: 'text_input', name: 'Contact Info', props: { placeholder: 'Enter your email address...' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
            { id: 'el_ord_2', type: 'shipping_address', name: 'Shipping Address', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
            { id: 'el_ord_3', type: 'order_select', name: 'Order Select', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
            { id: 'el_ord_4', type: 'credit_card_form', name: 'Credit Card', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
            { id: 'el_ord_5', type: 'order_bump', name: 'Order Bump', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
            { id: 'el_ord_6', type: 'button', name: 'Complete Order Button', props: { text: 'COMPLETE MY ORDER' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) }
          ]
        }]
      }]
    }
  ]
});

// System Archetype Templates
`;

t = t.replace('// System Archetype Templates', newCanvas);

// Replace lines that contain "name: 'VSL + Order Page'" and "createDemoSalesCanvas()"
const lines = t.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("name: 'VSL + Order Page'") && lines[i].includes("createDemoSalesCanvas()")) {
    lines[i] = lines[i].replace('createDemoSalesCanvas()', 'createVSLOrderCanvas()');
  }
}
t = lines.join('\n');

fs.writeFileSync(templatesPath, t);
console.log('Added VSL + Order Page canvas and mapped it to all matching steps.');
