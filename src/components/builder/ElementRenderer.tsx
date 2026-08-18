import React, { useState } from 'react';
import { ElementNode } from '../../types/builder';
import { initialCourseData } from '../../data/initialTemplates';
import { TribeNexusCommunity } from '../community/TribeNexusCommunity';
import { 
  loadStoredAffiliates, loadStoredPlans, loadStoredPromoMaterials, 
  loadStoredSettings, loadStoredTransactions, saveStoredAffiliates 
} from '../../utils/affiliateStorage';
import { 
  initialAffiliates, initialCommissionPlans, initialPromoMaterials, initialSettings 
} from '../../data/initialAffiliateData';
import { 
  loadStoredHosts as loadChronoHosts, loadStoredEventTypes as loadChronoEventTypes, 
  loadStoredAppointments as loadChronoAppointments, saveStoredAppointments as saveChronoAppointments 
} from '../../utils/appointmentStorage';
import { loadStoredCourse } from '../../utils/storage';
import { 
  Play, Pause, Star, CheckCircle, Clock, ShieldCheck, ArrowRight, Lock, 
  HelpCircle, ChevronDown, ChevronRight, Upload, Calendar, ShoppingCart, 
  CreditCard, Sparkles, AlertCircle, FileText, Video, Award, Check, Layers, Image as ImageIcon, Volume2,
  Maximize2, X, Users, DollarSign, TrendingUp, Link2, Copy, BarChart3, PieChart, Workflow, Key,
  Search, BookOpen, User, LockKeyhole, Menu, CalendarCheck, Radio, Code2, Mail, QrCode, Tag, MousePointerClick,
  MessageCircle, MapPin, MessageSquare, Share2, Gift, Zap, List, Grid, Headphones, Sliders, Globe, ChevronLeft,
  Facebook, Twitter, Instagram, Linkedin, GraduationCap
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ElementRendererProps {
  element: ElementNode;
  isSelected?: boolean;
  onSelect?: () => void;
  onTextChange?: (newText: string) => void;
  isInteractiveMode?: boolean; // If true, functions like live user preview
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
}

const ElementRendererContent: React.FC<ElementRendererProps> = ({
  element,
  isSelected,
  onSelect,
  onTextChange,
  isInteractiveMode = false,
  viewportMode = 'desktop'
}) => {
  const { type, props, style } = element;
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [step, setStep] = useState(1);
  const [isCheckedBump, setIsCheckedBump] = useState(true);
  const [isCompletedLesson, setIsCompletedLesson] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // New element states
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

  // Survey App State
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  // Affiliate Elements State & BountyPack Store Connection
  const [affiliateTab, setAffiliateTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [copiedAffLink, setCopiedAffLink] = useState(false);
  const [selectedAffRoute, setSelectedAffRoute] = useState('partner');
  const [copiedImageAssetHtml, setCopiedImageAssetHtml] = useState(false);
  const [activeSwipeTab, setActiveSwipeTab] = useState(0);
  const [copiedTextSwipe, setCopiedTextSwipe] = useState(false);
  const [builderRouteChoice, setBuilderRouteChoice] = useState('/checkout');
  const [subIdInput, setSubIdInput] = useState('');
  const [copiedBuilderLink, setCopiedBuilderLink] = useState(false);

  // Live BountyPack Data Storage
  const [bountypackAffiliates, setBountypackAffiliates] = useState<any[]>(() => {
    const loaded = loadStoredAffiliates();
    return (loaded && loaded.length > 0) ? loaded : initialAffiliates;
  });
  const bountypackPlans = (loadStoredPlans() && loadStoredPlans().length > 0) ? loadStoredPlans() : initialCommissionPlans;
  const bountypackPromo = (loadStoredPromoMaterials() && loadStoredPromoMaterials().length > 0) ? loadStoredPromoMaterials() : initialPromoMaterials;
  const bountypackSettings = loadStoredSettings()?.affiliateDomainUrl ? loadStoredSettings() : initialSettings;
  const bountypackTransactions = loadStoredTransactions() || [];

  // Registration state for affiliate_login element
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPayoutEmail, setRegPayoutEmail] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState<string | null>(null);

  // Active Partner selection state for stats & links
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(bountypackAffiliates[0]?.id || 'partner_01');
  const activePartner = bountypackAffiliates.find((a: any) => a.id === selectedPartnerId) || bountypackAffiliates[0] || {
    id: 'partner_01', affiliateCode: 'HORMOZI', name: 'Alex Hormozi', totalClicks: 14250, totalSalesCount: 412, grossRevenue: 246000, commissionEarned: 123000, commissionPaid: 105000
  };

  // ChronoChimp Live Appointment Store Connection
  const [chronoAppts, setChronoAppts] = useState(loadChronoAppointments());
  const chronoEvents = loadChronoEventTypes();
  const chronoHosts = loadChronoHosts();

  // Booking Widget Canvas Element Local State
  const [elemSelectedEvtId, setElemSelectedEvtId] = useState(chronoEvents[0]?.id || '');
  const [elemSelectedDate, setElemSelectedDate] = useState('2026-08-16');
  const [elemSelectedSlot, setElemSelectedSlot] = useState('11:00');
  const [elemClientName, setElemClientName] = useState('');
  const [elemClientEmail, setElemClientEmail] = useState('');
  const [elemClientPhone, setElemClientPhone] = useState('');
  const [elemBookingDone, setElemBookingDone] = useState(false);
  const [elemConfirmedAppt, setElemConfirmedAppt] = useState<any>(null);
  const [selectedHostPickerId, setSelectedHostPickerId] = useState(chronoHosts[0]?.id || '');

  // 30 Widget Elements Interactive States
  const [widgetSlideIdx, setWidgetSlideIdx] = useState(0);
  const [widgetGalleryFilter, setWidgetGalleryFilter] = useState('all');
  const [widgetReadMoreOpen, setWidgetReadMoreOpen] = useState(false);
  const [widgetAuthTab, setWidgetAuthTab] = useState<'login' | 'register'>('login');
  const [widgetVideoPlaylistIdx, setWidgetVideoPlaylistIdx] = useState(0);
  const [widgetBeforeAfterPos, setWidgetBeforeAfterPos] = useState(50);
  const [widgetAudioPlaying, setWidgetAudioPlaying] = useState(false);
  const [widgetSearchQuery, setWidgetSearchQuery] = useState('');

  // Member Elements State
  const [memberTab, setMemberTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [openNavModule, setOpenNavModule] = useState<number | null>(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Webinar Elements State
  const [webinarDateChoice, setWebinarDateChoice] = useState('today_15m');
  const [webinarTimeChoice, setWebinarTimeChoice] = useState('2pm');
  const [isRegisteredWebinar, setIsRegisteredWebinar] = useState(false);
  const [addedCalendarType, setAddedCalendarType] = useState<string | null>(null);

  // Ecommerce Order Select & Order Summary & Credit Card State
  const [selectedOrderProductId, setSelectedOrderProductId] = useState('enterprise');
  const [summaryIncludeBump, setSummaryIncludeBump] = useState(true);
  const [cardProcessing, setCardProcessing] = useState(false);
  const [cardSuccess, setCardSuccess] = useState(false);

  const computeShadow = (shadowProp?: string) => {
    if (!shadowProp || shadowProp === 'none') return undefined;
    if (shadowProp === 'sm') return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    if (shadowProp === 'md') return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    if (shadowProp === 'lg') return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    if (shadowProp === 'xl') return '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    if (shadowProp === '2xl') return '0 25px 50px -12px rgba(0, 0, 0, 0.35)';
    if (shadowProp === 'glow') return '0 0 25px rgba(99, 102, 241, 0.6)';
    if (shadowProp === 'glow-emerald') return '0 0 25px rgba(16, 185, 129, 0.6)';
    if (shadowProp === 'glow-amber') return '0 0 25px rgba(245, 158, 11, 0.6)';
    return shadowProp;
  };

  const activeShadowProp = props.shadow || props.inputShadow || props.formShadow || (style.effects?.boxShadow !== 'none' ? style.effects.boxShadow : undefined);
  const activeBorderColor = props.borderColor || style.borders?.borderColor || '#334155';
  const activeBorderWidth = props.borderWidth || (style.borders?.borderWidth && style.borders.borderWidth !== '0px' ? style.borders.borderWidth : (style.borders?.borderStyle && style.borders.borderStyle !== 'none' ? '1px' : undefined));
  const activeBorderStyle = props.borderStyle || (style.borders?.borderStyle && style.borders.borderStyle !== 'none' ? style.borders.borderStyle : (props.borderWidth || props.borderColor ? 'solid' : undefined));
  const activeBorderRadius = props.borderRadius || style.borders?.borderRadiusTopLeft;

  // Style builder transformations
  const isHiddenForDevice = 
    (viewportMode === 'mobile' && style.layoutAnim?.deviceVisibility === 'desktop-only') ||
    (viewportMode === 'desktop' && style.layoutAnim?.deviceVisibility === 'mobile-only');

  const blurFilter = (style.effects?.blur && style.effects.blur !== 'none' && style.effects.blur !== '0px') 
    ? `blur(${style.effects.blur})` 
    : undefined;

  const hasRadius = Boolean(
    (activeBorderRadius && activeBorderRadius !== '0' && activeBorderRadius !== '0px') ||
    (style.borders?.borderRadiusTopRight && style.borders.borderRadiusTopRight !== '0px') ||
    (style.borders?.borderRadiusBottomRight && style.borders.borderRadiusBottomRight !== '0px') ||
    (style.borders?.borderRadiusBottomLeft && style.borders.borderRadiusBottomLeft !== '0px')
  );

  const containerStyle: React.CSSProperties = {
    display: isHiddenForDevice ? 'none' : undefined,
    fontFamily: style.typography?.fontFamily,
    color: style.typography?.color || props.textColor || props.color,
    fontSize: (viewportMode === 'mobile' && style.typography?.mobileFontSize) ? style.typography.mobileFontSize : style.typography?.fontSize,
    fontWeight: style.typography?.fontWeight,
    fontStyle: style.typography?.fontStyle,
    textTransform: style.typography?.textTransform as any,
    lineHeight: style.typography?.lineHeight,
    letterSpacing: style.typography?.letterSpacing,
    textAlign: style.typography?.textAlign,
    textShadow: style.typography?.textShadow !== 'none' ? style.typography?.textShadow : undefined,
    marginTop: style.boxModel.marginTop,
    marginRight: style.boxModel.marginRight,
    marginBottom: style.boxModel.marginBottom,
    marginLeft: style.boxModel.marginLeft,
    paddingTop: style.boxModel.paddingTop,
    paddingRight: style.boxModel.paddingRight,
    paddingBottom: style.boxModel.paddingBottom,
    paddingLeft: style.boxModel.paddingLeft,
    width: style.boxModel.width,
    maxWidth: style.boxModel.maxWidth,
    height: style.boxModel.height,
    backgroundColor: (props.formBgColor && props.formBgColor !== 'transparent') ? (props.formBgColor.startsWith('#') && props.formBgOpacity !== undefined ? props.formBgColor.substring(0,7) + Math.round((props.formBgOpacity / 100) * 255).toString(16).padStart(2, '0') : props.formBgColor) : (style.background.bgType === 'color' ? style.background.backgroundColor : undefined),
    backgroundImage: style.background.bgType === 'gradient' ? style.background.gradient : style.background.bgType === 'image' && style.background.bgImage ? `url(${style.background.bgImage})` : undefined,
    backgroundSize: style.background.bgImageSize,
    borderStyle: activeBorderStyle as any,
    borderColor: activeBorderStyle ? activeBorderColor : undefined,
    borderWidth: activeBorderStyle ? activeBorderWidth : undefined,
    borderTopLeftRadius: props.borderRadius || style.borders?.borderRadiusTopLeft,
    borderTopRightRadius: props.borderRadius || style.borders?.borderRadiusTopRight || style.borders?.borderRadiusTopLeft,
    borderBottomRightRadius: props.borderRadius || style.borders?.borderRadiusBottomRight || style.borders?.borderRadiusTopLeft,
    borderBottomLeftRadius: props.borderRadius || style.borders?.borderRadiusBottomLeft || style.borders?.borderRadiusTopLeft,
    boxShadow: computeShadow(activeShadowProp),
    opacity: style.effects?.opacity,
    filter: blurFilter,
    backdropFilter: style.effects?.backdropFilter !== 'none' ? style.effects?.backdropFilter : undefined,
    zIndex: style.layoutAnim?.zIndex,
    position: style.layoutAnim?.position as any,
    overflow: hasRadius ? 'hidden' : undefined,
  };

  const typoStyle: React.CSSProperties = {
    fontFamily: style.typography?.fontFamily,
    fontSize: (viewportMode === 'mobile' && style.typography?.mobileFontSize) ? style.typography.mobileFontSize : style.typography?.fontSize,
    fontWeight: style.typography?.fontWeight,
    fontStyle: style.typography?.fontStyle,
    textTransform: style.typography?.textTransform as any,
    lineHeight: style.typography?.lineHeight,
    letterSpacing: style.typography?.letterSpacing,
    textAlign: style.typography?.textAlign,
    color: style.typography?.color || props.textColor || props.color
  };

  const isAlignedElement = ['image', 'logo_image', 'video', 'icon', 'button', 'social_share'].includes(type);
  if (isAlignedElement && style.typography?.textAlign) {
    if (style.typography.textAlign === 'center') {
      containerStyle.marginLeft = 'auto';
      containerStyle.marginRight = 'auto';
    } else if (style.typography.textAlign === 'right') {
      containerStyle.marginLeft = 'auto';
      containerStyle.marginRight = '0';
    } else if (style.typography.textAlign === 'left') {
      containerStyle.marginLeft = '0';
      containerStyle.marginRight = 'auto';
    }
  }

  // Inline text editing handler
  const handleContentBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (onTextChange && !isInteractiveMode) {
      onTextChange(e.currentTarget.innerHTML);
    }
  };

  // Category 1: Typography & Content
  switch (type) {
    case 'clickpop_button':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-clickpop'));
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-extrabold  shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2.5 transition-transform hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span contentEditable={!isInteractiveMode} onBlur={handleContentBlur} suppressContentEditableWarning>
              {props.buttonText || "⚡ OPEN SPECIAL CLICKPOP OPTIN OFFER"}
            </span>
            <MousePointerClick className="w-5 h-5" />
          </button>
        </div>
      );

    case 'headline':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          {style.typography?.isGradientFill ? (
            <h1 
              contentEditable={!isInteractiveMode}
              onBlur={handleContentBlur}
              suppressContentEditableWarning
              className="bg-clip-text text-transparent outline-none focus:ring-2 focus:ring-indigo-500 px-1"
              style={{
                ...typoStyle,
                backgroundImage: `linear-gradient(135deg, ${style.typography.gradientStart || '#818cf8'} 0%, ${style.typography.gradientEnd || '#c084fc'} 100%)`
              }}
              dangerouslySetInnerHTML={{ __html: props.text || 'Enter Headline Text Here' }}
            />
          ) : (
            <h1 
              contentEditable={!isInteractiveMode}
              onBlur={handleContentBlur}
              suppressContentEditableWarning
              className="outline-none focus:ring-2 focus:ring-indigo-500 px-1"
              style={typoStyle}
              dangerouslySetInnerHTML={{ __html: props.text || 'Enter Headline Text Here' }}
            />
          )}
        </div>
      );

    case 'subheadline':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <h2 
            contentEditable={!isInteractiveMode}
            onBlur={handleContentBlur}
            suppressContentEditableWarning
            className="outline-none focus:ring-2 focus:ring-indigo-500 px-1"
            style={typoStyle}
            dangerouslySetInnerHTML={{ __html: props.text || 'Enter Subheadline Text Here' }}
          />
        </div>
      );

    case 'paragraph':
    case 'rich_text':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <p 
            contentEditable={!isInteractiveMode}
            onBlur={handleContentBlur}
            suppressContentEditableWarning
            className="outline-none focus:ring-2 focus:ring-indigo-500 px-1"
            style={typoStyle}
            dangerouslySetInnerHTML={{ __html: props.text || 'Enter detailed body paragraph content here. High-converting sales copy helps guide visitors down the sales funnel.' }}
          />
        </div>
      );

    case 'text_block':
    case 'advanced_text_block':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          {isInteractiveMode ? (
            <div 
              dangerouslySetInnerHTML={{ __html: props.text || '<p>Advanced Text Block</p>' }} 
              style={{ color: style.typography.color || props.textColor || props.color }} 
            />
          ) : (
            <div className="bg-white border border-slate-200 p-4 rounded-xl" style={{ color: style.typography.color || props.textColor || props.color }}>
              <div className="text-xs font-mono text-slate-500 mb-2 border-b border-slate-200 pb-2 flex justify-between">
                <span>&lt;html&gt; / css block</span>
                <span className="text-indigo-400 font-semibold cursor-pointer">Edit Source</span>
              </div>
              <div 
                contentEditable={true}
                onBlur={handleContentBlur}
                suppressContentEditableWarning
                className="outline-none focus:ring-2 focus:ring-indigo-500 px-1 min-h-[60px]"
                style={{ color: style.typography.color || props.textColor || props.color }}
              >
                {props.text || 'Edit this text or click "Edit Source" to modify HTML/CSS directly.'}
              </div>
            </div>
          )}
        </div>
      );

    case 'bullet_list':
    case 'icon_list':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <ul className="space-y-2.5" style={{ color: style.typography.color || props.textColor || props.color }}>
            {(props.items || [
              '100% Fully Responsive Visual Canvas Engine',
              'Automated 1-Click Post-Purchase Upsell Vaulting',
              'Comprehensive Student Membership & Drip Portal'
            ]).map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5" style={{ color: style.typography.color || props.textColor || props.color }}>
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: props.iconColor || style.typography.color || props.textColor || '#10b981' }} />
                <span style={{ color: style.typography.color || props.textColor || props.color }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'image_list':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <ul className="space-y-3" style={{ color: style.typography.color || props.textColor || props.color }}>
            {(props.items || [
              'Benefit 1',
              'Benefit 2',
              'Benefit 3'
            ]).map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3" style={{ color: style.typography.color || props.textColor || props.color }}>
                <img 
                  src={props.bulletImageUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=32&h=32&fit=crop'} 
                  alt="bullet" 
                  className="w-6 h-6 shrink-0 mt-0.5 object-cover border border-slate-300 rounded" 
                />
                <span style={{ color: style.typography.color || props.textColor || props.color }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'quote_block':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <blockquote 
            className="border-l-4 border-indigo-500 pl-4 py-2 italic bg-white/60 rounded-r-lg"
            style={{ 
              color: style.typography.color || props.textColor || props.color,
              borderColor: props.borderColor || style.borders.borderColor || style.typography.color || '#6366f1'
            }}
          >
            <p style={{ color: style.typography.color || props.textColor || props.color }}>
              "{props.quote || 'LaunchEngine doubled our sales funnel conversion rate within 48 hours.'}"
            </p>
            <footer className="mt-2 text-xs font-semibold not-italic" style={{ color: props.authorColor || style.typography.color || props.textColor || '#818cf8' }}>
              — {props.author || 'Sarah Jenkins, CEO GrowthLabs'}
            </footer>
          </blockquote>
        </div>
      );

    case 'callout_box':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-2 font-medium" style={{ color: style.typography.color || props.textColor || props.color }}>
            <Sparkles className="w-4 h-4 text-pink-400 shrink-0 animate-pulse" />
            <span style={{ color: style.typography.color || props.textColor || props.color }}>{props.title || 'LIMITED TIME OFFER: SAVE 80% TODAY ONLY'}</span>
          </div>
        </div>
      );

    case 'divider':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} py-4 ${isSelected ? 'is-selected' : ''}`}>
          <hr 
            style={{ 
              borderColor: props.color || '#334155', 
              borderStyle: props.style || 'solid', 
              borderWidth: props.width || '1px' 
            }} 
            className="w-full"
          />
        </div>
      );

    // Category 2: Media & Embeds
    case 'image':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} overflow-hidden group ${isSelected ? 'is-selected' : ''}`}>
          <img 
            src={props.src || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80'} 
            alt={props.alt || 'Funnel Media'} 
            className="w-full h-full object-cover  transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      );

    case 'image_popup':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div 
            onClick={() => setIsImagePopupOpen(true)}
            className="relative cursor-pointer group  overflow-hidden border border-slate-200 bg-white shadow-lg hover:border-indigo-500 transition-all"
          >
            <img 
              src={props.thumbnailUrl || props.src || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'} 
              alt="Thumbnail Preview" 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-white/40 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <span className="p-3 bg-indigo-600/90 text-white -full shadow-lg group-hover:scale-110 transition-transform">
                <Maximize2 className="w-5 h-5" />
              </span>
            </div>
            <div className="p-2.5 bg-white/90 border-t border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>{props.caption || 'Click to enlarge full resolution diagram'}</span>
              <span className="text-[10px] text-indigo-400 font-extrabold uppercase">Popup Preview</span>
            </div>
          </div>

          {/* Full Lightbox Image Modal */}
          {isImagePopupOpen && (
            <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
              <div className="relative max-w-4xl w-full bg-white border border-slate-200  overflow-hidden shadow-2xl">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsImagePopupOpen(false); }}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-slate-900 -full border border-slate-300 shadow"
                >
                  <X className="w-5 h-5" />
                </button>
                <img 
                  src={props.fullSizeUrl || props.thumbnailUrl || props.src || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80'} 
                  alt="Full Lightbox View" 
                  className="w-full max-h-[80vh] object-contain bg-white"
                />
              </div>
            </div>
          )}
        </div>
      );

    case 'video_popup':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div 
            onClick={() => setIsVideoPopupOpen(true)}
            className="relative aspect-video w-full  overflow-hidden border border-indigo-500/40 bg-white cursor-pointer group shadow-2xl"
          >
            <img 
              src={props.posterUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&auto=format&fit=crop&q=80'} 
              alt="Video Lightbox Poster" 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 -full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/50 group-hover:scale-110 transition-transform mb-3">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 max-w-md">{props.title || 'Watch Video Testimonial in Popup Lightbox'}</h4>
              <span className="text-[11px] text-indigo-300 font-semibold mt-1">Click to play distraction-free video</span>
            </div>
          </div>

          {/* Lightbox Video Player Modal */}
          {isVideoPopupOpen && (
            <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex items-center justify-center p-6 animate-fade-in">
              <div className="relative max-w-4xl w-full aspect-video bg-white border border-slate-200  overflow-hidden shadow-2xl">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsVideoPopupOpen(false); }}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-slate-50 text-slate-900 -full border border-slate-300 shadow-xl"
                >
                  <X className="w-5 h-5" />
                </button>
                <video 
                  src={props.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      );

    case 'video_playlist':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="relative w-full overflow-hidden rounded-xl bg-white border border-slate-200 shadow-xl" style={{ paddingTop: '56.25%' }}>
            {(() => {
              const url = props.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
              if (url.includes('youtube.com') || url.includes('youtu.be')) {
                let videoId = '';
                try {
                  if (url.includes('youtube.com/watch')) {
                    videoId = new URL(url).searchParams.get('v') || '';
                  } else {
                    videoId = url.split('/').pop()?.split('?')[0] || '';
                  }
                } catch(e) {}
                return <iframe className="w-full h-full absolute inset-0" src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`} allowFullScreen></iframe>;
              }
              if (url.includes('vimeo.com')) {
                const videoId = url.split('/').pop()?.split('?')[0];
                return <iframe className="w-full h-full absolute inset-0" src={`https://player.vimeo.com/video/${videoId}`} allowFullScreen></iframe>;
              }
              if (url.includes('wistia.com') || url.includes('wistia.net')) {
                const videoId = url.split('/').pop()?.split('?')[0];
                return <iframe className="w-full h-full absolute inset-0" src={`https://fast.wistia.net/embed/iframe/${videoId}`} allowFullScreen></iframe>;
              }
              return <video className="w-full h-full absolute inset-0 object-cover" src={url} controls poster={props.posterUrl}></video>;
            })()}
          </div>
          {type === 'video_playlist' && (
            <div className="mt-4 space-y-2">
              <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-sm cursor-pointer hover:border-indigo-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">1</div>
                  <span className="text-sm font-semibold text-slate-900">Introduction & Setup</span>
                </div>
                <span className="text-xs text-slate-500">5:24</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-sm cursor-pointer hover:border-indigo-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-xs">2</div>
                  <span className="text-sm font-medium text-slate-700">Advanced Strategies</span>
                </div>
                <span className="text-xs text-slate-500">12:15</span>
              </div>
            </div>
          )}
        </div>
      );

    case 'image_gallery':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="aspect-video bg-slate-50  overflow-hidden border border-slate-300">
                <img 
                  src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      );

    case 'video_player':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} overflow-hidden  bg-white border border-indigo-500/40 shadow-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="relative aspect-video w-full bg-white flex items-center justify-center group">
            {videoPlaying ? (
              <video 
                src={props.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'} 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img 
                  src={props.posterUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80'} 
                  alt="Video Poster" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-center justify-center">
                  <button 
                    onClick={() => setVideoPlaying(true)}
                    className="w-16 h-16 -full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg shadow-indigo-500/50 hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="bg-white/80 backdrop-blur px-2.5 py-1  border border-slate-300">HD VSL Stream (Custom Player)</span>
                  <span className="bg-indigo-600/90 text-white px-2.5 py-1 ">00:00 / 12:45</span>
                </div>
              </>
            )}
          </div>
        </div>
      );

    case 'audio_player':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          {isInteractiveMode ? (
            <div className="w-full bg-white p-3  border border-slate-200 flex items-center shadow-lg">
              <audio 
                controls 
                className="w-full"
                src={props.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div className="p-4 bg-white  border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 -full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/20">
                <Volume2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">{props.title || 'Podcast Episode #42: Scaling High Ticket Funnels'}</div>
                <div className="w-full bg-slate-50 h-2 -full mt-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full w-1/3 -full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      );


    case 'announcement_bar':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div 
            style={{ backgroundColor: props.barColor || '#ef4444' }} 
            className="w-full px-4 py-2.5 flex items-center justify-center text-center shadow-md cursor-pointer hover:opacity-90 transition-opacity"
          >
            <a 
              href={props.linkUrl || '#'} 
              style={{ color: props.textColor || '#ffffff' }} 
              className="font-bold text-sm md:text-base flex items-center gap-2"
              onClick={(e) => { if (!isInteractiveMode) e.preventDefault(); }}
            >
              <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
              <span>{props.text || 'FLASH SALE: Get 50% Off All Plans Today Only!'}</span>
            </a>
          </div>
        </div>
      );

    case 'footer_block':
      const links = (props.menuLinks || 'Home, About, Terms, Privacy').split(',').map((l: string) => l.trim());
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <footer className="w-full bg-white border-t border-slate-200 py-12 px-6 flex flex-col items-center justify-center space-y-6">
            
            {props.showMenu !== false && (
              <nav className="flex flex-wrap items-center justify-center gap-6">
                {links.map((link: string, idx: number) => (
                  <a key={idx} href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-400 transition-colors" onClick={(e) => e.preventDefault()}>
                    {link}
                  </a>
                ))}
              </nav>
            )}

            {props.showSocials !== false && (
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:border-indigo-500 transition-colors" onClick={(e) => e.preventDefault()}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:border-indigo-500 transition-colors" onClick={(e) => e.preventDefault()}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:border-indigo-500 transition-colors" onClick={(e) => e.preventDefault()}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            )}

            <div className="text-xs text-slate-500 font-medium">
              {props.copyrightText || '� 2026 Funnel Legends. All Rights Reserved.'}
            </div>

          </footer>
        </div>
      );

    case 'custom_html':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white/80  border border-dashed border-amber-500/50' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <FileText className="w-4 h-4" />
            <span>Custom HTML/JS Embed Block</span>
          </div>
          <div className="text-xs text-slate-600 font-mono bg-white p-2 ">
            {props.code || '&lt;script src="https://analytics.embed.js"&gt;&lt;/script&gt;'}
          </div>
        </div>
      );

    case 'custom_code':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white/80  border border-dashed border-amber-500/50' : ''} ${isSelected ? 'is-selected' : ''}`}>
          {isInteractiveMode ? (
            <div dangerouslySetInnerHTML={{ __html: props.code || '' }} />
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                <Code2 className="w-4 h-4" />
                <span>Custom Code Block (HTML, CSS, JS)</span>
              </div>
              <div className="text-xs text-slate-600 font-mono bg-white p-2  whitespace-pre-wrap">
                {props.code || '<!-- Enter custom HTML, JS, or CSS here -->'}
              </div>
            </>
          )}
        </div>
      );

    // Category 3: Form & Capture & Webinar
    case 'button':
      const btnBg = props.buttonColor || '#4f46e5';
      const btnHoverBg = props.buttonHoverColor || '#4338ca';
      const btnTextColor = props.buttonTextColor || '#ffffff';
      const btnBorderColor = props.borderColor || 'transparent';
      const btnBorderWidth = props.borderWidth || '0px';
      const shadowClass = props.shadow === 'none' ? 'shadow-none' : 
                          props.shadow === 'md' ? 'shadow-md' : 
                          props.shadow === 'xl' ? 'shadow-xl' : 
                          props.shadow === '2xl' ? 'shadow-2xl' : 'shadow-lg';
      
      let ButtonIcon = null;
      if (props.iconName) {
        const pascalName = props.iconName.split(/[-_ ]+/).map((word:string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
        ButtonIcon = (LucideIcons as any)[pascalName];
      }
      
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <button 
            type="button"
            className={`w-full flex flex-col items-center justify-center  font-bold transition-all duration-200 transform hover:scale-[1.02] group ${shadowClass}`}
            style={{ 
              backgroundColor: btnBg, 
              color: btnTextColor,
              borderColor: btnBorderColor,
              borderWidth: btnBorderWidth,
              borderStyle: btnBorderWidth !== '0px' && btnBorderWidth !== '0' ? 'solid' : 'none',
              padding: props.padding || '16px 32px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = btnHoverBg}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = btnBg}
          >
            <div className="flex items-center justify-center gap-2">
              {ButtonIcon && <ButtonIcon className="w-5 h-5 shrink-0" />}
              <span className="text-center leading-tight drop-shadow-sm">
                {props.buttonText || 'CLICK HERE TO SIGN UP'}
              </span>
            </div>
            {(props.subText || props.subText !== '') && (
              <span className="text-xs md:text-sm mt-1 opacity-80 font-medium text-center">
                {props.subText || '(Get Instant Access)'}
              </span>
            )}
          </button>
        </div>
      );

    case 'autowebinar_registration':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-gradient-to-br from-indigo-950/90 to-slate-900  border border-indigo-500/40 shadow-2xl space-y-4 ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-extrabold">
              <CalendarCheck className="w-4 h-4" />
              <span>Automated Webinar Registration Gate</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-0.5  border border-emerald-800 font-bold">
              Follow-ups Armed ✓
            </span>
          </div>

          {!isRegisteredWebinar ? (
            <div className="space-y-3.5">
              <h3 className="text-lg font-black text-slate-900">{props.title || 'Reserve Your Seat for the Masterclass'}</h3>
              
              {/* Date & Time Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Select Date:</label>
                  <select 
                    value={webinarDateChoice}
                    onChange={(e) => setWebinarDateChoice(e.target.value)}
                    className="w-full bg-white border border-slate-200  px-3 py-2 text-xs text-slate-900 font-semibold"
                  >
                    <option value="today_15m">⚡ Watch Right Now (In 15 Mins)</option>
                    <option value="today_2pm">📅 Today, Aug 11 at 2:00 PM</option>
                    <option value="tomorrow">📅 Tomorrow, Aug 12 at 2:00 PM</option>
                    <option value="thursday">📅 Thursday, Aug 13 at 2:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Select Session Time:</label>
                  <select 
                    value={webinarTimeChoice}
                    onChange={(e) => setWebinarTimeChoice(e.target.value)}
                    className="w-full bg-white border border-slate-200  px-3 py-2 text-xs text-slate-900 font-semibold"
                  >
                    <option value="10am">10:00 AM EST (Morning Session)</option>
                    <option value="2pm">2:00 PM EST (Afternoon Session)</option>
                    <option value="6pm">6:00 PM EST (Evening Session)</option>
                    <option value="9pm">9:00 PM EST (Late Night Session)</option>
                  </select>
                </div>
              </div>

              {/* Registrant Contact Fields */}
              <div className="space-y-2 pt-1">
                <input 
                  type="text" 
                  placeholder="Enter your full name..." 
                  className="w-full px-3.5 py-2.5 text-xs focus:outline-none" 
                  style={{ 
                    backgroundColor: props.inputBgColor || '#0f172a',
                    borderColor: props.borderColor || '#334155',
                    borderWidth: props.borderWidth || '1px',
                    borderStyle: props.borderStyle || 'solid',
                    borderRadius: props.borderRadius || '12px',
                    color: props.fieldTextColor || '#f8fafc',
                    textAlign: style?.typography?.textAlign || 'inherit' 
                  }} 
                />
                <input 
                  type="email" 
                  placeholder="Enter your best email address..." 
                  className="w-full px-3.5 py-2.5 text-xs focus:outline-none" 
                  style={{ 
                    backgroundColor: props.inputBgColor || '#0f172a',
                    borderColor: props.borderColor || '#334155',
                    borderWidth: props.borderWidth || '1px',
                    borderStyle: props.borderStyle || 'solid',
                    borderRadius: props.borderRadius || '12px',
                    color: props.fieldTextColor || '#f8fafc',
                    textAlign: style?.typography?.textAlign || 'inherit' 
                  }} 
                />
                <input 
                  type="tel" 
                  placeholder="Mobile phone for SMS reminder alerts..." 
                  className="w-full px-3.5 py-2.5 text-xs focus:outline-none" 
                  style={{ 
                    backgroundColor: props.inputBgColor || '#0f172a',
                    borderColor: props.borderColor || '#334155',
                    borderWidth: props.borderWidth || '1px',
                    borderStyle: props.borderStyle || 'solid',
                    borderRadius: props.borderRadius || '12px',
                    color: props.fieldTextColor || '#f8fafc',
                    textAlign: style?.typography?.textAlign || 'inherit' 
                  }} 
                />
              </div>

              <button 
                onClick={() => setIsRegisteredWebinar(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold py-3.5 text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 mt-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{props.buttonText || 'REGISTER FOR AUTOMATED WEBINAR NOW'}</span>
              </button>
            </div>
          ) : (
            <div className="p-6 bg-white  border border-emerald-500/40 text-center space-y-3 animate-fade-in">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-extrabold text-slate-900">Registration Confirmed!</h4>
              <p className="text-xs text-slate-700">
                Your seat is reserved. SMS and email reminders are scheduled based on your selected date & time.
              </p>
            </div>
          )}
        </div>
      );

    case 'webinar_date':
      const dateOpts = props.option1 && props.option2 
        ? [{ id: 'd1', label: props.option1 }, { id: 'd2', label: props.option2 }]
        : [
            { id: 'd1', label: '⚡ Watch Right Now (In 15 Minutes)' },
            { id: 'd2', label: '📅 Today at 2:00 PM EST' },
            { id: 'd3', label: '📅 Tomorrow at 2:00 PM EST' }
          ];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white  border border-slate-200 space-y-3' : 'space-y-3'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">{props.label || 'Select Webinar Broadcast Date:'}</span>
            <Calendar className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="space-y-2">
            {dateOpts.map((d) => (
              <label key={d.id} className={`flex items-center justify-between p-3 border text-xs font-medium cursor-pointer transition-all ${webinarDateChoice === d.id ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`} style={{ color: props.fieldTextColor || undefined }}>
                <span>{d.label}</span>
                <input 
                  type="radio" 
                  name="webinar_date_sel" 
                  checked={webinarDateChoice === d.id} 
                  onChange={() => setWebinarDateChoice(d.id)}
                  className="text-indigo-500 focus:ring-indigo-500"
                />
              </label>
            ))}
          </div>
        </div>
      );

    case 'webinar_time':
      const rawSlots = props.slots ? props.slots.split(',').map((s: string) => s.trim()) : ['10:00 AM EST', '2:00 PM EST', '6:00 PM EST', '9:00 PM EST'];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white  border border-slate-200 space-y-3' : 'space-y-3'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">{props.label || 'Select Session Time Slot:'}</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {rawSlots.map((slot: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setWebinarTimeChoice(slot)}
                className={`p-2.5 border font-bold text-center transition-all ${webinarTimeChoice === slot ? 'bg-indigo-600 text-white border-indigo-500 shadow' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'}`}
                style={{ color: webinarTimeChoice === slot ? '#ffffff' : (props.fieldTextColor || undefined) }}
              >
                {slot}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-slate-600 flex items-center gap-1.5 pt-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Reminder emails & SMS automatically sync to selected time.</span>
          </div>
        </div>
      );

    case 'add_event':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-5 bg-white  border border-slate-200 space-y-4' : 'space-y-4'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>{props.buttonText || 'Add Webinar Event to Your Calendar'}</span>
            </div>
            <span className="text-[10px] text-slate-600">1-Click Integration</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <button 
              onClick={() => {
                setAddedCalendarType('Google');
                alert('Webinar event added to Google Calendar!');
              }}
              className="p-3 bg-white hover:bg-indigo-950/60 border border-slate-200 font-semibold text-slate-800 flex flex-col items-center gap-1 transition-all"
            >
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Google Calendar</span>
            </button>

            <button 
              onClick={() => {
                setAddedCalendarType('Apple');
                alert('Webinar event added to Apple iCal!');
              }}
              className="p-3 bg-white hover:bg-indigo-950/60 border border-slate-200 font-semibold text-slate-800 flex flex-col items-center gap-1 transition-all"
            >
              <Calendar className="w-4 h-4 text-pink-400" />
              <span>Apple iCal</span>
            </button>

            <button 
              onClick={() => {
                setAddedCalendarType('Outlook');
                alert('Webinar event added to Outlook!');
              }}
              className="p-3 bg-white hover:bg-indigo-950/60 border border-slate-200 font-semibold text-slate-800 flex flex-col items-center gap-1 transition-all"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Outlook</span>
            </button>

            <button 
              onClick={() => {
                setAddedCalendarType('ICS');
                alert('Downloading .ICS calendar invite file...');
              }}
              className="p-3 bg-white hover:bg-indigo-950/60 border border-slate-200 font-semibold text-slate-800 flex flex-col items-center gap-1 transition-all"
            >
              <Upload className="w-4 h-4 text-emerald-400 rotate-180" />
              <span>Download .ICS</span>
            </button>
          </div>

          {addedCalendarType && (
            <div className="text-center text-xs font-bold text-emerald-400 animate-fade-in">
              ✓ Event added to {addedCalendarType} Calendar! Reminders enabled.
            </div>
          )}
        </div>
      );

    case 'survey':
      const surveyOptions = props.options ? props.options.split(',').map((o: string) => o.trim()) : [
        'Low opt-in conversion rate on squeeze page',
        'Checkout cart abandonment on order page',
        'Struggling to sell post-purchase upsells',
        'Managing course drip content & student portals'
      ];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-indigo-500/40 shadow-2xl space-y-5 ${isSelected ? 'is-selected' : ''}`}>
          {/* Header & Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
              <Workflow className="w-4 h-4" />
              <span>{props.title || 'Interactive Qualification Survey'}</span>
            </div>
            <span className="text-xs font-bold text-slate-600">Step {surveyStep} of 3</span>
          </div>

          <div className="w-full bg-white h-2 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-500"
              style={{ width: `${(surveyStep / 3) * 100}%` }}
            ></div>
          </div>

          {/* Question Progression */}
          {!surveyCompleted ? (
            <div className="space-y-4">
              {surveyStep === 1 && (
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900">{props.questionText || 'Q1: What is your primary sales funnel bottleneck?'}</h4>
                  <div className="space-y-2">
                    {surveyOptions.map((opt: string, i: number) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setSurveyAnswers({ ...surveyAnswers, 1: opt });
                          setSurveyStep(2);
                        }}
                        className="w-full p-3.5 bg-white hover:bg-indigo-950/60 border border-slate-200 hover:border-indigo-500  text-xs font-semibold text-slate-800 transition-all flex items-center justify-between group"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {surveyStep === 2 && (
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900">Q2: What is your target monthly revenue goal?</h4>
                  <div className="space-y-2">
                    {['$10,000 / month', '$25,000 / month', '$50,000 / month', '$100,000+ / month'].map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setSurveyAnswers({ ...surveyAnswers, 2: opt });
                          setSurveyStep(3);
                        }}
                        className="w-full p-3.5 bg-white hover:bg-indigo-950/60 border border-slate-200 hover:border-indigo-500  text-xs font-semibold text-slate-800 transition-all flex items-center justify-between group"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {surveyStep === 3 && (
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900">Q3: How soon are you prepared to deploy your new funnel?</h4>
                  <div className="space-y-2">
                    {['Immediately (Next 24 Hours)', 'Within 7 Days', 'Within 30 Days'].map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setSurveyAnswers({ ...surveyAnswers, 3: opt });
                          setSurveyCompleted(true);
                        }}
                        className="w-full p-3.5 bg-white hover:bg-emerald-950/60 border border-slate-200 hover:border-emerald-500  text-xs font-semibold text-slate-800 transition-all flex items-center justify-between group"
                      >
                        <span>{opt}</span>
                        <Check className="w-4 h-4 text-emerald-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-white  border border-emerald-500/40 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 -full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">You Qualify for the LaunchEngine Scale Package!</h4>
              <p className="text-xs text-slate-700 max-w-md mx-auto">
                Based on your answers, your lead profile has been segmented as <strong className="text-emerald-400 font-mono">HIGH TICKET SAAS APPLICANT</strong>.
              </p>
              <button 
                onClick={() => alert('Redirecting to personalized checkout page...')}
                className="w-full max-w-sm mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold py-3.5  text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
              >
                <span>Proceed to Tailored Offer Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      );

    case 'text_input': {
      const shadowProp = props.inputShadow || props.shadow || props.formShadow;
      let boxShadow = 'none';
      if (shadowProp === 'sm') boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'md') boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      else if (shadowProp === 'lg') boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'xl') boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      else if (shadowProp === '2xl') boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.35)';
      else if (shadowProp === 'glow') boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
      else if (shadowProp === 'glow-emerald') boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
      else if (shadowProp === 'glow-amber') boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';

      const wrapperBg = props.formBgColor && props.formBgColor !== 'transparent' ? props.formBgColor : undefined;

      return (
        <div 
          style={{ ...containerStyle, backgroundColor: wrapperBg || containerStyle.backgroundColor }} 
          onClick={onSelect} 
          className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} space-y-1.5 p-2.5 rounded-2xl ${isSelected ? 'is-selected' : ''}`}
        >
          {props.label && (
            <label className="block text-xs font-semibold text-slate-700">
              {props.label}
            </label>
          )}
          <input 
            type="text" 
            placeholder={props.placeholder || 'Enter your email...'} 
            disabled={!isInteractiveMode}
            className="w-full px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ 
              backgroundColor: props.inputBgColor || '#0f172a',
              borderColor: props.borderColor || '#334155',
              borderWidth: props.borderWidth || '1px',
              borderStyle: props.borderStyle || 'solid',
              borderRadius: props.borderRadius || '12px',
              color: props.fieldTextColor || '#f8fafc',
              boxShadow,
              textAlign: style?.typography?.textAlign || 'inherit' 
            }} 
          />
        </div>
      );
    }

    case 'textarea': {
      const shadowProp = props.inputShadow || props.shadow || props.formShadow;
      let boxShadow = 'none';
      if (shadowProp === 'sm') boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'md') boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      else if (shadowProp === 'lg') boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'xl') boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      else if (shadowProp === '2xl') boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.35)';
      else if (shadowProp === 'glow') boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
      else if (shadowProp === 'glow-emerald') boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
      else if (shadowProp === 'glow-amber') boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';

      const wrapperBg = props.formBgColor && props.formBgColor !== 'transparent' ? props.formBgColor : undefined;

      return (
        <div 
          style={{ ...containerStyle, backgroundColor: wrapperBg || containerStyle.backgroundColor }} 
          onClick={onSelect} 
          className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} space-y-1.5 p-2.5 rounded-2xl ${isSelected ? 'is-selected' : ''}`}
        >
          {props.label && (
            <label className="block text-xs font-semibold text-slate-700">
              {props.label}
            </label>
          )}
          <textarea 
            placeholder={props.placeholder || 'Enter your detailed response here...'} 
            rows={props.rows || 4}
            disabled={!isInteractiveMode}
            className="w-full px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            style={{ 
              backgroundColor: props.inputBgColor || '#0f172a',
              borderColor: props.borderColor || '#334155',
              borderWidth: props.borderWidth || '1px',
              borderStyle: props.borderStyle || 'solid',
              borderRadius: props.borderRadius || '12px',
              color: props.fieldTextColor || '#f8fafc',
              boxShadow,
              textAlign: style?.typography?.textAlign || 'inherit' 
            }} 
          />
        </div>
      );
    }

    case 'sms_signup': {
      const shadowProp = props.inputShadow || props.shadow || props.formShadow;
      let boxShadow = 'none';
      if (shadowProp === 'sm') boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'md') boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      else if (shadowProp === 'lg') boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'xl') boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      else if (shadowProp === '2xl') boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.35)';
      else if (shadowProp === 'glow') boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
      else if (shadowProp === 'glow-emerald') boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
      else if (shadowProp === 'glow-amber') boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';

      const wrapperBg = props.formBgColor && props.formBgColor !== 'transparent' ? props.formBgColor : undefined;

      return (
        <div 
          style={{ ...containerStyle, backgroundColor: wrapperBg || containerStyle.backgroundColor }} 
          onClick={onSelect} 
          className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} space-y-2 p-2.5 rounded-2xl ${isSelected ? 'is-selected' : ''}`}
        >
          <label className="block text-xs font-semibold text-slate-700">{props.label || 'Mobile Phone Number (For SMS Alerts)'}</label>
          <div className="flex relative">
            <span className="inline-flex items-center px-3 border border-r-0 border-slate-200 bg-white text-slate-600 sm:text-sm rounded-l-xl">
              +1
            </span>
            <input 
              type="tel" 
              placeholder={props.placeholder || '(555) 000-0000'} 
              disabled={!isInteractiveMode}
              className="flex-1 min-w-0 block w-full px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-xl"
              style={{ 
                backgroundColor: props.inputBgColor || '#0f172a',
                borderColor: props.borderColor || '#334155',
                borderWidth: props.borderWidth || '1px',
                borderStyle: props.borderStyle || 'solid',
                borderRadius: props.borderRadius ? `0 ${props.borderRadius} ${props.borderRadius} 0` : '0 12px 12px 0',
                color: props.fieldTextColor || '#f8fafc',
                boxShadow,
                textAlign: style?.typography?.textAlign || 'inherit' 
              }} 
            />
          </div>
          <p className="text-[10px] text-slate-500 flex items-start gap-1">
            <MessageCircle className="w-3 h-3 shrink-0 mt-0.5" />
            <span>Check this box to receive webinar reminders and special offers via SMS. Standard message & data rates apply.</span>
          </p>
        </div>
      );
    }

    case 'select_dropdown': {
      const shadowProp = props.inputShadow || props.shadow || props.formShadow;
      let boxShadow = 'none';
      if (shadowProp === 'sm') boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'md') boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      else if (shadowProp === 'lg') boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      else if (shadowProp === 'xl') boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      else if (shadowProp === '2xl') boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.35)';
      else if (shadowProp === 'glow') boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
      else if (shadowProp === 'glow-emerald') boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
      else if (shadowProp === 'glow-amber') boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';

      const wrapperBg = props.formBgColor && props.formBgColor !== 'transparent' ? props.formBgColor : undefined;
      const dropdownOptions = props.options 
        ? props.options.split(',').map((o: string) => o.trim()) 
        : ['Agency / Consultant', 'E-Commerce Store Owner', 'Course Creator / Info Product', 'SaaS Founder'];

      return (
        <div 
          style={{ ...containerStyle, backgroundColor: wrapperBg || containerStyle.backgroundColor }} 
          onClick={onSelect} 
          className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} space-y-1.5 p-2.5 rounded-2xl ${isSelected ? 'is-selected' : ''}`}
        >
          <label className="block text-xs font-semibold text-slate-700">{props.label || 'Select Business Type'}</label>
          <select 
            disabled={!isInteractiveMode}
            className="w-full px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ 
              backgroundColor: props.inputBgColor || '#0f172a',
              borderColor: props.borderColor || '#334155',
              borderWidth: props.borderWidth || '1px',
              borderStyle: props.borderStyle || 'solid',
              borderRadius: props.borderRadius || '12px',
              color: props.fieldTextColor || '#f8fafc',
              boxShadow,
              textAlign: style?.typography?.textAlign || 'inherit' 
            }}
          >
            {dropdownOptions.map((opt: string, idx: number) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }

    case 'multi_step_optin':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-6 bg-white border border-slate-200 space-y-4' : 'space-y-4'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Step {step} of 2</span>
            <span>{step === 1 ? '50% Completed' : '100% Completed'}</span>
          </div>
          <div className="w-full bg-slate-50 h-2 overflow-hidden rounded-full">
            <div className={`bg-indigo-500 h-full transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
          </div>
          {step === 1 ? (
            <div className="space-y-3 pt-2">
              <h4 className="text-lg font-bold text-slate-900">{props.title || 'Where should we send your free growth report?'}</h4>
              <input 
                type="email" 
                placeholder={props.placeholder || 'Enter your best business email...'} 
                className="w-full bg-white border border-slate-300 px-4 py-3 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-xl" 
                style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} 
              />
              <button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 rounded-xl">
                <span>{props.buttonText || 'Continue to Final Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <h4 className="text-lg font-bold text-slate-900">{props.step2Title || 'Enter your phone number for instant SMS access'}</h4>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                className="w-full bg-white border border-slate-300 px-4 py-3 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-xl" 
                style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} 
              />
              <button onClick={() => alert('Opt-in submitted successfully!')} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 rounded-xl">
                <span>{props.step2ButtonText || 'Get Instant Access Now'}</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      );

    // Category 4: E-Commerce & Checkout
    case 'shipping_address':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-5 bg-white  border border-slate-200 space-y-4 ${isSelected ? 'is-selected' : ''}`}>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <MapPin className="w-4 h-4 text-indigo-400" /> Shipping Address
          </h3>
          <div className="space-y-3">
            <input disabled={!isInteractiveMode} type="text" placeholder="Full Name" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
            <input disabled={!isInteractiveMode} type="text" placeholder="Full Address" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
            <div className="grid grid-cols-2 gap-3">
              <input disabled={!isInteractiveMode} type="text" placeholder="City" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              <input disabled={!isInteractiveMode} type="text" placeholder="State/Province" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input disabled={!isInteractiveMode} type="text" placeholder="Zip/Postal Code" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              <select disabled={!isInteractiveMode} className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }}>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      );

    case 'billing_address':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-5 bg-white  border border-slate-200 space-y-4 ${isSelected ? 'is-selected' : ''}`}>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <MapPin className="w-4 h-4 text-emerald-400" /> Billing Address
          </h3>
          <div className="space-y-3">
            <input disabled={!isInteractiveMode} type="text" placeholder="Full Name on Card" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
            <input disabled={!isInteractiveMode} type="text" placeholder="Billing Address" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
            <div className="grid grid-cols-2 gap-3">
              <input disabled={!isInteractiveMode} type="text" placeholder="City" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              <input disabled={!isInteractiveMode} type="text" placeholder="State/Province" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input disabled={!isInteractiveMode} type="text" placeholder="Zip/Postal Code" className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              <select disabled={!isInteractiveMode} className="w-full bg-white border border-slate-200  px-3 py-2 text-sm text-slate-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }}>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      );

    case 'credit_card_form':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white  border border-indigo-500/40 shadow-2xl space-y-4 ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <CreditCard className="w-4 h-4 text-indigo-400" />
              <span>Secure Credit Card Payment Gate</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5  border border-emerald-800">
              <Lock className="w-3 h-3" />
              <span>Stripe Tokenized Vault</span>
            </div>
          </div>

          {!cardSuccess ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Name on Credit Card</label>
                <input type="text" placeholder="Johnathan Vance" className="w-full bg-white border border-slate-200  px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Credit Card Number</label>
                <div className="relative">
                  <input type="text" placeholder="4242 •••• •••• 4242" className="w-full bg-white border border-slate-200  px-3.5 py-2.5 pl-10 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
                  <CreditCard className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">MM / YY</label>
                  <input type="text" placeholder="12 / 28" className="w-full bg-white border border-slate-200  px-3 py-2 text-xs text-slate-900 text-center font-mono" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CVC Code</label>
                  <input type="text" placeholder="888" className="w-full bg-white border border-slate-200  px-3 py-2 text-xs text-slate-900 text-center font-mono" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Postal Code</label>
                  <input type="text" placeholder="90210" className="w-full bg-white border border-slate-200  px-3 py-2 text-xs text-slate-900 text-center font-mono" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
                </div>
              </div>

              <button 
                disabled={cardProcessing}
                onClick={() => {
                  setCardProcessing(true);
                  setTimeout(() => {
                    setCardProcessing(false);
                    setCardSuccess(true);
                  }, 1200);
                }}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold py-3.5  text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>{cardProcessing ? 'PROCESSING CREDIT CARD CHARGE...' : 'PAY & PROCESS ORDER NOW'}</span>
              </button>
            </div>
          ) : (
            <div className="p-6 bg-white  border border-emerald-500/40 text-center space-y-3 animate-fade-in">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-extrabold text-slate-900">Payment Successfully Charged!</h4>
              <p className="text-xs text-slate-700">
                Card credentials vaulted safely via Stripe. Redirecting to Post-Purchase 1-Click Upsell step...
              </p>
            </div>
          )}
        </div>
      );

    case 'order_select':
      const orderProducts = [
        { id: 'enterprise', name: 'LaunchEngine Enterprise Master Pass (Single Payment - Save 40%)', price: '$297.00', badge: 'MOST POPULAR' },
        { id: 'starter', name: 'LaunchEngine Starter Pass (Single Payment)', price: '$147.00', badge: null },
        { id: 'payplan', name: '3-Month Easy Payment Plan (3 Monthly Installments of $99)', price: '$99.00 today', badge: 'FLEXIBLE PAY' }
      ];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-5 bg-white  border border-slate-200 space-y-4' : 'space-y-4'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
              <ShoppingCart className="w-4 h-4 text-indigo-400" />
              <span>Select Product Package / Payment Plan</span>
            </div>
            <span className="text-[10px] text-slate-600">Step 1 of Checkout</span>
          </div>

          <div className="space-y-2.5">
            {orderProducts.map((p) => (
              <label 
                key={p.id}
                onClick={() => setSelectedOrderProductId(p.id)}
                className={`p-3.5  border flex items-center justify-between cursor-pointer transition-all ${selectedOrderProductId === p.id ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="order_product_sel" 
                    checked={selectedOrderProductId === p.id} 
                    onChange={() => setSelectedOrderProductId(p.id)}
                    className="text-indigo-500 focus:ring-indigo-500 mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold">{p.name}</div>
                    {p.badge && (
                      <span className="text-[9px] font-extrabold text-amber-300 bg-amber-950/80 px-2 py-0.5  border border-amber-500/40 inline-block mt-1">
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-sm font-black text-emerald-400 shrink-0">{p.price}</div>
              </label>
            ))}
          </div>
        </div>
      );

    case 'order_summary':
      const selectedBasePrice = selectedOrderProductId === 'enterprise' ? 297 : selectedOrderProductId === 'starter' ? 147 : 99;
      const bumpPrice = summaryIncludeBump ? 27 : 0;
      const discount = 50;
      const finalCalculatedTotal = selectedBasePrice + bumpPrice - discount;

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white  border border-indigo-500/40 shadow-2xl space-y-4 ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>Order Summary & Items Review</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5  border border-emerald-800 font-bold">
              256-Bit SSL Encrypted
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Base item */}
            <div className="flex items-center justify-between p-2.5 bg-white  border border-slate-200">
              <div>
                <span className="font-bold text-slate-800">
                  {selectedOrderProductId === 'enterprise' ? 'LaunchEngine Enterprise Pass' : selectedOrderProductId === 'starter' ? 'LaunchEngine Starter Pass' : '3-Month Easy Payment Plan'}
                </span>
                <div className="text-[10px] text-slate-500">Core Software & Instant License Key</div>
              </div>
              <span className="font-bold text-slate-900">${selectedBasePrice}.00</span>
            </div>

            {/* Order bump item toggle */}
            <div className="p-3 bg-amber-950/20 border border-amber-500/30  flex items-start gap-2.5">
              <input 
                type="checkbox" 
                checked={summaryIncludeBump} 
                onChange={(e) => setSummaryIncludeBump(e.target.checked)} 
                className="mt-0.5  bg-white border-amber-500 text-amber-500 focus:ring-amber-500"
              />
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-300">⚡ Addon: Instant AI VSL Copywriter Pro</span>
                  <div className="text-[10px] text-amber-200/70">1-Click VSL Scripts & Sales Letter Generator</div>
                </div>
                <span className="font-bold text-amber-400">$27.00</span>
              </div>
            </div>

            {/* Discount Coupon Tag */}
            <div className="flex items-center justify-between p-2 bg-emerald-950/40 border border-emerald-500/30  text-emerald-400 font-semibold text-[11px]">
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Promo Code Applied: <strong>LAUNCH50</strong></span>
              </div>
              <span>-$50.00</span>
            </div>
          </div>

          {/* Final Totals Breakdown */}
          <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${selectedBasePrice + bumpPrice}.00</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Estimated Tax (0%)</span>
              <span>$0.00</span>
            </div>
            <div className="flex items-center justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Due Today:</span>
              <span className="text-emerald-400">${finalCalculatedTotal}.00</span>
            </div>
          </div>
        </div>
      );

    case 'order_confirmation':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white  border border-emerald-500/40 shadow-2xl space-y-5 ${isSelected ? 'is-selected' : ''}`}>
          <div className="text-center space-y-2 pb-4 border-b border-slate-200">
            <div className="w-12 h-12 -full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Order Successfully Completed!</h3>
            <p className="text-xs text-slate-700">Here is a summary of your purchases.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-white  border border-slate-200">
              <div>
                <span className="font-bold text-slate-800">LaunchEngine Enterprise Pass</span>
                <div className="text-[10px] text-slate-500">Main Product</div>
              </div>
              <span className="font-bold text-slate-900">$297.00</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white  border border-slate-200">
              <div>
                <span className="font-bold text-slate-800">Instant AI VSL Copywriter Pro</span>
                <div className="text-[10px] text-slate-500">Order Bump Addon</div>
              </div>
              <span className="font-bold text-slate-900">$27.00</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-indigo-950/40  border border-indigo-500/30">
              <div>
                <span className="font-bold text-indigo-300">LaunchEngine Agency License Upgrade</span>
                <div className="text-[10px] text-indigo-400/70">1-Click Upsell Purchase</div>
              </div>
              <span className="font-bold text-slate-900">$497.00</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-sm font-black text-slate-900">
            <span>Total Paid:</span>
            <span className="text-emerald-400">$821.00</span>
          </div>

          <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold py-3.5  text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 mt-4 transition-transform hover:scale-[1.02]">
            <span>ACCESS YOUR PURCHASES NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      );

        case 'two_step_checkout':
      const titleStyle: React.CSSProperties = {
        color: props.titleColor || undefined,
        fontFamily: props.titleFontFamily && props.titleFontFamily !== 'inherit' ? props.titleFontFamily : undefined,
        fontSize: props.titleFontSize || undefined,
      };
      const fieldStyle: React.CSSProperties = {
        backgroundColor: props.fieldBgColor || undefined,
        borderColor: props.fieldBorderColor || undefined,
        color: props.fieldTextColor || undefined,
        fontFamily: props.fieldFontFamily && props.fieldFontFamily !== 'inherit' ? props.fieldFontFamily : undefined,
        fontSize: props.fieldFontSize || undefined,
        textAlign: 'inherit' as any,
      };
      const btnStyle: React.CSSProperties = {
        backgroundColor: props.buttonColor || '#22c55e',
        color: props.buttonTextColor || '#ffffff',
        fontFamily: props.buttonFontFamily && props.buttonFontFamily !== 'inherit' ? props.buttonFontFamily : undefined,
        fontSize: props.buttonFontSize || '16px',
        fontWeight: props.buttonFontWeight || '700',
        borderRadius: props.buttonBorderRadius || '12px',
        borderWidth: props.buttonBorderWidth || '0px',
        borderColor: props.buttonBorderColor || 'transparent',
        borderStyle: props.buttonBorderWidth && props.buttonBorderWidth !== '0px' && props.buttonBorderWidth !== '0' ? 'solid' : 'none'
      };
      const formWrapperStyle: React.CSSProperties = {
        ...containerStyle,
        backgroundColor: props.formBgColor || containerStyle.backgroundColor || undefined,
        borderColor: props.formBorderColor || undefined,
        borderRadius: props.formBorderRadius || undefined,
        padding: props.formPadding || undefined,
        borderWidth: props.formBorderColor && props.formBorderColor !== 'transparent' ? '1px' : undefined,
        borderStyle: props.formBorderColor && props.formBorderColor !== 'transparent' ? 'solid' : undefined
      };

      return (
        <div style={formWrapperStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} space-y-4 ${isSelected ? 'is-selected' : ''}`}>
          {/* Step tabs */}
          <div className="flex border-b border-slate-200" style={{ borderColor: props.fieldBorderColor || undefined }}>
            <button 
              onClick={() => setStep(1)} 
              className={`flex-1 py-3 font-bold text-center border-b-2 transition-colors ${step === 1 ? 'border-indigo-500 bg-slate-50/40' : 'border-transparent opacity-60'}`}
              style={{ ...titleStyle, borderBottomColor: step === 1 ? (props.buttonColor || '#6366f1') : 'transparent' }}
            >
              1. Contact Info
            </button>
            <button 
              onClick={() => setStep(2)} 
              className={`flex-1 py-3 font-bold text-center border-b-2 transition-colors ${step === 2 ? 'border-indigo-500 bg-slate-50/40' : 'border-transparent opacity-60'}`}
              style={{ ...titleStyle, borderBottomColor: step === 2 ? (props.buttonColor || '#6366f1') : 'transparent' }}
            >
              2. Payment & Complete
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1" style={titleStyle}>Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-white border border-slate-200 px-3 py-2 text-slate-800 rounded" style={fieldStyle} />
              </div>
              <div>
                <label className="block font-semibold mb-1" style={titleStyle}>Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-white border border-slate-200 px-3 py-2 text-slate-800 rounded" style={fieldStyle} />
              </div>
              <button 
                onClick={() => setStep(2)} 
                className="w-full transition-all shadow-lg flex items-center justify-center gap-2 mt-4 py-3"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = (btnStyle.backgroundColor as string) || '#22c55e'}
              >
                <span>Go To Step 2 (Payment)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Product summary */}
              <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded" style={fieldStyle}>
                <span className="font-semibold" style={titleStyle}>{props.productName || 'LaunchEngine Enterprise Pass'}</span>
                <span className="font-bold text-emerald-400" style={titleStyle}>{props.price || '$297.00'}</span>
              </div>

              {/* Order Bump Box */}
              <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${isCheckedBump ? 'border-emerald-500 bg-emerald-950/20' : 'border-dashed border-slate-300 bg-white/50 hover:border-slate-500'}`} onClick={() => setIsCheckedBump(!isCheckedBump)}>
                <div className="flex gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${isCheckedBump ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 bg-white'}`}>
                    {isCheckedBump && <Check className="w-3.5 h-3.5 text-slate-900" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span className="text-xs font-extrabold text-amber-400">Yes, add the VIP Coaching Call (+$97)</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-tight">
                      Check this box to get a 1-on-1 implementation call with our experts. Normally $297.
                    </p>
                  </div>
                </div>
              </div>

              {/* Credit Card Mock */}
              <div className="space-y-2 pt-2">
                <label className="block font-semibold mb-1" style={titleStyle}>Credit Card Number</label>
                <div className="relative">
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-slate-200 px-3 py-2.5 pl-10 text-slate-800 rounded" style={fieldStyle} />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="MM/YY" className="w-full bg-white border border-slate-200 px-3 py-2 text-center text-slate-800 rounded" style={fieldStyle} />
                  <input type="text" placeholder="CVC" className="w-full bg-white border border-slate-200 px-3 py-2 text-center text-slate-800 rounded" style={fieldStyle} />
                </div>
              </div>

              <button 
                className="w-full transition-all shadow-xl flex items-center justify-center gap-2 mt-4 py-3.5"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = (btnStyle.backgroundColor as string) || '#22c55e'}
              >
                <span>{props.buttonText || 'COMPLETE ORDER NOW'}</span>
                <ShieldCheck className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      );

    case 'order_bump':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="border-2 border-dashed border-red-500 bg-red-50/10 p-4 rounded-lg flex gap-4 items-start cursor-pointer transition-colors hover:bg-red-500/10">
            <input type="checkbox" className="mt-1 w-5 h-5 accent-red-600" />
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-400">?? Yes, I want the {props.bumpName || 'VIP Bonus'}!</span>
                <span className="text-slate-900 font-bold ml-auto">{props.bumpPrice || '+$27.00'}</span>
              </div>
              <p className="text-sm text-slate-700 mt-1">{props.bumpDescription || 'Add this exclusive bonus to your order right now and get instant access.'}</p>
            </div>
          </div>
        </div>
      );
    case 'one_click_upsell':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-gradient-to-br from-indigo-950/80 to-slate-900  border border-indigo-500/40 text-center space-y-4 ${isSelected ? 'is-selected' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-extrabold px-3 py-1 -full border border-amber-500/30">
            ⚠️ WAIT! YOUR ORDER IS NOT QUITE COMPLETE YET
          </div>
          <h3 className="text-2xl font-black text-slate-900">Upgrade to LaunchEngine Agency Master License (1-Click Addition)</h3>
          <p className="text-sm text-slate-700 max-w-lg mx-auto">Add client white-labeling, unlimited subdomains, and 10 team seats for just one single payment of $197 (Regularly $997).</p>
          <div className="pt-2 space-y-2">
            <button 
              onClick={() => alert('1-Click Upsell Added to Order via Stripe Vault Token!')} 
              className="w-full max-w-md mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black py-4 px-6  shadow-xl shadow-emerald-500/30 text-base flex items-center justify-center gap-2"
            >
              <span>YES! Add to My Order with 1-Click ($197)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="text-xs text-slate-600 hover:underline block mx-auto">No thanks, I will pass on this one-time offer</button>
          </div>
        </div>
      );

    case 'member_user_login':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-6 bg-white  border border-slate-200 shadow-2xl space-y-5' : 'shadow-2xl space-y-5'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
              <User className="w-4 h-4" />
              <span>Member Access Authentication Gate</span>
            </div>
            <div className="flex bg-white p-1  border border-slate-200 text-[10px] font-bold">
              <button 
                onClick={() => setMemberTab('login')} 
                className={`px-2.5 py-1  transition-colors ${memberTab === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
              >
                Log In
              </button>
              <button 
                onClick={() => setMemberTab('register')} 
                className={`px-2.5 py-1  transition-colors ${memberTab === 'register' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
              >
                Register
              </button>
              <button 
                onClick={() => setMemberTab('forgot')} 
                className={`px-2.5 py-1  transition-colors ${memberTab === 'forgot' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
              >
                Reset Password
              </button>
            </div>
          </div>

          {memberTab === 'login' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Member Email</label>
                <input type="email" placeholder="student@academy.com" className="w-full bg-white border border-slate-200  px-3.5 py-2.5 text-xs text-slate-900" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200  px-3.5 py-2.5 text-xs text-slate-900" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" className=" bg-white border-slate-200 text-indigo-500" />
                  <span>Remember me</span>
                </label>
                <button onClick={() => setMemberTab('forgot')} className="text-indigo-400 hover:underline">Forgot password?</button>
              </div>
              <button onClick={() => alert('Logged into Member Area!')} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3  text-xs shadow-lg shadow-indigo-600/30">
                Log In to Student Portal
              </button>
            </div>
          )}

          {memberTab === 'register' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input type="text" placeholder="Sarah Jenkins" className="w-full bg-white border border-slate-200  px-3.5 py-2 text-xs text-slate-900" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Email</label>
                <input type="email" placeholder="sarah@growthlabs.io" className="w-full bg-white border border-slate-200  px-3.5 py-2 text-xs text-slate-900" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200  px-3.5 py-2 text-xs text-slate-900" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <button onClick={() => alert('Student account registered!')} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3  text-xs shadow-lg shadow-emerald-600/30">
                Create Student Account & Access Portal
              </button>
            </div>
          )}

          {memberTab === 'forgot' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">Enter your registered email address and we will send you a password reset link.</p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Email</label>
                <input type="email" placeholder="student@academy.com" className="w-full bg-white border border-slate-200  px-3.5 py-2.5 text-xs text-slate-900" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <button onClick={() => alert('Password reset link sent to your inbox!')} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3  text-xs shadow-lg shadow-indigo-600/30">
                Send Reset Password Link
              </button>
            </div>
          )}
        </div>
      );

    case 'membership_search':
      const safeSearchModules = (initialCourseData?.modules && Array.isArray(initialCourseData.modules)) ? initialCourseData.modules : [];
      const allCourseLessons = safeSearchModules.flatMap(m => (m?.lessons && Array.isArray(m.lessons)) ? m.lessons.map(l => ({ ...l, moduleTitle: m.title || 'Module' })) : []);
      const filteredSearchLessons = allCourseLessons.filter(l => (l?.title || '').toLowerCase().includes(memberSearchQuery.toLowerCase()) || (l?.moduleTitle || '').toLowerCase().includes(memberSearchQuery.toLowerCase()));

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-5 bg-white  border border-slate-200 space-y-4' : 'space-y-4'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Search className="w-4 h-4 text-indigo-400" />
              <span>Member's Area Content Search</span>
            </div>
            <span className="text-[10px] text-slate-600">Search 12+ Video Masterclasses</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
            <input 
              type="text" 
              placeholder="Search course lessons (e.g., Opt-in, Upsell, Automation)..."
              value={memberSearchQuery}
              onChange={(e) => setMemberSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200  pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {memberSearchQuery && (
            <div className="bg-white border border-slate-200  p-3 max-h-48 overflow-y-auto space-y-2 animate-fade-in">
              {filteredSearchLessons.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-2 text-center">No lessons match your query.</div>
              ) : (
                filteredSearchLessons.map((l) => (
                  <div key={l.id} className="p-2.5 bg-white  flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{l.title}</div>
                      <div className="text-[10px] text-slate-500">{l.moduleTitle} ({l.duration || '10m'})</div>
                    </div>
                    <button onClick={() => alert(`Resuming lesson: ${l.title}`)} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white  text-[11px] font-bold">
                      Resume
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      );

    case 'membership_navigation':
      const safeNavModules = (initialCourseData?.modules && Array.isArray(initialCourseData.modules)) ? initialCourseData.modules : [];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white  border border-slate-200 space-y-3' : 'space-y-3'} ${isSelected ? 'is-selected' : ''}`}>
          {/* Header & Mobile Toggle */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Membership Area Navigation</span>
            </div>
            <button 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-1.5 bg-slate-50  text-slate-700"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Module & Lesson Accordion Tree */}
          <div className={`space-y-2 ${mobileNavOpen ? 'block' : 'block md:block'}`}>
            {safeNavModules.map((mod, mIdx) => (
              <div key={mod.id} className="bg-white border border-slate-200  overflow-hidden">
                <button 
                  onClick={() => setOpenNavModule(openNavModule === mIdx ? null : mIdx)}
                  className="w-full p-3 flex items-center justify-between font-bold text-xs text-slate-800 hover:bg-slate-50"
                >
                  <span className="truncate max-w-[200px]">{mod.title}</span>
                  {openNavModule === mIdx ? <ChevronDown className="w-4 h-4 text-indigo-400" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                </button>

                {openNavModule === mIdx && (
                  <div className="p-2 bg-white/60 border-t border-slate-200/80 space-y-1">
                    {(mod?.lessons && Array.isArray(mod.lessons)) && mod.lessons.map((les) => (
                      <div key={les.id} className="p-2  bg-white hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2 truncate">
                          <Video className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">{les.title}</span>
                        </div>
                        {les.isCompleted ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : les.dripDays ? (
                          <span className="text-[9px] text-amber-400 font-mono bg-amber-950/60 px-1 py-0.5 ">Day {les.dripDays}</span>
                        ) : (
                          <Play className="w-3 h-3 text-slate-500 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    // Category 5: Membership & Affiliate Portal Elements (BountyPack Integrated)
    case 'affiliate_image_asset':
      const activeBanners = bountypackPromo.filter((p: any) => p.type === 'banner');
      const activeBanner = activeBanners[0] || {
        imageUrl: props.imageUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80',
        dimensions: '728x90',
        title: 'Leaderboard Header Banner'
      };
      const dynamicEmbedHtml = `<a href="${bountypackSettings.affiliateDomainUrl}?ref=${activePartner.affiliateCode}" target="_blank"><img src="${activeBanner.imageUrl}" alt="${activeBanner.title}" /></a>`;

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-5 bg-white border border-slate-200 space-y-3 rounded-2xl' : 'space-y-3'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>BountyPack Promo Banner Asset</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-950/60 px-2 py-0.5 border border-amber-800 rounded">
              Partner: {activePartner.affiliateCode} ({activeBanner.dimensions})
            </span>
          </div>

          <div className="overflow-hidden border border-slate-200 bg-white p-2 rounded-xl">
            <img 
              src={activeBanner.imageUrl} 
              alt="Affiliate Banner" 
              className="w-full h-28 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-700">HTML Embed Code (Auto-linked to BountyPack):</label>
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between font-mono text-[11px] text-emerald-400">
              <div className="truncate max-w-[280px]">{dynamicEmbedHtml}</div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(dynamicEmbedHtml);
                  setCopiedImageAssetHtml(true);
                  setTimeout(() => setCopiedImageAssetHtml(false), 2000);
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans text-xs font-extrabold rounded-lg shrink-0 flex items-center gap-1 shadow-md shadow-amber-500/20"
              >
                {copiedImageAssetHtml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedImageAssetHtml ? 'Copied HTML!' : 'Copy HTML'}</span>
              </button>
            </div>
          </div>
        </div>
      );

    case 'affiliate_text_asset':
      const liveSwipes = bountypackPromo.filter((p: any) => p.type === 'email' || p.type === 'social');
      const activeSwipe = liveSwipes[activeSwipeTab] || liveSwipes[0] || {
        title: 'High Converting VSL Swipe',
        subjectLine: 'How to scale your funnel fast...',
        content: `Check out our offer here: {AFFILIATE_LINK}`
      };
      const formattedSwipeBody = activeSwipe.content
        .replace(/\{AFFILIATE_LINK\}/g, `${bountypackSettings.affiliateDomainUrl}?ref=${activePartner.affiliateCode}`)
        .replace(/\{FIRST_NAME\}/g, '[First Name]')
        .replace(/\{AFFILIATE_NAME\}/g, activePartner.name);

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-5 bg-white border border-slate-200 space-y-4 rounded-2xl' : 'space-y-4'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Mail className="w-4 h-4 text-pink-400" />
              <span>BountyPack Email Swipe Asset</span>
            </div>
            <div className="flex bg-white p-1 border border-slate-200 text-[10px] font-bold rounded-lg">
              {liveSwipes.map((s: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveSwipeTab(idx)}
                  className={`px-2.5 py-1 rounded transition-colors ${activeSwipeTab === idx ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
                >
                  Swipe #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs font-sans text-slate-800">
            {activeSwipe.subjectLine && (
              <div className="font-bold text-amber-300 font-mono">{activeSwipe.subjectLine}</div>
            )}
            <pre className="font-sans text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">{formattedSwipeBody}</pre>
          </div>

          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${activeSwipe.subjectLine ? activeSwipe.subjectLine + '\n\n' : ''}${formattedSwipeBody}`);
              setCopiedTextSwipe(true);
              setTimeout(() => setCopiedTextSwipe(false), 2000);
            }}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            {copiedTextSwipe ? <Check className="w-4 h-4 text-slate-900" /> : <Copy className="w-4 h-4" />}
            <span>{copiedTextSwipe ? 'Email Swipe Copied to Clipboard!' : 'Copy Auto-Linked Email Swipe'}</span>
          </button>
        </div>
      );

    case 'affiliate_link_builder':
      const liveTrackedLink = `${bountypackSettings.affiliateDomainUrl}${builderRouteChoice}?ref=${activePartner.affiliateCode}${subIdInput ? `&subid=${encodeURIComponent(subIdInput)}` : ''}`;

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-indigo-500/40 shadow-2xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>BountyPack Multi-Link & Sub-ID Generator</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 border border-emerald-800 rounded">
              Sticky Cookies: {bountypackPlans[0]?.stickyCookieDays || 60} Days
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Funnel Offer Page:</label>
              <select 
                value={builderRouteChoice}
                onChange={(e) => setBuilderRouteChoice(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium"
              >
                <option value="partner">Main Partner Offer Page (40% Comm)</option>
                <option value="vsl-launch">VSL Sales Page (40% Comm)</option>
                <option value="webinar-register">Automated Masterclass Room (40% Comm)</option>
                <option value="checkout">Direct Checkout Order Gate (40% Comm)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Custom Sub-ID Tracking Tag (UTM / Ad Campaign):</label>
              <input 
                type="text" 
                placeholder="e.g. facebook_ad_vsl_1"
                value={subIdInput}
                onChange={(e) => setSubIdInput(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="font-mono text-xs text-amber-300 truncate max-w-[280px]">
              {liveTrackedLink}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(liveTrackedLink);
                setCopiedBuilderLink(true);
                setTimeout(() => setCopiedBuilderLink(false), 2000);
              }}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shrink-0 shadow-lg shadow-indigo-600/30"
            >
              {copiedBuilderLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBuilderLink ? 'Copied Tracked Link!' : 'Copy Tracked Link'}</span>
            </button>
          </div>
        </div>
      );

    case 'affiliate_login':
      const handleRegisterBountyPackPartner = () => {
        if (!regName.trim() || !regEmail.trim()) {
          alert('Please enter your full name and email to register.');
          return;
        }
        const generatedCode = regName.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 8) || `AFF${Math.floor(1000 + Math.random() * 9000)}`;
        const newPartner = {
          id: `aff_${Date.now()}`,
          affiliateCode: generatedCode,
          name: regName,
          email: regEmail,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          status: (bountypackSettings.autoApproveAffiliates ? 'Approved' : 'Pending') as any,
          planId: bountypackPlans[0]?.id || 'plan_std_40',
          payoutMethod: 'PayPal' as any,
          payoutEmail: regPayoutEmail || regEmail,
          joinedDate: new Date().toISOString().split('T')[0],
          totalClicks: 0,
          totalLeads: 0,
          totalSalesCount: 0,
          grossRevenue: 0,
          commissionEarned: 0,
          commissionPaid: 0,
          pendingHoldback: 0
        };
        const updated = [newPartner, ...bountypackAffiliates];
        setBountypackAffiliates(updated);
        saveStoredAffiliates(updated);
        setSelectedPartnerId(newPartner.id);
        setRegSuccessMsg(`🎉 Partner registered! Your BountyPack ref code is: ${generatedCode}`);
      };

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-indigo-500/40 shadow-2xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-extrabold">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>BountyPack Partner Portal Login & Registration</span>
            </div>
            <div className="flex bg-white p-1 border border-slate-200 text-[10px] font-bold rounded-lg">
              <button 
                onClick={() => setAffiliateTab('login')} 
                className={`px-2.5 py-1 rounded transition-colors ${affiliateTab === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
              >
                Log In
              </button>
              <button 
                onClick={() => setAffiliateTab('register')} 
                className={`px-2.5 py-1 rounded transition-colors ${affiliateTab === 'register' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
              >
                Register
              </button>
            </div>
          </div>

          {regSuccessMsg && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center justify-between">
              <span>{regSuccessMsg}</span>
              <button onClick={() => setRegSuccessMsg(null)} className="text-emerald-400 hover:text-slate-900"><X className="w-4 h-4" /></button>
            </div>
          )}

          {affiliateTab === 'login' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Affiliate Partner Email</label>
                <input type="email" placeholder="alex@acquisition.demo" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900" />
              </div>
              <button onClick={() => alert('Authenticated into BountyPack Partner Portal!')} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3 text-xs rounded-xl shadow-lg shadow-indigo-600/30">
                Log In to BountyPack Dashboard
              </button>
            </div>
          )}

          {affiliateTab === 'register' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alex Hormozi" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Partner Email</label>
                <input 
                  type="email" 
                  placeholder="alex@acquisition.demo" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payout PayPal / Wise Email</label>
                <input 
                  type="email" 
                  placeholder="payouts@acquisition.demo" 
                  value={regPayoutEmail}
                  onChange={(e) => setRegPayoutEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900" 
                />
              </div>
              <button 
                onClick={handleRegisterBountyPackPartner} 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold py-3 text-xs rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Register Official BountyPack Partner Account
              </button>
            </div>
          )}
        </div>
      );

    case 'affiliate_link':
      const activeAffiliateUrl = `${bountypackSettings.affiliateDomainUrl}?ref=${activePartner.affiliateCode}`;

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-5 bg-white border border-slate-200 space-y-4 rounded-2xl' : 'space-y-4'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Link2 className="w-4 h-4 text-indigo-400" />
              <span>BountyPack Referral Link Generator</span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono bg-amber-950/60 px-2 py-0.5 border border-amber-800 rounded font-bold">
              CODE: {activePartner.affiliateCode}
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Select Active BountyPack Partner:</label>
            <select 
              value={selectedPartnerId}
              onChange={(e) => setSelectedPartnerId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
            >
              {bountypackAffiliates.map((a: any) => (
                <option key={a.id} value={a.id}>{a.name} ({a.affiliateCode})</option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="font-mono text-xs text-indigo-300 truncate max-w-[280px]">
              {activeAffiliateUrl}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(activeAffiliateUrl);
                setCopiedAffLink(true);
                setTimeout(() => setCopiedAffLink(false), 2000);
              }}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 shrink-0 shadow-lg shadow-indigo-600/30"
            >
              {copiedAffLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAffLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      );

    case 'affiliate_stats':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-6 bg-white border border-slate-200 space-y-4 rounded-2xl' : 'space-y-4'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>BountyPack Live Performance Stats</span>
            </div>

            <select 
              value={selectedPartnerId}
              onChange={(e) => setSelectedPartnerId(e.target.value)}
              className="bg-white border border-slate-200 text-amber-300 text-xs rounded-lg px-2.5 py-1 font-bold focus:outline-none"
            >
              {bountypackAffiliates.map((a: any) => (
                <option key={a.id} value={a.id}>{a.name} Stats</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] uppercase text-slate-600 font-semibold">CLICKS</div>
              <div className="text-xl font-black text-slate-900 mt-1">{activePartner.totalClicks.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] uppercase text-slate-600 font-semibold">SALES</div>
              <div className="text-xl font-black text-emerald-400 mt-1">{activePartner.totalSalesCount}</div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] uppercase text-slate-600 font-semibold">GROSS REVENUE</div>
              <div className="text-xl font-black text-indigo-400 mt-1">${activePartner.grossRevenue.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-white border border-indigo-500/40 bg-indigo-950/20 rounded-xl">
              <div className="text-[10px] uppercase text-indigo-300 font-semibold">EARNED COMMISSIONS</div>
              <div className="text-xl font-black text-emerald-400 mt-1">${activePartner.commissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>
      );

    case 'visual_funnel':
      const defaultPlan = bountypackPlans.find((p: any) => p.isDefault) || bountypackPlans[0];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-indigo-500/40 shadow-2xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <PieChart className="w-4 h-4 text-indigo-400" />
              <span>BountyPack 2-Tier Commission Structure</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {defaultPlan?.tier1Rate}% Tier 1 + {defaultPlan?.tier2Rate}% Tier 2 Kickback
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 relative">
              <div className="text-[10px] font-extrabold text-indigo-400 uppercase">TIER 1 DIRECT SALES</div>
              <div className="text-sm font-bold text-slate-900">$2,997 Launch System</div>
              <div className="text-xs font-black text-emerald-400">Direct Comm: ${(2997 * ((defaultPlan?.tier1Rate || 40) / 100)).toFixed(2)} ({defaultPlan?.tier1Rate}%)</div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 relative">
              <div className="text-[10px] font-extrabold text-purple-400 uppercase">TIER 2 SUB-AFFILIATE</div>
              <div className="text-sm font-bold text-slate-900">Sub-Partner Direct Sales</div>
              <div className="text-xs font-black text-purple-300">Passive Comm: ${(2997 * ((defaultPlan?.tier2Rate || 10) / 100)).toFixed(2)} ({defaultPlan?.tier2Rate}%)</div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 relative">
              <div className="text-[10px] font-extrabold text-amber-400 uppercase">STICKY COOKIES</div>
              <div className="text-sm font-bold text-slate-900">Lifetime Upgrades</div>
              <div className="text-xs font-black text-amber-300">{defaultPlan?.stickyCookieDays || 60} Days Cookie Duration</div>
            </div>
          </div>

          <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-xl flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-200">BountyPack Active Commission Plan:</span>
            <span className="font-black text-amber-400 text-sm font-mono">{defaultPlan?.name || 'Standard 40% + 10% Plan'}</span>
          </div>
        </div>
      );

    case 'video_lesson_player':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'bg-white  border border-slate-200 p-4 space-y-3' : 'p-4 space-y-3'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800">Lesson 1.1: The 2-Step Opt-in & VSL Framework</h4>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1  border border-emerald-800">Module 1</span>
          </div>
          <div className="aspect-video bg-white  overflow-hidden relative flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" alt="Lesson" className="w-full h-full object-cover opacity-50" />
            <button className="w-14 h-14 bg-indigo-600 text-white -full flex items-center justify-center shadow-lg shadow-indigo-600/50 absolute">
              <Play className="w-6 h-6 fill-current ml-1" />
            </button>
          </div>
          <div className="flex items-center justify-between pt-2">
            <button 
              onClick={() => setIsCompletedLesson(!isCompletedLesson)} 
              className={`flex items-center gap-2 px-4 py-2  text-xs font-bold transition-colors ${isCompletedLesson ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
            >
              <Check className="w-4 h-4" />
              <span>{isCompletedLesson ? 'Lesson Completed ✓' : 'Mark as Complete'}</span>
            </button>
            <span className="text-xs text-slate-600">Duration: 14 mins</span>
          </div>
        </div>
      );

    case 'drip_timer_banner':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-4 bg-indigo-950/60 border border-indigo-500/40  flex items-center gap-3 ${isSelected ? 'is-selected' : ''}`}>
          <Clock className="w-6 h-6 text-indigo-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-indigo-200">Drip Schedule Lock: </span>
            <span className="text-slate-700">Module 2 unlocks automatically in <strong className="text-slate-900">3 Days</strong> post-enrollment.</span>
          </div>
        </div>
      );

    // Category 6: Interactive & Conversion Widgets
    case 'facebook_comments':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white  border border-slate-200' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-slate-800">Facebook Comments Plugin</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4  text-slate-900">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-slate-300 -sm"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 w-32 mb-2"></div>
                <div className="h-10 bg-white border border-slate-300 w-full mb-2"></div>
                <div className="flex justify-end">
                  <div className="h-6 bg-blue-600 w-16 -sm"></div>
                </div>
              </div>
            </div>
            <div className="text-xs text-center text-slate-500 mt-4 border-t pt-2">
              (Live plugin will render here when published)
            </div>
          </div>
        </div>
      );

    case 'social_share':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white  border border-slate-200' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex justify-center gap-4">
            {props.facebookUrl && (
              <a href={props.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:opacity-80 transition-opacity">
                <Facebook className="w-8 h-8" />
              </a>
            )}
            {props.twitterUrl && (
              <a href={props.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:opacity-80 transition-opacity">
                <Twitter className="w-8 h-8" />
              </a>
            )}
            {props.instagramUrl && (
              <a href={props.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:opacity-80 transition-opacity">
                <Instagram className="w-8 h-8" />
              </a>
            )}
            {props.linkedinUrl && (
              <a href={props.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:opacity-80 transition-opacity">
                <Linkedin className="w-8 h-8" />
              </a>
            )}
            {(!props.facebookUrl && !props.twitterUrl && !props.instagramUrl && !props.linkedinUrl) && (
              <div className="text-slate-600 text-sm flex gap-4">
                <Facebook className="w-8 h-8 opacity-50" />
                <Twitter className="w-8 h-8 opacity-50" />
                <Instagram className="w-8 h-8 opacity-50" />
                <Linkedin className="w-8 h-8 opacity-50" />
              </div>
            )}
          </div>
        </div>
      );

    case 'pricing_table':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${isSelected ? 'is-selected' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {[
              { name: 'Basic', price: '$29', features: ['1 User', '10GB Storage', 'Basic Support'], color: 'slate' },
              { name: 'Pro', price: '$97', features: ['5 Users', '50GB Storage', 'Priority Support', 'Advanced Analytics'], color: 'indigo', popular: true },
              { name: 'Enterprise', price: '$297', features: ['Unlimited Users', '500GB Storage', '24/7 Dedicated Support', 'Custom Integrations'], color: 'slate' }
            ].map((plan, idx) => (
              <div key={idx} className={`relative flex flex-col p-6  border ${plan.popular ? 'bg-indigo-950/40 border-indigo-500 shadow-2xl shadow-indigo-500/20 transform md:-translate-y-4' : 'bg-white border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 -full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-lg font-bold mb-2 ${plan.popular ? 'text-indigo-300' : 'text-slate-700'}`}>{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-sm text-slate-500 font-medium">/mo</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className={`w-4 h-4 ${plan.popular ? 'text-indigo-400' : 'text-slate-500'}`} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3  font-bold transition-all ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'}`}>
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'evergreen_timer':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white  border border-slate-200 text-center' : 'text-center'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">{props.label || 'Special Offer Expires In:'}</div>
          <div className="flex items-center justify-center gap-3">
            <div className="bg-white border border-slate-200 px-3 py-2  min-w-[54px]">
              <div className="text-xl font-black text-indigo-400">{props.hours || '14'}</div>
              <div className="text-[10px] text-slate-500 uppercase">Hours</div>
            </div>
            <span className="text-xl font-bold text-slate-600">:</span>
            <div className="bg-white border border-slate-200 px-3 py-2  min-w-[54px]">
              <div className="text-xl font-black text-indigo-400">{props.minutes || '42'}</div>
              <div className="text-[10px] text-slate-500 uppercase">Mins</div>
            </div>
            <span className="text-xl font-bold text-slate-600">:</span>
            <div className="bg-white border border-slate-200 px-3 py-2  min-w-[54px]">
              <div className="text-xl font-black text-pink-400 animate-pulse">{props.seconds || '19'}</div>
              <div className="text-[10px] text-slate-500 uppercase">Secs</div>
            </div>
          </div>
        </div>
      );

    case 'faq_accordion':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} space-y-2 ${isSelected ? 'is-selected' : ''}`}>
          {(props.items || [
            { q: 'Is there a money-back guarantee?', a: 'Yes! We offer an unconditional 30-day money-back guarantee on all plans.' },
            { q: 'Can I connect custom domains and SSL?', a: 'Absolute! Every workspace supports unlimited custom subdomains and custom domains with automated free SSL.' },
            { q: 'How do 1-click upsells work?', a: 'We vault payment credentials via Stripe Billing Contracts during step 1 checkout, allowing instant 1-click upsell charges without secondary entry.' }
          ]).map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-slate-200  overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
                className="w-full p-4 flex items-center justify-between font-semibold text-sm text-slate-800 hover:bg-slate-50"
              >
                <span>{item.q}</span>
                {openFaq === idx ? <ChevronDown className="w-4 h-4 text-indigo-400" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case 'tabs':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} space-y-3 ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex border-b border-slate-200 gap-2">
            {['Overview', 'Curriculum', 'Testimonials'].map((tabName, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveTab(idx)} 
                className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors ${activeTab === idx ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-600 hover:text-slate-800'}`}
              >
                {tabName}
              </button>
            ))}
          </div>
          <div className="p-4 bg-white  border border-slate-200 text-xs text-slate-700">
            {activeTab === 0 && 'The complete all-in-one platform built for speed, high conversions, and seamless automation.'}
            {activeTab === 1 && 'Access 12 comprehensive video modules covering funnel architecture, copy, and traffic.'}
            {activeTab === 2 && 'Over 2,800+ creators and agencies rely on LaunchEngine daily.'}
          </div>
        </div>
      );

    case 'star_rating':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} flex flex-col items-center gap-1 ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-700">{props.label || 'Rated 4.9/5 Stars by 2,840+ creators'}</span>
        </div>
      );

    // Category 7: Universal

    case 'logo_image':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} flex items-center ${
          style?.typography?.textAlign === 'right' ? 'justify-end' :
          style?.typography?.textAlign === 'center' ? 'justify-center' :
          'justify-start'
        } ${isSelected ? 'is-selected' : ''}`}>
          <img 
            src={props.src || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&auto=format&fit=crop&q=80'} 
            alt={props.alt || 'Brand Logo'} 
            className="max-h-12 w-auto object-contain"
          />
        </div>
      );

    case 'icon': {
      const getIconSvg = (name: string, color: string, size: string) => {
        const n = name.toLowerCase();
        if (n === 'facebook') return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
        if (n === 'twitter') return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
        if (n === 'instagram') return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
        if (n === 'linkedin') return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
        if (n === 'youtube') return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
        if (n === 'pinterest') return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.602 0 12.017 0z"/></svg>;
        
        // Dynamically match any lucide-react icon by PascalCase name
        const pascalName = name.split(/[-_ ]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
        const LucideIcon = (LucideIcons as any)[pascalName];
        
        if (LucideIcon) {
          return <LucideIcon className="text-current" width={size} height={size} strokeWidth={1.5} />;
        }

        // Fallback for standard UI icons using lucide-react mapping if needed, 
        // but for simplicity we will just render a generic star if not recognized.
        return <Star className="text-current" width={size} height={size} strokeWidth={1.5} />;
      };

      const iconContent = getIconSvg(props.iconName || 'Facebook', props.color || '#1877F2', props.size || '32px');
      const innerContent = (
        <div className={`flex items-center justify-center`} style={{ color: props.color || '#1877F2' }}>
          {iconContent}
        </div>
      );

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} inline-flex items-center justify-center p-2 ${isSelected ? 'is-selected' : ''}`}>
          {props.url && isInteractiveMode ? (
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              {innerContent}
            </a>
          ) : (
            innerContent
          )}
        </div>
      );
    }
    // ChronoChimp Appointment & Scheduling Elements
    case 'appointment_calendar': {
      const activeEvt = chronoEvents.find(e => e.id === elemSelectedEvtId) || chronoEvents[0];
      const activeHost = chronoHosts[0] || { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' };

      const handleConfirmElemBooking = () => {
        if (!elemClientName.trim() || !elemClientEmail.trim()) {
          alert('Please enter your full name and email address.');
          return;
        }
        const newAppt = {
          id: `appt_${Date.now()}`,
          eventTypeId: activeEvt.id,
          eventTitle: activeEvt.title,
          hostId: activeHost.id,
          hostName: activeHost.name,
          hostAvatar: activeHost.avatar,
          customerName: elemClientName,
          customerEmail: elemClientEmail,
          customerPhone: elemClientPhone || '+1 (555) 019-2831',
          date: elemSelectedDate,
          timeSlot: elemSelectedSlot,
          locationType: activeEvt.locationType,
          meetingLink: 'https://zoom.us/j/9981248019',
          status: 'Upcoming' as any,
          answers: { q_goal: 'Booked via Funnel Page ChronoChimp Canvas Widget' },
          createdAt: new Date().toISOString(),
          isPaid: activeEvt.priceAmount > 0,
          amountPaid: activeEvt.priceAmount
        };

        const updated = [newAppt, ...chronoAppts];
        setChronoAppts(updated);
        saveChronoAppointments(updated);
        setElemConfirmedAppt(newAppt);
        setElemBookingDone(true);
      };

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 sm:p-8 bg-white border-2 border-emerald-500/40 shadow-2xl space-y-6 rounded-3xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{props.title || "Schedule Your 1-on-1 Strategy Call"}</h3>
                <p className="text-xs text-slate-600">ChronoChimp Automated Calendar & Appointment Engine</p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-3 py-1 border border-emerald-200 rounded-full">
              {activeEvt.durationMinutes} MINS CALL
            </span>
          </div>

          {!elemBookingDone ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {chronoEvents.map(evt => (
                  <button 
                    key={evt.id}
                    onClick={() => setElemSelectedEvtId(evt.id)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all ${elemSelectedEvtId === evt.id ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold' : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'}`}
                  >
                    <div className="font-bold">{evt.title}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{evt.durationMinutes} mins • {evt.priceAmount > 0 ? `$${evt.priceAmount}` : 'FREE'}</div>
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Select Date:</span>
                  <input 
                    type="date" 
                    value={elemSelectedDate}
                    onChange={(e) => setElemSelectedDate(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-slate-900 font-mono font-bold"
                  />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                  {['09:00', '10:30', '11:00', '13:30', '15:00', '16:30'].map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setElemSelectedSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${elemSelectedSlot === slot ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Jonathan Hayes"
                      value={elemClientName}
                      onChange={(e) => setElemClientName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="jhayes@techcorp.demo"
                      value={elemClientEmail}
                      onChange={(e) => setElemClientEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number (For SMS Alert)</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 492-1082"
                    value={elemClientPhone}
                    onChange={(e) => setElemClientPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono" 
                  />
                </div>
              </div>

              <button 
                onClick={handleConfirmElemBooking}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>CONFIRM APPOINTMENT & GENERATE ZOOM MEETING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-emerald-500/40 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900">Your Call is Confirmed!</h4>
              <p className="text-xs text-slate-700 max-w-md mx-auto">
                Scheduled for <strong className="text-emerald-800 font-mono">{elemConfirmedAppt?.date} at {elemConfirmedAppt?.timeSlot} (EST)</strong> with <strong className="text-teal-700">{elemConfirmedAppt?.hostName}</strong>.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 inline-block font-mono text-xs text-emerald-800 font-bold">
                Zoom HD Meeting Link: {elemConfirmedAppt?.meetingLink}
              </div>
              <div>
                <button 
                  onClick={() => setElemBookingDone(false)}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-300"
                >
                  Book Another Call
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    case 'appointment_host_card': {
      const activeHost = chronoHosts.find(h => h.id === selectedHostPickerId) || chronoHosts[0];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 shadow-xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-600">ASSIGNED STRATEGIST PROFILE</span>
            <select 
              value={selectedHostPickerId}
              onChange={(e) => setSelectedHostPickerId(e.target.value)}
              className="bg-white border border-slate-200 text-emerald-800 text-xs rounded-lg px-2 py-0.5 font-bold focus:outline-none"
            >
              {chronoHosts.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <img src={activeHost.avatar} alt={activeHost.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shrink-0" />
            <div>
              <h4 className="text-base font-bold text-slate-900">{activeHost.name}</h4>
              <p className="text-xs text-emerald-700 font-mono font-bold">{activeHost.role}</p>
              <div className="text-xs text-amber-600 font-bold mt-0.5">★ {activeHost.rating} / 5.0 Rating</div>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">{activeHost.bio}</p>

          <button 
            onClick={() => alert(`Selected host ${activeHost.name} for round-robin appointment!`)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-2 shadow"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book 1-on-1 Call with {activeHost.name.split(' ')[0]}</span>
          </button>
        </div>
      );
    }

    case 'appointment_summary_receipt': {
      const latestAppt = chronoAppts[0] || {
        customerName: 'Jonathan Hayes',
        eventTitle: '15-Minute Funnel Audit Discovery Call',
        date: '2026-08-14',
        timeSlot: '10:30',
        hostName: 'Marcus Vance',
        meetingLink: 'https://zoom.us/j/9981248019'
      };

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-emerald-500/40 shadow-2xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Appointment Booking Receipt</span>
            </div>
            <span className="text-[10px] text-emerald-800 font-mono bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded font-bold">
              CONFIRMED
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span>Client Name:</span>
              <span className="font-bold text-slate-900">{latestAppt.customerName}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Session Type:</span>
              <span className="font-bold text-emerald-800">{latestAppt.eventTitle}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Scheduled Date & Time:</span>
              <span className="font-bold text-amber-700 font-mono">{latestAppt.date} at {latestAppt.timeSlot} (EST)</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Meeting Host:</span>
              <span className="font-bold text-teal-800">{latestAppt.hostName}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[11px] text-slate-600 block mb-1">Zoom Meeting Link:</span>
            <a href={latestAppt.meetingLink} target="_blank" rel="noreferrer" className="text-xs font-mono font-bold text-emerald-700 hover:underline">
              {latestAppt.meetingLink}
            </a>
          </div>

          <button 
            onClick={() => alert('iCal Calendar (.ics) file generated and downloaded!')}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Add Event to Google / iCal Calendar</span>
          </button>
        </div>
      );
    }

    case 'team_schedule_picker': {
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-indigo-500/40 shadow-2xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <Workflow className="w-4 h-4 text-purple-400" />
              <span>Team Round-Robin Schedule Selector</span>
            </div>
            <span className="text-[10px] text-purple-300 font-mono bg-purple-950/60 px-2 py-0.5 border border-purple-800 rounded">
              Round-Robin Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {chronoHosts.map(host => (
              <div key={host.id} className="p-4 bg-white rounded-xl border border-slate-200 text-center space-y-2 hover:border-purple-500/50 transition-all">
                <img src={host.avatar} alt={host.name} className="w-12 h-12 rounded-full object-cover mx-auto border-2 border-indigo-500" />
                <div>
                  <div className="font-bold text-xs text-slate-900">{host.name}</div>
                  <div className="text-[10px] text-slate-600">{host.role}</div>
                </div>
                <button 
                  onClick={() => alert(`Selected ${host.name} for 1-on-1 strategy call!`)}
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold"
                >
                  Select Host
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ==========================================
    // MEMBERSHIP & COURSE ENGINE ELEMENTS
    // ==========================================

    case 'course_curriculum_widget': {
      const activeCourse = loadStoredCourse();
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 shadow-xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">{props.title || activeCourse.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium">Academy Curriculum Syllabus ({activeCourse.modules.length} Modules)</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
              LMS SYLLABUS
            </span>
          </div>

          <div className="space-y-3">
            {activeCourse.modules.map((mod, mIdx) => (
              <div key={mod.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{mod.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{mod.lessons.length} Lessons</span>
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-emerald-500/40">
                  {mod.lessons.map((les) => (
                    <div key={les.id} className="flex items-center justify-between text-[11px] py-1 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                        <span>{les.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{les.duration || '15 mins'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'lesson_video_player': {
      const activeCourse = loadStoredCourse();
      const firstLesson = activeCourse.modules[0]?.lessons[0] || { title: 'Welcome Masterclass', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' };

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 shadow-xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900">{props.title || firstLesson.title}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              HD VIDEO LESSON
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center group">
            <video 
              src={props.videoUrl || firstLesson.videoUrl} 
              controls={isInteractiveMode}
              className="w-full h-full object-cover"
            />
            {!isInteractiveMode && (
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl shadow-emerald-950/50">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'certificate_badge_widget': {
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 border-2 border-amber-500/80 ring-4 ring-amber-500/20 rounded-3xl text-center space-y-4 shadow-2xl text-white ${isSelected ? 'is-selected' : ''}`}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-amber-500/40">
            👑
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-widest">OFFICIAL ACCREDITATION</div>
            <h4 className="text-base font-black text-white font-serif">{props.title || "Royal Diploma of Distinction"}</h4>
          </div>
          <p className="text-xs text-amber-100/80 max-w-sm mx-auto">
            {props.subtitle || "Awarded upon 100% curriculum completion with verified certificate serial number."}
          </p>
          <div className="pt-2 border-t border-amber-500/30 text-[10px] font-mono text-amber-400 font-bold">
            VERIFICATION ID: CERT-2026-X948
          </div>
        </div>
      );
    }

    case 'drip_schedule_widget': {
      const activeCourse = loadStoredCourse();
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 shadow-xl space-y-4 rounded-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-slate-900">Automated Content Drip Schedule</span>
            </div>
            <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-bold">
              PROGRESSION ENGINE
            </span>
          </div>

          <div className="space-y-2.5">
            {activeCourse.modules.map((mod, idx) => (
              <div key={mod.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-slate-800">{mod.title}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {idx === 0 ? 'Instant Day 0' : `Drip Day ${idx * 7}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ==========================================
    // 30 WIDGET ELEMENTS SECTION
    // ==========================================

    case 'hero_banner_widget': {
      const navLinks = props.menuItems || [
        { id: 'm1', label: 'Home', linkUrl: '#' },
        { id: 'm2', label: 'About', linkUrl: '#' },
        { id: 'm3', label: 'Contact', linkUrl: '#' }
      ];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} w-full shadow-2xl flex flex-col ${isSelected ? 'is-selected' : ''}`}>
          
          {/* TOP NAVIGATION BAR */}
          <nav className="px-6 py-4 border-b border-indigo-500/20 backdrop-blur-md flex items-center justify-between relative z-20 w-full">
            {/* Brand Logo */}
            <div className="flex items-center gap-2 shrink-0">
              {!props.hideBrandImage && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                  🚀
                </div>
              )}
              <span className="font-black text-lg text-slate-900 tracking-tight font-sans">{props.brandLogoText || 'Brand'}</span>
            </div>

            {/* Desktop Menu Navigation Items */}
            <div className={`hidden md:flex items-center gap-6 flex-1 ${
              style?.typography?.textAlign === 'left' ? 'justify-start pl-12' :
              style?.typography?.textAlign === 'right' ? 'justify-end pr-8' :
              'justify-center'
            }`}>
              {navLinks.map((item: any) => (
                <div key={item.id} className="relative group/menu py-2">
                  <a 
                    href={item.linkUrl || '#'} 
                    className="text-xs font-bold text-slate-700 hover:text-indigo-400 transition-colors flex items-center gap-1"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </nav>

          {/* BANNER CONTENT */}
          <div className="p-8 sm:p-12 text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{props.badgeText || "🚀 #1 AUTOMATED FUNNEL ENGINE"}</span>
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-black leading-tight tracking-tight max-w-2xl mx-auto"
              style={{ color: style.typography?.color || '#ffffff' }}
            >
              {props.title || "Scale Your Sales Funnels Exponentially With Automated Precision"}
            </h2>
            <p 
              className="text-sm max-w-xl mx-auto leading-relaxed"
              style={{ color: style.typography?.color ? `${style.typography.color}cc` : '#cbd5e1' }}
            >
              {props.subtitle || "Build high-converting VSLs, 1-click upsells, and 2-tier affiliate systems in minutes."}
            </p>
            <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
              <button 
                className="px-6 py-3.5 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: props.buttonColor || '#4f46e5',
                  color: props.buttonTextColor || '#ffffff',
                  borderRadius: props.buttonBorderRadius || '12px'
                }}
              >
                <span>{props.buttonText || 'GET STARTED TODAY'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'cta_box_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 sm:p-8 bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border-2 border-amber-500/60 rounded-3xl space-y-4 shadow-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-mono font-extrabold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
                ⚠️ URGENT DISCOUNT CLOSING SOON
              </span>
              <h3 className="text-xl font-black text-slate-900">{props.title || "CLAIM YOUR 80% DISCOUNT BEFORE MIDNIGHT"}</h3>
              <p className="text-xs text-slate-700">Lock in your lifetime agency access before the pricing increases to $997.</p>
            </div>
            <button className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xl shadow-amber-500/20 shrink-0">
              CLAIM 80% DISCOUNT NOW
            </button>
          </div>
        </div>
      );

    case 'testimonial_card_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-bold">
              VERIFIED BUYER
            </span>
          </div>
          <p className="text-xs text-slate-800 italic leading-relaxed">"{props.quote || 'This funnel stack generated $2.4M in 30 days. The 1-click upsells alone doubled our average order value.'}"</p>
          <div className="flex items-center gap-3 border-t border-slate-200 pt-3">
            <img src={props.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500" />
            <div>
              <div className="font-bold text-xs text-slate-900">{props.name || "Alex Hormozi"}</div>
              <div className="text-[10px] text-slate-600">{props.role || "Founder, Acquisition.com"}</div>
            </div>
          </div>
        </div>
      );

    case 'content_slider_widget': {
      const slides = [
        { title: "Automated 1-Click Upsells", desc: "Vault credit cards on initial checkout and present instant upsell additions with 0 friction." },
        { title: "2-Tier Affiliate Engine", desc: "Motivate partners with sticky referral tracking, sub-ID tags, and automated payouts." },
        { title: "Evergreen Webinar Funnels", desc: "Run simulated live webinars with chat proof and automated calendar booking gates." }
      ];
      const activeSlide = slides[widgetSlideIdx % slides.length];

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">FEATURE HIGHLIGHT SLIDER</span>
            <div className="flex gap-1.5">
              <button onClick={() => setWidgetSlideIdx((widgetSlideIdx - 1 + slides.length) % slides.length)} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setWidgetSlideIdx((widgetSlideIdx + 1) % slides.length)} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2 animate-fade-in">
            <h4 className="text-base font-bold text-slate-900">{activeSlide.title}</h4>
            <p className="text-xs text-slate-700">{activeSlide.desc}</p>
          </div>
          <div className="flex justify-center gap-1.5 pt-1">
            {slides.map((_, i) => (
              <span key={i} onClick={() => setWidgetSlideIdx(i)} className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${widgetSlideIdx === i ? 'bg-indigo-500 w-6' : 'bg-slate-50'}`} />
            ))}
          </div>
        </div>
      );
    }

    case 'shape_divider_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} py-4 overflow-hidden ${isSelected ? 'is-selected' : ''}`}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-indigo-900/60 fill-current">
            <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      );

    case 'image_carousel_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="relative overflow-hidden rounded-xl h-48 border border-slate-200 bg-white">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80" alt="Carousel Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-slate-900">Dynamic Marketing Gallery Banner</span>
            </div>
          </div>
        </div>
      );

    case 'interactive_gallery_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-400" />
              Interactive Portfolio & Funnel Showcase
            </span>
            <div className="flex bg-white p-1 rounded-lg border border-slate-200 text-[10px] font-bold">
              {['all', 'funnels', 'vsls', 'results'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setWidgetGalleryFilter(tab)}
                  className={`px-2.5 py-1 rounded transition-colors uppercase ${widgetGalleryFilter === tab ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="overflow-hidden rounded-xl border border-slate-200 bg-white group relative cursor-pointer">
                <img src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop`} alt="Gallery" className="w-full h-24 object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-slate-900" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'menu_anchor_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-3 bg-indigo-950/40 border border-dashed border-indigo-500/60 rounded-xl flex items-center justify-between font-mono text-xs text-indigo-300 ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-indigo-400" />
            <span>Smooth Scroll Menu Anchor: #{props.anchorId || 'pricing-section'}</span>
          </div>
          <span className="text-[10px] bg-indigo-900/60 px-2 py-0.5 rounded text-indigo-200">ANCHOR TARGET</span>
        </div>
      );

    case 'sidebar_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-800">Conversion Sidebar Widget</span>
            <p className="text-[11px] text-slate-600 mt-0.5">Sticky lead capture & quick links.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
            <label className="text-[11px] font-bold text-slate-700 block">Download Free Funnel Blueprint</label>
            <input type="email" placeholder="enter email address..." className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800" />
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow">INSTANT DOWNLOAD</button>
          </div>
        </div>
      );

    case 'spacer_widget':
      return (
        <div style={{ ...containerStyle, height: props.height || '48px' }} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} border border-dashed border-slate-200 flex items-center justify-center ${isSelected ? 'is-selected' : ''}`}>
          {!isInteractiveMode && <span className="text-[10px] font-mono text-slate-600">Vertical Spacer Gap ({props.height || '48px'})</span>}
        </div>
      );

    case 'read_more_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <h4 className="text-sm font-bold text-slate-900">{props.title || "Full Terms & Offer Guarantee Breakdown"}</h4>
          <p className={`text-xs text-slate-700 leading-relaxed ${!widgetReadMoreOpen ? 'line-clamp-2' : ''}`}>
            Our 30-Day 100% Risk-Free Guarantee ensures that if you are not wowed by the sales funnel performance or order bump conversion lifts, our team will issue a 100% full refund with no questions asked.
          </p>
          <button onClick={() => setWidgetReadMoreOpen(!widgetReadMoreOpen)} className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1">
            <span>{widgetReadMoreOpen ? 'Read Less' : 'Read More Details'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${widgetReadMoreOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      );

    case 'login_register_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button onClick={() => setWidgetAuthTab('login')} className={`flex-1 py-1.5 rounded-lg transition-all ${widgetAuthTab === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'}`}>Log In</button>
            <button onClick={() => setWidgetAuthTab('register')} className={`flex-1 py-1.5 rounded-lg transition-all ${widgetAuthTab === 'register' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600'}`}>Create Account</button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <input type="email" placeholder="user@company.com" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900" />
            </div>
            <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow">{widgetAuthTab === 'login' ? 'Log In to Account' : 'Register Account'}</button>
          </div>
        </div>
      );

    case 'price_list_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Itemized Services & Pricing Menu</span>
            <span className="text-[10px] text-indigo-400 font-mono">2026 RATES</span>
          </div>
          <div className="space-y-3">
            {[
              { item: "VSL Copywriting & Teardown", desc: "Full script optimization + 1-click upsell flow", price: "$497" },
              { item: "2-Tier Affiliate Engine Setup", desc: "Custom referral portal + payout setup", price: "$897" },
              { item: "ChronoChimp Calendar Integration", desc: "Automated Round-Robin host scheduling", price: "$297" }
            ].map((p, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-slate-200/60 pb-2 text-xs">
                <div>
                  <div className="font-bold text-slate-800">{p.item}</div>
                  <div className="text-[11px] text-slate-600">{p.desc}</div>
                </div>
                <span className="font-mono font-bold text-emerald-400">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'video_playlist_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-400" />
              Masterclass Video Playlist Player
            </span>
            <span className="text-[10px] text-slate-600 font-mono">3 EPISODES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white relative h-48">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80" alt="Video Playlist" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 ml-1" />
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {['Ep 1: Funnel Architecture', 'Ep 2: 1-Click Upsells', 'Ep 3: Affiliate Scale'].map((ep, idx) => (
                <div key={idx} onClick={() => setWidgetVideoPlaylistIdx(idx)} className={`p-2.5 rounded-xl border cursor-pointer ${widgetVideoPlaylistIdx === idx ? 'bg-purple-950 border-purple-800 text-purple-200 font-bold' : 'bg-white border-slate-200 text-slate-600'}`}>
                  {ep}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'table_of_contents_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-5 bg-white border border-slate-200 rounded-2xl space-y-3 text-xs ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
            <List className="w-4 h-4 text-indigo-400" />
            <span>Table of Contents</span>
          </div>
          <ul className="space-y-1.5 text-indigo-400 font-medium">
            <li className="hover:underline cursor-pointer">1. Executive Summary & Overview</li>
            <li className="hover:underline cursor-pointer">2. The 2-Step Opt-in Strategy</li>
            <li className="hover:underline cursor-pointer">3. Order Bumps & 1-Click Upsells</li>
            <li className="hover:underline cursor-pointer">4. ChronoChimp Calendar Integration</li>
          </ul>
        </div>
      );

    case 'reviews_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-xl font-black text-slate-900">4.9 / 5.0 Rating</h4>
              <p className="text-xs text-slate-600">Based on 1,420+ Verified Client Reviews</p>
            </div>
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
            </div>
          </div>
        </div>
      );

    case 'comparison_slider_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Before vs After Conversion Lift</span>
            <span className="text-emerald-400 font-mono">+142% AOV Increase</span>
          </div>
          <div className="relative overflow-hidden rounded-xl h-44 border border-slate-200 bg-white">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80" alt="Comparison" className="w-full h-full object-cover" />
            <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-2xl flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">VS</div>
            </div>
          </div>
        </div>
      );

    case 'stats_counter_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">$10M+</div>
              <div className="text-[11px] text-slate-600">Processed Sales</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-purple-400">14.2k</div>
              <div className="text-[11px] text-slate-600">Active Funnels</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.9%</div>
              <div className="text-[11px] text-slate-600">Uptime Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">2-Tier</div>
              <div className="text-[11px] text-slate-600">Affiliate Payouts</div>
            </div>
          </div>
        </div>
      );

    case 'countdown_banner_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-3.5 bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-500/40 rounded-2xl flex items-center justify-between text-xs shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="font-extrabold text-slate-900">LIMITED TIME COUPON: Use code <strong className="text-amber-300 font-mono font-bold">LAUNCH80</strong></span>
          </div>
          <button className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-slate-900 font-bold rounded-lg text-xs">Apply Coupon</button>
        </div>
      );

    case 'floating_whatsapp_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs text-emerald-200 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Live WhatsApp Chat Support</div>
              <div className="text-[10px] text-emerald-400">Typically replies in under 2 minutes</div>
            </div>
          </div>
        </div>
      );

    case 'team_grid_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">Leadership & Strategist Team</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
            {['Marcus Vance', 'Sarah Jenkins', 'David Sterling'].map((name, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <img src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80`} alt={name} className="w-10 h-10 rounded-full object-cover mx-auto border-2 border-indigo-500" />
                <div className="font-bold text-slate-900">{name}</div>
                <div className="text-[10px] text-slate-600">Funnel Strategist</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'logo_cloud_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <span className="text-[10px] uppercase font-mono font-bold text-slate-600 text-center block">AS FEATURED IN TOP PUBLICATIONS</span>
          <div className="flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-slate-500 font-mono">
            <span>FORBES</span>
            <span>BLOOMBERG</span>
            <span>TECHCRUNCH</span>
            <span>BUSINESS INSIDER</span>
          </div>
        </div>
      );

    case 'guarantee_badge_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-amber-500/40 rounded-3xl text-center space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-base font-black text-slate-900">30-Day 100% Money-Back Guarantee</h4>
          <p className="text-xs text-slate-700 max-w-md mx-auto">Try LaunchEngine completely risk-free for 30 days. If you are not wowed, we will issue a full 100% refund immediately.</p>
        </div>
      );

    case 'progress_step_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span className="text-indigo-400">Step 1: Choose Offer</span>
            <span>Step 2: Shipping</span>
            <span>Step 3: Instant Access</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-1/3" />
          </div>
        </div>
      );

    case 'audio_podcast_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <button onClick={() => setWidgetAudioPlaying(!widgetAudioPlaying)} className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow">
                {widgetAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <div className="font-bold text-slate-900">Podcast Ep #14: 1-Click Upsell Secrets</div>
                <div className="text-[10px] text-slate-600">14:22 mins • LaunchEngine Radio</div>
              </div>
            </div>
            <Headphones className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      );

    case 'map_location_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Headquarters & VIP Studio</span>
            </div>
            <span className="text-[10px] text-slate-600 font-mono">BEVERLY HILLS, CA</span>
          </div>
          <p className="text-xs text-slate-700">9450 Wilshire Blvd, Beverly Hills, CA 90212</p>
        </div>
      );

    case 'notification_popup_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-4 bg-white border border-emerald-500/40 rounded-2xl flex items-center gap-3 shadow-2xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-900">Sarah M. from Austin, TX</div>
            <div className="text-[11px] text-slate-600">Just purchased LaunchEngine Enterprise Pass (2 mins ago)</div>
          </div>
        </div>
      );

    case 'social_feed_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-5 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs font-bold text-slate-900">
            <span>Instagram @LaunchEngine.io Feed</span>
            <span className="text-[10px] text-indigo-400">FOLLOW US</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(n => (
              <div key={n} className="overflow-hidden rounded-xl border border-slate-200 bg-white h-20">
                <img src={`https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop`} alt="Feed" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      );

    case 'feature_comparison_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-6 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">Plan Feature Comparison Matrix</div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2">Feature</th>
                <th className="py-2 text-center">Starter</th>
                <th className="py-2 text-center text-indigo-400">Agency Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-700">
              <tr><td className="py-2">1-Click Upsells</td><td className="text-center">✓</td><td className="text-center text-emerald-400 font-bold">✓ Unlimited</td></tr>
              <tr><td className="py-2">ChronoChimp Calendar</td><td className="text-center">-</td><td className="text-center text-emerald-400 font-bold">✓ Included</td></tr>
            </tbody>
          </table>
        </div>
      );

    case 'search_bar_widget':
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-3 bg-white border border-slate-200 rounded-2xl shadow-xl ${isSelected ? 'is-selected' : ''}`}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
            <input 
              type="text" 
              placeholder="Search offer catalog, courses, or knowledgebase..."
              value={widgetSearchQuery}
              onChange={(e) => setWidgetSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      );

    case 'community_feed_widget': {
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden ${isSelected ? 'is-selected' : ''}`}>
          <div className="p-4 bg-slate-50 border-b border-slate-300 flex justify-between items-center">
            <h3 className="text-slate-900 font-bold text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              TribeNexus Feed (Space: {props.spaceSlug || 'all'})
            </h3>
          </div>
          <div className="h-[600px] overflow-y-auto">
            {isInteractiveMode ? (
              <TribeNexusCommunity defaultSpaceSlug={props.spaceSlug} />
            ) : (
              <div className="p-8 text-center opacity-50 pointer-events-none transform scale-90 origin-top">
                <TribeNexusCommunity defaultSpaceSlug={props.spaceSlug} />
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'header_navigation': {
      const bgImg = props.backgroundImageUrl || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80';
      const bgOverlay = props.bgOverlayColor || 'rgba(15, 23, 42, 0.85)';
      const logoText = props.brandLogoText || 'LaunchEngine';
      const headline = props.headlineText || 'Build & Scale High-Converting Funnels';
      const subheadline = props.subheadlineText || 'The ultimate platform with 50+ conversion widgets, automated A/B testing, and built-in LMS.';
      const btnText = props.buttonText || 'Get Started Free';

      const defaultMenuItems = [
        { id: 'm1', label: 'Home', linkUrl: '#' },
        { 
          id: 'm2', 
          label: 'Solutions ▾', 
          linkUrl: '#',
          subItems: [
            { id: 'sm2-1', label: 'Visual Funnel Builder', linkUrl: '#builder' },
            { id: 'sm2-2', label: 'Course Portal LMS', linkUrl: '#lms' },
            { id: 'sm2-3', label: 'ChronoChimp Booking', linkUrl: '#booking' },
            { id: 'sm2-4', label: 'CRM Pipelines', linkUrl: '#crm' }
          ] 
        },
        { 
          id: 'm3', 
          label: 'Resources ▾', 
          linkUrl: '#',
          subItems: [
            { id: 'sm3-1', label: 'Documentation', linkUrl: '#docs' },
            { id: 'sm3-2', label: 'Case Studies', linkUrl: '#cases' },
            { id: 'sm3-3', label: 'API Reference', linkUrl: '#api' }
          ] 
        },
        { id: 'm4', label: 'Pricing', linkUrl: '#pricing' },
        { id: 'm5', label: 'Contact', linkUrl: '#contact' }
      ];

      const navItems = props.menuItems || defaultMenuItems;

      return (
        <div 
          style={{
            ...containerStyle,
            backgroundImage: `linear-gradient(${bgOverlay}, ${bgOverlay}), url("${bgImg}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
          onClick={onSelect} 
          className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} rounded-3xl overflow-hidden border border-slate-200 shadow-2xl ${isSelected ? 'is-selected' : ''}`}
        >
          {/* TOP NAVIGATION BAR */}
          <nav className="px-6 py-4 border-b border-slate-200/60 backdrop-blur-md flex items-center relative z-20 w-full">
            {/* Brand Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                🚀
              </div>
              <span className="font-black text-lg text-slate-900 tracking-tight font-sans">{logoText}</span>
            </div>

            {/* Desktop Menu Navigation Items with Responsive Dropdown Submenus */}
            <div className={`hidden md:flex items-center gap-6 flex-1 ${
              style?.typography?.textAlign === 'left' ? 'justify-start pl-12' :
              style?.typography?.textAlign === 'right' ? 'justify-end pr-8' :
              'justify-center'
            }`}>
              {navItems.map((item: any) => (
                <div key={item.id} className="relative group/menu py-2">
                  <a 
                    href={item.linkUrl || '#'} 
                    className="text-xs font-bold text-slate-700 hover:text-indigo-400 transition-colors flex items-center gap-1"
                  >
                    {item.label}
                  </a>

                  {/* Dropdown Sub-menu on Hover/Focus */}
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="absolute top-full left-0 hidden group-hover/menu:block min-w-[200px] p-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl space-y-1 z-50">
                      {item.subItems.map((sub: any) => (
                        <a
                          key={sub.id}
                          href={sub.linkUrl || '#'}
                          className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-indigo-600/80 transition-all flex items-center gap-2"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{sub.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all">
                {btnText}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setVideoPlaying(!videoPlaying);
                }}
                className="md:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-50 rounded-xl"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Accordion Drawer */}
          {videoPlaying && (
            <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3 relative z-30">
              {navItems.map((item: any) => (
                <div key={item.id} className="space-y-1">
                  <div className="text-xs font-extrabold text-slate-900 py-1">{item.label}</div>
                  {item.subItems && (
                    <div className="pl-3 space-y-1 border-l border-slate-200">
                      {item.subItems.map((sub: any) => (
                        <a key={sub.id} href={sub.linkUrl || '#'} className="block text-[11px] text-slate-600 hover:text-indigo-400 py-1">
                          ↳ {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* HERO BANNER CONTENT */}
          <div className="px-6 py-20 md:py-28 max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <h1 
              className="text-3xl md:text-5xl font-black tracking-tight leading-tight"
              style={{ color: style.typography?.color || '#ffffff' }}
            >
              {headline}
            </h1>
            <p 
              className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: style.typography?.color ? `${style.typography.color}cc` : '#cbd5e1' }}
            >
              {subheadline}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                className="px-8 py-3.5 font-extrabold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                style={{
                  backgroundColor: props.buttonColor || '#4f46e5',
                  color: props.buttonTextColor || '#ffffff',
                  borderRadius: props.buttonBorderRadius || '16px'
                }}
              >
                <span>{btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'menu_navigation': {
      const defaultLinks = [
        { id: 'm1', label: 'Home', linkUrl: '#' },
        { 
          id: 'm2', 
          label: 'Products ▾', 
          linkUrl: '#',
          subItems: [
            { id: 'sm1', label: 'Visual Builder', linkUrl: '#' },
            { id: 'sm2', label: 'Course LMS', linkUrl: '#' },
            { id: 'sm3', label: 'ChronoChimp', linkUrl: '#' }
          ]
        },
        { id: 'm3', label: 'Pricing', linkUrl: '#' },
        { id: 'm4', label: 'Contact', linkUrl: '#' }
      ];

      const navLinks = props.links || props.menuItems || defaultLinks;

      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} p-4 bg-white border border-slate-200 rounded-2xl shadow-lg ${isSelected ? 'is-selected' : ''}`}>
          <div className="flex items-center w-full relative">
            <div className="flex items-center gap-2 shrink-0">
              {!props.hideBrandImage && (
                <>
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">🚀</div>
                  <span className="font-bold text-sm text-slate-900">{props.brandName || 'Brand'}</span>
                </>
              )}
            </div>

            <div className={`flex items-center gap-4 flex-1 ${
              style?.typography?.textAlign === 'left' ? 'justify-start pl-8' :
              style?.typography?.textAlign === 'right' ? 'justify-end' :
              'justify-center'
            }`}>
              {navLinks.map((link: any, idx: number) => (
                <div key={link.id || idx} className="relative group/sub py-1">
                  <a href={link.url || link.linkUrl || '#'} className="text-xs font-bold text-slate-700 hover:text-indigo-400 transition-colors flex items-center gap-1">
                    {link.label}
                  </a>

                  {link.subItems && link.subItems.length > 0 && (
                    <div className="absolute top-full left-0 hidden group-hover/sub:block min-w-[160px] p-2 bg-white border border-slate-200 rounded-xl shadow-2xl space-y-1 z-50">
                      {link.subItems.map((sub: any) => (
                        <a key={sub.id} href={sub.linkUrl || '#'} className="block px-2.5 py-1.5 rounded-lg text-[11px] text-slate-700 hover:text-slate-900 hover:bg-indigo-600/80 transition-colors">
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }


    default:
      return (
        <div style={containerStyle} onClick={onSelect} className={`element-node relative ${isInteractiveMode ? 'preview-element-clean' : ''} ${!isInteractiveMode ? 'p-4 bg-white border border-slate-200  text-xs text-slate-700' : ' text-xs text-slate-700'} ${isSelected ? 'is-selected' : ''}`}>
          <div className="font-semibold text-indigo-400 capitalize mb-1">{type.replace('_', ' ')} Component</div>
          <p className="opacity-80">{props.text || props.title || 'Interactive element block'}</p>
        </div>
      );
  }
};


class ElementErrorBoundary extends React.Component<{ children: React.ReactNode; typeName?: string }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ElementErrorBoundary caught exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-3 bg-white border border-rose-500/50 rounded-xl text-rose-300 text-xs font-mono my-2 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-rose-400">
            <AlertCircle className="w-4 h-4" />
            <span>Element Render Safeguard ({this.props.typeName || 'Component'})</span>
          </div>
          <p className="text-[11px] opacity-80">This element container recovered safely from a property formatting error.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export const ElementRenderer: React.FC<ElementRendererProps> = (props) => {
  return (
    <ElementErrorBoundary typeName={props.element.type}>
      {props.element.style?.customCode?.scopedCss && (
        <style>{props.element.style.customCode.scopedCss}</style>
      )}
      <ElementRendererContent {...props} />
    </ElementErrorBoundary>
  );
};
