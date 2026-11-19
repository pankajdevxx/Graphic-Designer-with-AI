/**
 * PixelGenCreativity — Comprehensive Marketplace Products Dataset
 * Structured demonstration products across all 15 design categories.
 * Note: Demonstration data for Phase 3 frontend marketplace; real MySQL database sync connects in Phase 4.
 */

export const MARKETPLACE_PRODUCTS = [
  // 1. Logo Design
  {
    id: 'prod-01',
    slug: 'lumina-minimalist-geometric-logo-system',
    title: 'Lumina — Minimalist Geometric Logo System',
    category: 'Logo Design',
    categorySlug: 'logo-design',
    price: 39.0,
    originalPrice: 69.0,
    discount: 43,
    rating: 4.9,
    reviewCount: 94,
    salesCount: '1.4k',
    featured: true,
    trending: true,
    bestSeller: true,
    isNew: false,
    onSale: true,
    description:
      'A masterfully crafted geometric logo collection comprising 40 golden-ratio icon marks, responsive typography lockups, and inverted dark/light monochrome variants for luxury tech and fintech brands.',
    previewImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['AI (Illustrator)', 'EPS Vector', 'SVG', 'PNG (4K)', 'PDF'],
    software: ['Adobe Illustrator', 'Figma', 'Affinity Designer'],
    dimensions: 'Scalable Vector (Infinite)',
    license: 'Standard Commercial License included',
    whatIncluded: [
      '40 Unique Golden Ratio Vector Marks',
      'Horizontal, Vertical, and Monogram Lockups',
      'Comprehensive Brand Color Formulation Guide (CMYK, RGB, HEX)',
      'Free Commercial Typography Links & Pairing Matrix',
      'Figma & Illustrator Source Files with Organized Artboards',
    ],
    features: [
      '100% Vector & Infinitely Scalable',
      'Editable Live Strokes & Closed Paths',
      'Export Presets for iOS, Android, and Web Favicons',
      'CMYK Print-Ready & RGB Digital Color Spaces',
    ],
    reviews: [
      {
        id: 'rev-01',
        author: 'Liam Vance',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-02',
        title: 'Impeccable geometric balance',
        comment: 'The mathematical precision of these vector marks saved our design team at least 40 hours. Every path is pristine.',
        helpfulCount: 28,
      },
      {
        id: 'rev-02',
        author: 'Sofia Patel',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-24',
        title: 'Perfect for fintech startup rebranding',
        comment: 'Clean typography pairings and beautiful export options. Highly recommended.',
        helpfulCount: 14,
      },
    ],
    tags: ['Minimalist', 'Geometric', 'Vector', 'Golden Ratio', 'Tech Logo'],
    createdAt: '2026-10-15',
  },

  // 2. Brand Identity
  {
    id: 'prod-02',
    slug: 'neon-nexus-cyberpunk-brand-kit',
    title: 'Neon Nexus — Cyberpunk Brand Kit & Guidelines',
    category: 'Brand Identity',
    categorySlug: 'brand-identity',
    price: 49.0,
    originalPrice: 89.0,
    discount: 45,
    rating: 4.9,
    reviewCount: 128,
    salesCount: '1.2k',
    featured: true,
    trending: true,
    bestSeller: false,
    isNew: false,
    onSale: true,
    description:
      'Futuristic visual identity suite featuring generative neon marks, dark-mode stationery, 3D brand guidelines, social banners, and complete typographic architecture for Web3, AI, and gaming brands.',
    previewImages: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'AI Vector', 'PDF Guidelines', 'PSD Mockups'],
    software: ['Figma 2026', 'Adobe Illustrator', 'Photoshop'],
    dimensions: 'Full Stationery Suite + Digital Guidelines',
    license: 'Commercial & Agency License',
    whatIncluded: [
      '48-Page Interactive Brand Guidelines Template',
      'Business Card, Letterhead & Envelope Print Layouts',
      '3D Holographic Foil Spec Sheets',
      'Digital Avatar & Social Banner Kit',
      'Custom Cyberpunk Icon Library (80+ Icons)',
    ],
    features: [
      'Comprehensive Auto-Layout Figma Components',
      'Deep Purple & Neon Violet Color Tokens',
      'Includes 3D Octane Rendered Mockups in High Res',
      'Fully Documented Safe Zones and Grid Rules',
    ],
    reviews: [
      {
        id: 'rev-03',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-05',
        title: 'Instant visual authority',
        comment: 'We used Neon Nexus for our gaming studio rebrand. Investors commented on how cohesive and polished our decks looked.',
        helpfulCount: 31,
      },
    ],
    tags: ['Cyberpunk', 'Brand Identity', 'Figma', 'Guidelines', 'Neon'],
    createdAt: '2026-10-18',
  },

  // 3. Posters & Banners
  {
    id: 'prod-03',
    slug: 'vanguard-brutalist-editorial-poster-collection',
    title: 'Vanguard — Brutalist Editorial Poster Collection',
    category: 'Posters & Banners',
    categorySlug: 'posters-banners',
    price: 29.0,
    originalPrice: 55.0,
    discount: 47,
    rating: 4.8,
    reviewCount: 84,
    salesCount: '890',
    featured: false,
    trending: true,
    bestSeller: false,
    isNew: true,
    onSale: true,
    description:
      'High-contrast monochrome and chromatic editorial posters engineered for underground music festivals, streetwear apparel drops, and brutalist architecture exhibitions.',
    previewImages: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['PSD (Layered)', 'AI Vector', 'TIFF 300 DPI', 'PNG'],
    software: ['Photoshop', 'Illustrator'],
    dimensions: 'A1, A2, A3 (300 DPI Print Ready with 3mm Bleed)',
    license: 'Standard Commercial License',
    whatIncluded: [
      '24 Layered Print Poster Templates',
      'High-Resolution Paper Texture Overlays',
      'Custom Halftone & Grain Smart Filters',
      'Free Acid Graphics & Barcode Vector Pack',
    ],
    features: [
      'Smart Object Photo Replacement',
      'Non-Destructive Text and Effect Editing',
      'CMYK Offset and Digital Print Presets',
    ],
    reviews: [
      {
        id: 'rev-04',
        author: 'Chloe Dupont',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-30',
        title: 'Raw, gritty and ultra-clean',
        comment: 'The text textures and layout grids in these posters are top notch. Printed beautifully for our gallery pop-up.',
        helpfulCount: 19,
      },
    ],
    tags: ['Brutalist', 'Posters', 'Print', 'Editorial', 'Typography'],
    createdAt: '2026-11-01',
  },

  // 4. Instagram Posts
  {
    id: 'prod-04',
    slug: 'hyperviral-creator-social-growth-pack',
    title: 'HyperViral — Creator Social Growth Pack',
    category: 'Instagram Posts',
    categorySlug: 'instagram-posts',
    price: 34.0,
    originalPrice: 65.0,
    discount: 48,
    rating: 4.9,
    reviewCount: 312,
    salesCount: '3.1k',
    featured: true,
    trending: false,
    bestSeller: true,
    isNew: false,
    onSale: true,
    description:
      'Strategic social media templates built for high engagement. Contains 100 square and portrait layouts designed for software founders, creators, and digital marketing agencies.',
    previewImages: [
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'Canva Links', 'PSD'],
    software: ['Figma', 'Canva', 'Photoshop'],
    dimensions: '1080x1080px (1:1) and 1080x1350px (4:5 Portrait)',
    license: 'Commercial Unlimited License',
    whatIncluded: [
      '100 Feed Post Templates (1:1 & 4:5)',
      'Engagement Hooks & Quote Card Matrices',
      'Chart & Data Infographic Modules',
      'Canva One-Click Import Direct Link',
    ],
    features: [
      'Optimized for Instagram Algorithm Retention',
      'Dark Purple & High-Contrast Visual Framing',
      'Includes Free Font Resource Guide',
    ],
    reviews: [
      {
        id: 'rev-05',
        author: 'Derrick Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-08',
        title: 'Engagement jumped 3x',
        comment: 'These clean, dark-mode designs doubled our comment rate within two weeks. Very easy to edit in Figma.',
        helpfulCount: 42,
      },
    ],
    tags: ['Instagram', 'Social Media', 'Canva', 'Growth', 'Feed Pack'],
    createdAt: '2026-10-10',
  },

  // 5. Instagram Stories
  {
    id: 'prod-05',
    slug: 'pulse-kinetic-instagram-stories-kit',
    title: 'Pulse — Kinetic Instagram Stories Kit',
    category: 'Instagram Stories',
    categorySlug: 'instagram-stories',
    price: 27.0,
    originalPrice: 48.0,
    discount: 44,
    rating: 4.8,
    reviewCount: 76,
    salesCount: '650',
    featured: false,
    trending: true,
    bestSeller: false,
    isNew: true,
    onSale: true,
    description:
      'Immersive 9:16 vertical story layouts featuring flash sale countdowns, product launches, podcast snippets, and interactive question prompts styled with glassmorphism blur.',
    previewImages: [
      'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'Canva', 'PSD', 'MP4 Motion Video'],
    software: ['Figma', 'After Effects', 'Canva'],
    dimensions: '1080x1920px (9:16 Vertical Story)',
    license: 'Commercial License',
    whatIncluded: [
      '60 Vertical Story Layouts',
      '15 Animated Motion Presets',
      'Swipe-Up & Link Sticker Cutout Elements',
    ],
    features: [
      'Story Sequence Flow Architecture',
      'High-Impact Typography Hierarchy',
    ],
    reviews: [
      {
        id: 'rev-06',
        author: 'Elena Kim',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-04',
        title: 'Story conversion was incredible',
        comment: 'Ran our Black Friday early bird promo with these stories and sold out in 3 hours.',
        helpfulCount: 16,
      },
    ],
    tags: ['Stories', 'Vertical 9:16', 'Instagram', 'Motion', 'Sale'],
    createdAt: '2026-11-03',
  },

  // 6. Social Media Carousels
  {
    id: 'prod-06',
    slug: 'synapse-educational-carousel-architecture',
    title: 'Synapse — Educational Carousel Architecture',
    category: 'Social Media Carousels',
    categorySlug: 'social-media-carousels',
    price: 38.0,
    originalPrice: 70.0,
    discount: 46,
    rating: 5.0,
    reviewCount: 145,
    salesCount: '1.8k',
    featured: true,
    trending: true,
    bestSeller: true,
    isNew: false,
    onSale: true,
    description:
      'Seamless multi-slide storytelling carousels for LinkedIn and Instagram. Designed to maximize swipe-through rates and high-value algorithmic shares for B2B executives and designers.',
    previewImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'Canva Links', 'PSD Multi-Artboard'],
    software: ['Figma', 'Canva', 'Photoshop'],
    dimensions: '1080x1350px (Continuous Seamless Panorama)',
    license: 'Commercial License',
    whatIncluded: [
      '30 Multi-Slide Complete Carousels (5-10 slides each)',
      'Continuous Panoramic Graphics that bleed between slides',
      'Hook Slide Formulas & Call-to-Action Closing Slides',
    ],
    features: [
      'Seamless Visual Continuity',
      'Proven High-Save Formatting',
      'Figma Component Library Included',
    ],
    reviews: [
      {
        id: 'rev-07',
        author: 'Arjun Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-19',
        title: 'LinkedIn impressions skyrocketed',
        comment: 'Went from 2,000 to 45,000 impressions per carousel post. The seamless transitions keep people swiping.',
        helpfulCount: 39,
      },
    ],
    tags: ['Carousels', 'LinkedIn', 'Seamless', 'Swipe', 'Educational'],
    createdAt: '2026-10-05',
  },

  // 7. YouTube Thumbnails
  {
    id: 'prod-07',
    slug: 'viral-optic-youtube-ctr-master-pack',
    title: 'ViralOptic — YouTube CTR Master Pack',
    category: 'YouTube Thumbnails',
    categorySlug: 'youtube-thumbnails',
    price: 32.0,
    originalPrice: 60.0,
    discount: 47,
    rating: 4.9,
    reviewCount: 220,
    salesCount: '2.5k',
    featured: true,
    trending: true,
    bestSeller: true,
    isNew: false,
    onSale: true,
    description:
      'Psychologically optimized YouTube thumbnail templates engineered to boost click-through rates. Features high-contrast neon glows, dynamic text effects, and cutout mask slots for creators.',
    previewImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Photoshop (.psd)', 'Figma (.fig)', 'Canva'],
    software: ['Photoshop', 'Figma', 'Canva'],
    dimensions: '1280x720px (16:9 HD Thumbnail)',
    license: 'Commercial Creator License',
    whatIncluded: [
      '50 High CTR Thumbnail PSDs',
      'Face Cutout Masking Actions',
      '3D Arrow & Emoji Graphic Pack',
      'CTR Optimization Formula Checklist',
    ],
    features: [
      'Color-Graded for High Contrast Against Dark/Light YouTube Themes',
      'Easily Replaceable Face Layers',
    ],
    reviews: [
      {
        id: 'rev-08',
        author: 'Leo Bennett',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-06',
        title: 'CTR jumped from 4% to 11%',
        comment: 'My tech review channel saw an immediate spike. The thumbnail templates look like they were custom-rendered by MrBeast editors.',
        helpfulCount: 52,
      },
    ],
    tags: ['YouTube', 'Thumbnail', 'CTR', 'Video', 'Creator Pack'],
    createdAt: '2026-10-12',
  },

  // 8. YouTube Channel Banners
  {
    id: 'prod-08',
    slug: 'apex-channel-art-multi-device-banners',
    title: 'Apex — Multi-Device YouTube Channel Banners',
    category: 'YouTube Channel Banners',
    categorySlug: 'youtube-channel-banners',
    price: 24.0,
    originalPrice: 42.0,
    discount: 43,
    rating: 4.8,
    reviewCount: 65,
    salesCount: '580',
    featured: false,
    trending: false,
    bestSeller: false,
    isNew: false,
    onSale: true,
    description:
      'Responsive YouTube channel art templates engineered with safe-zone guides for mobile, tablet, desktop, and 4K television screens across gaming, coding, podcasting, and finance niches.',
    previewImages: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['PSD (Layered)', 'Figma', 'PNG 2560x1440'],
    software: ['Photoshop', 'Figma'],
    dimensions: '2560x1440px (TV Safe Zone: 1235x338px for Mobile)',
    license: 'Commercial License',
    whatIncluded: [
      '20 Niched Channel Banner Templates',
      'Exact Safe-Zone Alignment Overlays',
      'Matching Profile Avatar & Watermark Assets',
    ],
    features: [
      'Tested Across Mobile, Desktop, and TV Outputs',
      'Organized Group Folders',
    ],
    reviews: [
      {
        id: 'rev-09',
        author: 'Nadia Wright',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-15',
        title: 'Fits mobile perfectly',
        comment: 'No more cropped logos on mobile phones! The safe zone guides are foolproof.',
        helpfulCount: 11,
      },
    ],
    tags: ['YouTube Banner', 'Channel Art', 'Safe Zone', 'Branding'],
    createdAt: '2026-09-28',
  },

  // 9. Business Cards
  {
    id: 'prod-09',
    slug: 'monolith-luxury-minimalist-business-cards',
    title: 'Monolith — Luxury Minimalist Business Identity',
    category: 'Business Cards',
    categorySlug: 'business-cards',
    price: 22.0,
    originalPrice: 40.0,
    discount: 45,
    rating: 4.9,
    reviewCount: 76,
    salesCount: '940',
    featured: false,
    trending: true,
    bestSeller: false,
    isNew: false,
    onSale: true,
    description:
      'Understated elegance for architecture, high-end fashion, venture capital, and legal consulting practices. Features foil stamping, blind debossing, and QR smart NFC layers.',
    previewImages: [
      'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['AI Vector', 'PSD Mockup', 'EPS', 'PDF Print'],
    software: ['Illustrator', 'Photoshop'],
    dimensions: '3.5 x 2 inches (Standard) & 65x65mm (Square) with 0.125" Bleed',
    license: 'Commercial Print License',
    whatIncluded: [
      '16 Minimalist Double-Sided Business Card Layouts',
      'Spot UV & Metallic Gold Foil Layer Specs',
      'Photorealistic Studio Mockups for Presentation',
    ],
    features: [
      'CMYK 300 DPI Print Calibrated',
      'Clean Grid Alignment',
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Vincent Roy',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-29',
        title: 'Sent straight to letterpress printer',
        comment: 'Printer accepted the AI files without a single revision. The blind deboss layer was exact.',
        helpfulCount: 15,
      },
    ],
    tags: ['Business Cards', 'Luxury', 'Print', 'Foil', 'Minimalist'],
    createdAt: '2026-10-02',
  },

  // 10. Resume Templates
  {
    id: 'prod-10',
    slug: 'executive-ats-clean-resume-system',
    title: 'Executive — ATS-Optimized Minimalist CV Suite',
    category: 'Resume Templates',
    categorySlug: 'resume-templates',
    price: 25.0,
    originalPrice: 45.0,
    discount: 44,
    rating: 4.9,
    reviewCount: 118,
    salesCount: '1.6k',
    featured: false,
    trending: false,
    bestSeller: false,
    isNew: true,
    onSale: true,
    description:
      'Recruiter-approved curriculum vitae and executive resume templates. Engineered to pass Applicant Tracking Systems (ATS) while presenting an editorial aesthetic for leadership roles.',
    previewImages: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma', 'Word (.docx)', 'Pages', 'InDesign (.indd)'],
    software: ['Figma', 'Microsoft Word', 'Apple Pages', 'Adobe InDesign'],
    dimensions: 'US Letter & International A4',
    license: 'Personal & Career License',
    whatIncluded: [
      '1-Page, 2-Page, and 3-Page Executive CV Layouts',
      'Matching Cover Letter & References Sheet',
      'ATS Keyword Optimization Checklist',
      'Action Verb Cheat Sheet for Tech & Business',
    ],
    features: [
      '100% ATS Readable Parser Compatibility',
      'Clean Typographic Hierarchy',
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'Rachel Adams',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-01',
        title: 'Landed VP of Product interview',
        comment: 'Clean, elegant, and had zero parsing errors when uploaded to Greenhouse and Lever.',
        helpfulCount: 27,
      },
    ],
    tags: ['Resume', 'CV', 'ATS Friendly', 'Executive', 'Career'],
    createdAt: '2026-10-22',
  },

  // 11. Presentation Designs
  {
    id: 'prod-11',
    slug: 'apex-pitch-series-a-investor-deck',
    title: 'Apex Pitch — Series-A Investor Presentation Deck',
    category: 'Presentation Designs',
    categorySlug: 'presentation-designs',
    price: 45.0,
    originalPrice: 90.0,
    discount: 50,
    rating: 4.9,
    reviewCount: 167,
    salesCount: '1.8k',
    featured: true,
    trending: true,
    bestSeller: true,
    isNew: false,
    onSale: true,
    description:
      '65 slide templates that have helped venture-backed startups raise over $40M in early-stage capital. Features financial model tables, TAM/SAM/SOM market charts, and team slides.',
    previewImages: [
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'PowerPoint (.pptx)', 'Keynote (.key)'],
    software: ['Figma', 'PowerPoint', 'Keynote', 'Google Slides'],
    dimensions: '1920x1080px (16:9 Widescreen)',
    license: 'Commercial Pitch License',
    whatIncluded: [
      '65 Custom Slide Layouts in Dark & Light Modes',
      'Fully Editable Vector Charts & Data Visualizations',
      'Device Mockups for Web & Mobile Software Demos',
      'Venture Capital Pitch Deck Story Structure Guide',
    ],
    features: [
      'Master Slide Theme Controls',
      'Drag-and-Drop Image Placeholders',
    ],
    reviews: [
      {
        id: 'rev-12',
        author: 'Tariq Al-Mansoor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-18',
        title: 'Closed our $2.5M seed round with this deck',
        comment: 'Every partner remarked on the clarity of the market sizing slide. Absolutely worth 100x the price.',
        helpfulCount: 64,
      },
    ],
    tags: ['Pitch Deck', 'Keynote', 'PowerPoint', 'Investor', 'Startup'],
    createdAt: '2026-09-15',
  },

  // 12. Website UI Kits
  {
    id: 'prod-12',
    slug: 'aura-ui-nextgen-fintech-saas-design-system',
    title: 'Aura UI — Next-Gen FinTech SaaS Design System',
    category: 'Website UI Kits',
    categorySlug: 'website-ui-kits',
    price: 69.0,
    originalPrice: 129.0,
    discount: 47,
    rating: 5.0,
    reviewCount: 214,
    salesCount: '2.4k',
    featured: true,
    trending: true,
    bestSeller: true,
    isNew: false,
    onSale: true,
    description:
      'Enterprise-grade financial dashboard design system with dark glassmorphic cards, analytics widgets, transactions tables, and 120+ responsive desktop and mobile viewports.',
    previewImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'Tailwind CSS Tokens (JSON)', 'React Code Snippets'],
    software: ['Figma 2026', 'React', 'Tailwind CSS'],
    dimensions: 'Responsive (1440px Desktop, 768px Tablet, 375px Mobile)',
    license: 'Commercial Developer License',
    whatIncluded: [
      '120+ Responsive SaaS Screens',
      '400+ Atomic UI Components with Auto-Layout 5.0',
      'Dark & Light Mode Variable Tokens',
      'Tailwind CSS Config & Token Mappings',
    ],
    features: [
      'WCAG AAA Accessible Contrast Calibrated',
      'Interactive Figma Prototyping Preset',
    ],
    reviews: [
      {
        id: 'rev-13',
        author: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-09',
        title: 'Industry standard for fintech design',
        comment: 'The token naming matches Tailwind v4 cleanly. Shipped our web app 2 months ahead of schedule.',
        helpfulCount: 48,
      },
    ],
    tags: ['UI Kit', 'Figma', 'SaaS', 'Fintech', 'Design System'],
    createdAt: '2026-10-08',
  },

  // 13. Mobile App UI
  {
    id: 'prod-13',
    slug: 'quantum-3d-glassmorphic-mobile-app-ui',
    title: 'Quantum — 3D Glassmorphic Mobile App UI',
    category: 'Mobile App UI',
    categorySlug: 'mobile-app-ui',
    price: 49.0,
    originalPrice: 85.0,
    discount: 42,
    rating: 5.0,
    reviewCount: 96,
    salesCount: '620',
    featured: false,
    trending: true,
    bestSeller: false,
    isNew: true,
    onSale: true,
    description:
      'Native iOS and Android UI kit with 80+ responsive screens, biometric authorization flows, crypto wallet widgets, and specular violet glassmorphism cards.',
    previewImages: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633493106185-1123bc458737?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'PNG 3x', 'SVG Icons'],
    software: ['Figma', 'Sketch'],
    dimensions: '393x852px (iPhone 16 Pro Baseline)',
    license: 'Commercial App License',
    whatIncluded: [
      '80+ Fully Linked Flow Screens',
      'Apple Human Interface Guidelines Compliant Components',
      'Complete Micro-interaction Animation Prototypes',
    ],
    features: [
      'Auto-Layout & Component Properties',
      'Dark Purple Specular Highlights',
    ],
    reviews: [
      {
        id: 'rev-14',
        author: 'Julian Sterling',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-25',
        title: 'Breathtaking mobile interactions',
        comment: 'Clients were blown away by the glassmorphism wallet view. Outstanding component organization.',
        helpfulCount: 22,
      },
    ],
    tags: ['Mobile UI', 'iOS', 'Android', 'Figma', 'Wallet'],
    createdAt: '2026-10-20',
  },

  // 14. Landing Page Templates
  {
    id: 'prod-14',
    slug: 'zenith-web3-ai-startup-landing-page',
    title: 'Zenith — Web3 & AI Startup Landing Page',
    category: 'Landing Page Templates',
    categorySlug: 'landing-page-templates',
    price: 59.0,
    originalPrice: 110.0,
    discount: 46,
    rating: 5.0,
    reviewCount: 142,
    salesCount: '1.5k',
    featured: true,
    trending: true,
    bestSeller: false,
    isNew: false,
    onSale: true,
    description:
      'Award-worthy tech landing page UI crafted with modern mesh gradients, Bento grid layouts, interactive pricing calculators, and high-conversion hero variants.',
    previewImages: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Figma (.fig)', 'React Components Preview', 'HTML/Tailwind'],
    software: ['Figma', 'VS Code', 'Tailwind CSS'],
    dimensions: '1440px Desktop, Tablet & Mobile Breakpoints',
    license: 'Commercial License',
    whatIncluded: [
      '12 Unique Modular Page Sections',
      'Bento Grid Feature Matrix',
      'Interactive Pricing Tier Switcher UI',
      'Custom 3D Floating Illustrations',
    ],
    features: [
      'Conversion Rate Optimized Wireframe Architecture',
      'Tailwind CSS v4 Utility Friendly',
    ],
    reviews: [
      {
        id: 'rev-15',
        author: 'Amara Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-11-07',
        title: 'Best landing page template on the market',
        comment: 'Looks like an Awwwards Site of the Day. Cleanest Figma file I have purchased this year.',
        helpfulCount: 35,
      },
    ],
    tags: ['Landing Page', 'Web3', 'AI', 'Bento Grid', 'Tailwind'],
    createdAt: '2026-10-01',
  },

  // 15. Marketing Creatives
  {
    id: 'prod-15',
    slug: 'omni-ad-cross-platform-marketing-bundle',
    title: 'OmniAd — Cross-Platform Performance Ad Bundle',
    category: 'Marketing Creatives',
    categorySlug: 'marketing-creatives',
    price: 42.0,
    originalPrice: 79.0,
    discount: 47,
    rating: 4.9,
    reviewCount: 189,
    salesCount: '1.9k',
    featured: true,
    trending: false,
    bestSeller: true,
    isNew: false,
    onSale: true,
    description:
      'Complete omni-channel advertising kit covering Meta Feed, Story ads, Google Display Network banners (300x250, 728x90, 160x600), and high-CTR retargeting banners.',
    previewImages: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
    ],
    fileFormats: ['Photoshop (.psd)', 'Figma', 'Google Web Designer'],
    software: ['Photoshop', 'Figma', 'Illustrator'],
    dimensions: 'All 18 IAB Standard Banner Sizes + 1:1, 9:16 Social Ads',
    license: 'Commercial Ad Campaign License',
    whatIncluded: [
      '18 IAB Display Ad Banner Formats',
      'Meta & TikTok Video Hook Covers',
      'CTA Button Animation Graphics',
      'Direct Photoshop Smart Object Artboards',
    ],
    features: [
      'Sub-150KB File Size Optimization for Google Ads',
      'High Contrast Action Framing',
    ],
    reviews: [
      {
        id: 'rev-16',
        author: 'Stefan Holmgren',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2026-10-14',
        title: 'ROAS increased by 42%',
        comment: 'Replaced our old banners with these and saw an immediate drop in cost per click on GDN.',
        helpfulCount: 29,
      },
    ],
    tags: ['Advertising', 'Marketing', 'Google Ads', 'Meta Ads', 'Banners'],
    createdAt: '2026-09-22',
  },
];

