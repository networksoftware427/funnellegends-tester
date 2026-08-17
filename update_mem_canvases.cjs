const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

const newCanvases = `
export const createMemberAccessCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_mem_acc_1', name: 'Member Access Section', isFullWidth: false, displayMode: 'flex', paddingTop: '100px', paddingBottom: '100px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_mem_acc_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_mem_acc_1', widthFraction: 1, verticalAlign: 'center', padding: '32px', margin: '0px',
        elements: [
          { id: 'el_mac_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '24px' } }) },
          { id: 'el_mac_2', type: 'headline', name: 'Headline', props: { text: 'Welcome Back. Please Log In.' }, style: createDefaultStyle({ typography: { fontSize: '32px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_mac_3', type: 'member_user_login', name: 'Member Login', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createMembersAreaCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '12px' },
  sections: [
    {
      id: 'sec_mem_nav_1', name: 'Membership Header', isFullWidth: true, displayMode: 'flex', paddingTop: '16px', paddingBottom: '16px',
      background: { bgType: 'color', backgroundColor: '#020617', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [{
        id: 'row_mem_nav_1', columnCount: 1, gap: '16px', alignItems: 'center',
        columns: [{
          id: 'col_mem_nav_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
          elements: [
            { id: 'el_marea_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px' } }) },
            { id: 'el_marea_2', type: 'menu_navigation', name: 'Navigation', props: { links: 'Dashboard, Courses, Community, Profile' }, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
          ]
        }]
      }]
    },
    {
      id: 'sec_mem_content_1', name: 'Membership Content', isFullWidth: false, displayMode: 'flex', paddingTop: '32px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [{
        id: 'row_mem_content_1', columnCount: 1, gap: '24px', alignItems: 'center',
        columns: [{
          id: 'col_mem_content_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
          elements: [
            { id: 'el_marea_3', type: 'membership_search', name: 'Search', props: { placeholder: 'Search lessons...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '24px' } }) },
            { id: 'el_marea_4', type: 'membership_navigation', name: 'Membership Navigation', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
            { id: 'el_marea_5', type: 'video_lesson_player', name: 'Lesson Content', props: { title: 'Welcome to the Academy', description: 'Watch this orientation video to get started.' }, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
          ]
        }]
      }]
    }
  ]
});

// System Archetype Templates
`;

t = t.replace('// System Archetype Templates', newCanvases);

// Replace mapping inside the membership funnel
t = t.replace(
  "{ id: 's3', name: 'Membership Access Page', slug: 'member-login', stepOrder: 3, stepType: 'MemberLogin', status: 'Published', canvasState: createDemoSalesCanvas() }",
  "{ id: 's3', name: 'Membership Access Page', slug: 'member-login', stepOrder: 3, stepType: 'MemberLogin', status: 'Published', canvasState: createMemberAccessCanvas() }"
);

t = t.replace(
  "{ id: 's4', name: 'Membership Page', slug: 'member-area', stepOrder: 4, stepType: 'MemberArea', status: 'Published', canvasState: createDemoSalesCanvas() }",
  "{ id: 's4', name: 'Membership Page', slug: 'member-area', stepOrder: 4, stepType: 'MemberArea', status: 'Published', canvasState: createMembersAreaCanvas() }"
);


fs.writeFileSync(templatesPath, t);
console.log('Added membership canvases and mapped them.');
