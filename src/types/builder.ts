// LaunchEngine Core Builder & Platform Domain Types

export type ElementCategory = 
  | 'typography' 
  | 'media' 
  | 'form' 
  | 'ecommerce' 
  | 'membership' 
  | 'interactive' 
  | 'widgets'
  | 'universal';

export type ElementType =
  // Typography & Content
  | 'headline'
  | 'subheadline'
  | 'paragraph'
  | 'text_block'
  | 'advanced_text_block'
  | 'bullet_list'
  | 'image_list'
  | 'icon_list'
  | 'rich_text'
  | 'quote_block'
  | 'callout_box'
  | 'divider'
  // Media & Embeds
  | 'image'
  | 'image_gallery'
  | 'image_popup'
  | 'video_player'
  | 'audio_player'
  | 'announcement_bar'
  | 'footer_block'
  | 'video_popup'
  | 'video_playlist'
  | 'lottie_animation'
  | 'custom_html'
  | 'custom_code'
  // Form & Capture
  | 'button'
  | 'text_input'
  | 'select_dropdown'
  | 'radio_group'
  | 'checkbox'
  | 'textarea'
  | 'date_picker'
  | 'multi_step_optin'
  | 'survey'
  | 'file_upload'
  | 'hidden_field'
  | 'sms_signup'
  // E-Commerce & Checkout
  | 'one_step_checkout'
  | 'two_step_checkout'
  | 'order_bump'
  | 'product_selector'
  | 'order_select'
  | 'order_summary'
  | 'order_confirmation'
  | 'credit_card_form'
  | 'instant_pay_button'
  | 'one_click_upsell'
  | 'shipping_address'
  | 'billing_address'
  // Membership & Affiliate Elements
  | 'curriculum_nav'
  | 'module_container'
  | 'video_lesson_player'
  | 'mark_complete_button'
  | 'drip_timer_banner'
  | 'resource_download_list'
  | 'member_user_login'
  | 'membership_search'
  | 'membership_navigation'
  | 'affiliate_login'
  | 'affiliate_link'
  | 'affiliate_stats'
  | 'visual_funnel'
  | 'affiliate_image_asset'
  | 'affiliate_text_asset'
  | 'affiliate_link_builder'
  // Interactive & Conversion & Webinar
  | 'evergreen_timer'
  | 'fixed_timer'
  | 'progress_bar'
  | 'faq_accordion'
  | 'tabs'
  | 'popup_trigger'
  | 'sticky_announcement'
  | 'pricing_table'
  | 'social_proof_toast'
  | 'star_rating'
  | 'testimonial_carousel'
  | 'autowebinar_registration'
  | 'webinar_date'
  | 'webinar_time'
  | 'add_event'
  | 'clickpop_button'
  | 'clickpop_modal'
  | 'facebook_comments'
  | 'social_share'
  // ChronoChimp Appointment & Calendar Elements
  | 'appointment_calendar'
  | 'appointment_host_card'
  | 'appointment_summary_receipt'
  | 'team_schedule_picker'
  // Widgets Category (30 Elements)
  | 'header_navigation'
  | 'hero_banner_widget'
  | 'cta_box_widget'
  | 'testimonial_card_widget'
  | 'content_slider_widget'
  | 'shape_divider_widget'
  | 'image_carousel_widget'
  | 'interactive_gallery_widget'
  | 'menu_anchor_widget'
  | 'sidebar_widget'
  | 'spacer_widget'
  | 'read_more_widget'
  | 'login_register_widget'
  | 'price_list_widget'
  | 'video_playlist_widget'
  | 'table_of_contents_widget'
  | 'reviews_widget'
  | 'comparison_slider_widget'
  | 'stats_counter_widget'
  | 'countdown_banner_widget'
  | 'floating_whatsapp_widget'
  | 'team_grid_widget'
  | 'logo_cloud_widget'
  | 'guarantee_badge_widget'
  | 'progress_step_widget'
  | 'audio_podcast_widget'
  | 'map_location_widget'
  | 'notification_popup_widget'
  | 'social_feed_widget'
  | 'feature_comparison_widget'
  | 'search_bar_widget'
  | 'community_feed_widget'
  // Course & Membership LMS Widgets
  | 'course_curriculum_widget'
  | 'lesson_video_player'
  | 'certificate_badge_widget'
  | 'drip_schedule_widget'
  // Universal
  | 'universal_header'
  | 'universal_footer'
  | 'saved_global_block'
  | 'menu_navigation'
  | 'logo_image'
  | 'icon';