// Helper utility queries
export const getProductBySlug = (slug) => {
  return MARKETPLACE_PRODUCTS.find((p) => p.slug === slug) || null;
};

export const getProductsByCategory = (catSlug) => {
  return MARKETPLACE_PRODUCTS.filter(
    (p) => p.categorySlug.toLowerCase() === catSlug.toLowerCase()
  );
};

export const getFeaturedProducts = (limit = 8) => {
  return MARKETPLACE_PRODUCTS.filter((p) => p.featured).slice(0, limit);
};

export const getTrendingProducts = (limit = 8) => {
  return MARKETPLACE_PRODUCTS.filter((p) => p.trending).slice(0, limit);
};

export const getBestSellers = (limit = 8) => {
  return MARKETPLACE_PRODUCTS.filter((p) => p.bestSeller).slice(0, limit);
};

export const getNewArrivals = (limit = 8) => {
  return MARKETPLACE_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
};

export const getSpecialOffers = (limit = 8) => {
  return MARKETPLACE_PRODUCTS.filter((p) => p.onSale).slice(0, limit);
};

export const getRelatedProducts = (currentProductId, categorySlug, limit = 4) => {
  return MARKETPLACE_PRODUCTS.filter(
    (p) => p.id !== currentProductId && p.categorySlug === categorySlug
  ).slice(0, limit);
};
