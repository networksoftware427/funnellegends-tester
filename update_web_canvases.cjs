const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvases = `
export const createWebinarRegistrationCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_reg_1', name: 'Webinar Registration', isFullWidth: false, displayMode: 'flex', paddingTop: '32px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_reg_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_web_reg_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wr_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wr_2', type: 'menu_navigation', name: 'Navigation', props: { links: 'Home, About, Contact' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
          { id: 'el_wr_3', type: 'headline', name: 'Headline', props: { text: 'Free Masterclass: How to Scale Your SaaS to $10k/MRR' }, style: createDefaultStyle({ typography: { fontSize: '48px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_wr_4', type: 'subheadline', name: 'Subheadline', props: { text: 'Reserve your seat now. Space is strictly limited.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wr_5', type: 'image', name: 'Feature Image', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80' }, style: createDefaultStyle({ boxModel: { width: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wr_6', type: 'text_input', name: 'Email Input', props: { placeholder: 'Enter your best email address...' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wr_7', type: 'button', name: 'Button', props: { text: 'CLAIM MY FREE SPOT' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createWebinarConfirmationCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_conf_1', name: 'Webinar Confirmation', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_conf_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_web_conf_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wc_1', type: 'headline', name: 'Headline', props: { text: 'You Are Registered! Please Read Carefully...' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#10b981' } }) },
          { id: 'el_wc_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Watch this short 2-minute welcome video before you close this page.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wc_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_4', type: 'webinar_date', name: 'Webinar Date', props: { date: 'Thursday, Oct 24th' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_5', type: 'webinar_time', name: 'Webinar Time', props: { time: '2:00 PM EST' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_6', type: 'add_event', name: 'Add Event', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_7', type: 'image', name: 'Feature Image', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80' }, style: createDefaultStyle({ boxModel: { width: '400px', marginLeft: 'auto', marginRight: 'auto', marginTop: '32px' } }) },
          { id: 'el_wc_8', type: 'button', name: 'Button', props: { text: 'JOIN FACEBOOK GROUP' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createWebinarBroadcastCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_bc_1', name: 'Broadcast Room', isFullWidth: true, displayMode: 'flex', paddingTop: '32px', paddingBottom: '32px',
    background: { bgType: 'color', backgroundColor: '#020617', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_bc_1', columnCount: 1, gap: '16px', alignItems: 'center',
      columns: [{
        id: 'col_web_bc_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wb_1', type: 'headline', name: 'Headline', props: { text: 'LIVE: How to Scale Your SaaS' }, style: createDefaultStyle({ typography: { fontSize: '32px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_wb_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Please wait, the presentation will begin shortly.' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wb_3', type: 'evergreen_timer', name: 'Countdown', props: { minutes: 5, seconds: 0 }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wb_4', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createWebinarReplayCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_rep_1', name: 'Replay Room', isFullWidth: true, displayMode: 'flex', paddingTop: '32px', paddingBottom: '32px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_rep_1', columnCount: 1, gap: '16px', alignItems: 'center',
      columns: [{
        id: 'col_web_rep_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wrep_1', type: 'headline', name: 'Headline', props: { text: 'LIMITED REPLAY: How to Scale Your SaaS' }, style: createDefaultStyle({ typography: { fontSize: '36px', fontWeight: '800', textAlign: 'center', color: '#f43f5e' } }) },
          { id: 'el_wrep_2', type: 'subheadline', name: 'Subheadline', props: { text: 'This replay will be taken down soon.' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wrep_3', type: 'evergreen_timer', name: 'Countdown', props: { hours: 48, minutes: 0, seconds: 0 }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wrep_4', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wrep_5', type: 'button', name: 'Button', props: { text: 'YES! I WANT THE SPECIAL OFFER' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

// System Archetype Templates
`;

t = t.replace('// System Archetype Templates', newCanvases);

// Replace mapping inside the funnel definitions
t = t.replace(
  "{ id: 's1', name: 'Webinar Registration Page', slug: 'registration', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }",
  "{ id: 's1', name: 'Webinar Registration Page', slug: 'registration', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createWebinarRegistrationCanvas() }"
);
t = t.replace(
  "{ id: 's1', name: 'Webinar Registration Page', slug: 'registration', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }",
  "{ id: 's1', name: 'Webinar Registration Page', slug: 'registration', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createWebinarRegistrationCanvas() }"
); // for the second autowebinar funnel

t = t.replace(
  "{ id: 's2', name: 'Webinar Confirmation Page', slug: 'confirmation', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }",
  "{ id: 's2', name: 'Webinar Confirmation Page', slug: 'confirmation', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createWebinarConfirmationCanvas() }"
);
t = t.replace(
  "{ id: 's2', name: 'Webinar Confirmation Page', slug: 'confirmation', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }",
  "{ id: 's2', name: 'Webinar Confirmation Page', slug: 'confirmation', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createWebinarConfirmationCanvas() }"
); // for the second autowebinar funnel

t = t.replace(
  "{ id: 's3', name: 'Webinar Broadcast Page', slug: 'broadcast', stepOrder: 3, stepType: 'WebinarRoom', status: 'Published', canvasState: createDemoSalesCanvas() }",
  "{ id: 's3', name: 'Webinar Broadcast Page', slug: 'broadcast', stepOrder: 3, stepType: 'WebinarRoom', status: 'Published', canvasState: createWebinarBroadcastCanvas() }"
);

t = t.replace(
  "{ id: 's4', name: 'Replay Page', slug: 'replay', stepOrder: 4, stepType: 'Replay', status: 'Published', canvasState: createDemoSalesCanvas() }",
  "{ id: 's4', name: 'Replay Page', slug: 'replay', stepOrder: 4, stepType: 'Replay', status: 'Published', canvasState: createWebinarReplayCanvas() }"
);
t = t.replace(
  "{ id: 's4', name: 'Replay Page', slug: 'replay', stepOrder: 4, stepType: 'Replay', status: 'Published', canvasState: createDemoSalesCanvas() }",
  "{ id: 's4', name: 'Replay Page', slug: 'replay', stepOrder: 4, stepType: 'Replay', status: 'Published', canvasState: createWebinarReplayCanvas() }"
); // for the second autowebinar funnel


fs.writeFileSync(templatesPath, t);
console.log('Added webinar canvases and mapped them.');