export interface StyleTypography {
  fontFamily: string;
  fontSize: string; // e.g. '36px', '2.5rem', 'clamp(1.5rem, 4vw, 3rem)'
  mobileFontSize?: string; // Font size specifically for mobile views
  fontWeight: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  lineHeight: string;
  letterSpacing: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
  textShadow: string;
  isGradientFill: boolean;
  gradientStart?: string;
  gradientEnd?: string;
}

export interface StyleBoxModel {
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  width: string;
  maxWidth: string;
  height: string;
}

export interface StyleBackground {
  bgType: 'none' | 'color' | 'gradient' | 'image' | 'video';
  backgroundColor: string;
  gradient: string;
  bgImage: string;
  bgImageSize: 'cover' | 'contain' | 'auto';
  bgImagePosition: string;
  bgOverlayColor?: string;
  bgOverlayOpacity?: number;
  isParallax: boolean;
  bgVideoUrl: string;
}

export interface StyleBorders {
  borderStyle: 'none' | 'solid' | 'dashed' | 'dotted';
  borderColor: string;
  borderWidth: string;
  borderRadiusTopLeft: string;
  borderRadiusTopRight: string;
  borderRadiusBottomRight: string;
  borderRadiusBottomLeft: string;
}

export interface StyleEffects {
  boxShadow: string;
  innerShadow: string;
  blur: string;
  opacity: number;
  backdropFilter: string;
}

export interface StyleLayoutAnimation {
  flexDirection: 'row' | 'column';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  zIndex: number;
  position: 'relative' | 'absolute' | 'sticky';
  entranceAnimation: 'none' | 'fade-in' | 'slide-up' | 'zoom-in' | 'flip';
  animationDuration: string;
  animationDelay: string;
  deviceVisibility: 'all' | 'desktop-only' | 'mobile-only';
}

export interface StyleCustomCode {
  customClasses: string;
  scopedCss: string;
}

export interface ElementStyle {
  typography: StyleTypography;
  boxModel: StyleBoxModel;
  background: StyleBackground;
  borders: StyleBorders;
  effects: StyleEffects;
  layoutAnim: StyleLayoutAnimation;
  customCode: StyleCustomCode;
}

export interface ElementNode {
  id: string;
  type: ElementType;
  name: string;
  props: Record<string, any>;
  style: ElementStyle;
}

export interface ColumnNode {
  id: string;
  widthFraction: number; // e.g. 0.5 for 50%, 0.33 for 33.3%
  verticalAlign: 'top' | 'center' | 'bottom' | 'stretch';
  padding: string;
  margin: string;
  background?: StyleBackground;
  elements: ElementNode[];
}

export interface RowNode {
  id: string;
  name?: string;
  columnCount: number; // 1 to 6
  gap: string;
  alignItems: 'top' | 'center' | 'bottom' | 'stretch';
  background?: StyleBackground;
  style?: any;
  columns: ColumnNode[];
}

export interface SectionNode {
  id: string;
  name: string;
  isFullWidth: boolean;
  displayMode: 'flex' | 'block';
  background: StyleBackground;
  paddingTop: string;
  paddingBottom: string;
  style?: any;
  rows: RowNode[];
}

export interface GlobalDesignTokens {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadiusPreset: string;
  backgroundImage?: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPosition?: string;
  backgroundOverlayColor?: string;
}

export type ClickPopLayoutVariant = 'flat_click_pop' | 'default'
  | 'book_split'
  | 'cyber_exit'
  | 'webinar_pass'
  | 'gold_luxury'
  | 'saas_card'
  | 'editorial'
  | 'flash_scarcity'
  | 'vsl_cinema'
  | 'beta_glass'
  | 'spin_wheel';

