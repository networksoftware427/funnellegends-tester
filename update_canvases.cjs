const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvases = `
export const createLeadMagnetCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_lm_1', name: 'Lead Magnet Section', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_lm_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_lm_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_lm_1', type: 'headline', name: 'Headline', props: { text: 'Free 7-Step Guide to Explode Your Lead Generation' }, style: createDefaultStyle({ typography: { fontSize: '48px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_lm_2', type: 'image', name: 'Image', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80' }, style: createDefaultStyle({ boxModel: { width: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_lm_3', type: 'subheadline', name: 'Subheadline', props: { text: 'Download this free guide to learn the exact framework we used to generate 10k leads in 30 days.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_lm_4', type: 'text_input', name: 'Email Input', props: { placeholder: 'Enter your best email address...', required: true }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_lm_5', type: 'button', name: 'Button', props: { text: 'DOWNLOAD NOW' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createReverseSqueezeCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_rs_1', name: 'Reverse Squeeze Section', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_rs_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_rs_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_rs_1', type: 'image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_rs_2', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_rs_3', type: 'text_input', name: 'Email Input', props: { placeholder: 'Enter your email to unlock part 2...' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_rs_4', type: 'button', name: 'Button', props: { text: 'UNLOCK THE REST OF THE VIDEO' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createSqueezeCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_sq_1', name: 'Squeeze Section', isFullWidth: false, displayMode: 'flex', paddingTop: '100px', paddingBottom: '100px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_sq_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_sq_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_sq_1', type: 'headline', name: 'Headline', props: { text: 'Discover the #1 Secret to Doubling Your Funnel Conversion Rate' }, style: createDefaultStyle({ typography: { fontSize: '48px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_sq_2', type: 'text_input', name: 'Email Input', props: { placeholder: 'Enter your email address...' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_sq_3', type: 'button', name: 'Button', props: { text: 'GET INSTANT ACCESS' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

// System Archetype Templates
`;

t = t.replace('// System Archetype Templates\nexport const initialSystemTemplates', newCanvases + 'export const initialSystemTemplates');

// Now replace specific instances of createDemoSalesCanvas() for these templates
// Squeeze Page Funnel
t = t.replace("{ id: 's1', name: 'Squeeze Page', slug: 'squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }", "{ id: 's1', name: 'Squeeze Page', slug: 'squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() }");

// Reverse Squeeze Page Funnel
t = t.replace("{ id: 's1', name: 'Reverse Squeeze Page', slug: 'reverse-squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }", "{ id: 's1', name: 'Reverse Squeeze Page', slug: 'reverse-squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createReverseSqueezeCanvas() }");

// Lead Magnet Funnel
t = t.replace("{ id: 's1', name: 'Lead Magnet Page', slug: 'optin', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }", "{ id: 's1', name: 'Lead Magnet Page', slug: 'optin', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createLeadMagnetCanvas() }");

fs.writeFileSync(templatesPath, t);
console.log('Successfully added and mapped new canvas templates.');