export interface ClickPopSettings {
  enabled: boolean;
  triggerType: 'button' | 'exit_intent' | 'timed_delay';
  delaySeconds: number;
  layoutVariant?: ClickPopLayoutVariant;
  title: string;
  subtitle: string;
  buttonText: string;
  redirectUrl: string;
  badgeText: string;
  imageUrl?: string;
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    fontFamily?: string;
  backdropBlur: boolean;
}

export interface CanvasState {
  sections: SectionNode[];
  globalTokens: GlobalDesignTokens;
  clickPopSettings?: ClickPopSettings;
}

// Funnel & Publishing Types
export type StepType = 
  | 'OptIn' 
  | 'Sales' 
  | 'Upsell' 
  | 'Downsell' 
  | 'ThankYou' 
  | 'MemberLogin' 
  | 'MemberArea' 
  | 'Lesson'
  | 'Survey'
  | 'Application'
  | 'Bridge'
  | 'Share'
  | 'WebinarRoom'
  | 'Replay'
  | 'Storefront'
  | 'Article'
  | 'Demo'
  | 'OfferWall'
  | 'Indoctrination'
  | 'Hero'
  | 'Home'
  | 'Order'
  | 'Webinar'
  | 'Misc'
  | 'Ask'
  | 'Presell';

export type PageStatus = 'Draft' | 'Scheduled' | 'Published' | 'Archived';

export interface FunnelStepData {
  id: string;
  name: string;
  slug: string;
  stepOrder: number;
  stepType: StepType;
  canvasState: CanvasState;
  status: PageStatus;
  publishedAt?: string;
  abSplitEnabled?: boolean;
  abSplitVariantBState?: CanvasState;
  trafficSplitPercent?: number; // e.g. 50 for 50/50 A/B test
}

export interface FunnelData {
  id: string;
  name: string;
  slug: string;
  type: 'Presell' | 'Optin' | 'Thank You' | 'Sales' | 'Order Forms' | 'OTO' | 'Webinar' | 'Membership' | 'Affiliate' | 'Specialized' | 'Lead' | 'Application' | 'E-commerce' | 'Misc';
  steps: FunnelStepData[];
  hasAutomationTemplate?: boolean;
  customDomain?: string;
  createdAt: string;
}

// Membership Types
export interface LessonBlock {
  id: string;
  type: 'headline' | 'paragraph' | 'image' | 'video' | 'audio' | 'quiz';
  headlineText?: string;
  paragraphText?: string;
  imageUrl?: string;
  imageCaption?: string;
  videoUrl?: string;
  videoTitle?: string;
  audioUrl?: string;
  audioTitle?: string;
  quizQuestion?: string;
  quizOptions?: string[];
  correctOptionIndex?: number;
}

export interface LessonData {
  id: string;
  title: string;
  order: number;
  dripDays?: number;
  videoUrl?: string;
  pdfUrl?: string; // Legacy
  pdfName?: string; // Legacy
  documents?: { id: string; name: string; url: string; type: 'pdf' | 'doc' | 'excel' | 'zip' | 'other' }[];
  duration?: string;
  isCompleted?: boolean;
  blocks?: LessonBlock[];
}

export interface ModuleData {
  id: string;
  title: string;
  order: number;
  lessons: LessonData[];
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  modules: ModuleData[];
}

// Automation Workflow Types
export type WorkflowTriggerType = 
  | 'Form Submitted' 
  | 'Tag Added' 
  | 'Cart Abandoned' 
  | 'Purchase Completed' 
  | 'Lesson Completed';

export interface WorkflowNodeData {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  label: string;
  subtitle?: string;
  config: Record<string, any>;
  x: number;
  y: number;
}

export interface WorkflowEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
}

// CRM Types
export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  tags: string[];
  lastActive: string;
  createdDate: string;
}

export interface DealData {
  id: string;
  contactName: string;
  contactEmail: string;
  title: string;
  value: number;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  score: number;
  createdDate: string;
}
