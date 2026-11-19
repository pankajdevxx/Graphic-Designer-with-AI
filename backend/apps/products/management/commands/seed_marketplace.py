import json
from decimal import Decimal
from django.core.management.base import BaseCommand
from apps.categories.models import Category
from apps.products.models import (
    Product, ProductImage, ProductFile, Tag, ProductTag, License,
    ProductAttribute, ProductAttributeValue, Collection, CollectionProduct
)
from apps.reviews.models import ProductReview
from apps.promotions.models import Banner, Coupon

PRODUCTS_SEED_DATA = [
    {
        "id_slug": "lumina-minimalist-geometric-logo-system",
        "title": "Lumina — Minimalist Geometric Logo System",
        "category_slug": "logo-design",
        "price": Decimal("39.00"),
        "original_price": Decimal("69.00"),
        "discount": 43,
        "sku": "PXG-LOG-001",
        "rating": Decimal("4.9"),
        "review_count": 94,
        "sales_count": 1420,
        "sales_label": "1.4k",
        "is_featured": True,
        "is_trending": True,
        "is_new": False,
        "description": "A masterfully crafted geometric logo collection comprising 40 golden-ratio icon marks, responsive typography lockups, and inverted dark/light monochrome variants for luxury tech and fintech brands.",
        "short_description": "40 golden-ratio vector logo marks, responsive typography lockups, and luxury monochrome variants.",
        "images": [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["AI (Illustrator)", "EPS Vector", "SVG", "PNG (4K)", "PDF"],
        "software": ["Adobe Illustrator", "Figma", "Affinity Designer"],
        "dimensions": "Scalable Vector (Infinite)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "40 Unique Golden Ratio Vector Marks",
            "Horizontal, Vertical, and Monogram Lockups",
            "Brand Color Formulation Guide (CMYK, RGB, HEX)",
            "Commercial Typography Links & Pairing Matrix",
            "Figma & Illustrator Source Files"
        ],
        "features": [
            "100% Vector & Infinitely Scalable",
            "Editable Live Strokes & Closed Paths",
            "Export Presets for iOS, Android, and Web Favicons",
            "CMYK Print-Ready & RGB Digital Color Spaces"
        ],
        "tags": ["Minimalist", "Geometric", "Branding", "Vector", "Golden Ratio"],
        "reviews": [
            {
                "author": "Liam Vance",
                "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Impeccable geometric balance",
                "comment": "The mathematical precision of these vector marks saved our design team at least 40 hours. Every path is pristine.",
                "helpful": 28,
            }
        ]
    },
    {
        "id_slug": "velox-enterprise-brand-guidelines-stationery",
        "title": "Velox — Enterprise Brand Guidelines & Stationery Suite",
        "category_slug": "brand-identity",
        "price": Decimal("59.00"),
        "original_price": Decimal("99.00"),
        "discount": 40,
        "sku": "PXG-BRD-002",
        "rating": Decimal("5.0"),
        "review_count": 128,
        "sales_count": 2100,
        "sales_label": "2.1k",
        "is_featured": True,
        "is_trending": True,
        "is_new": False,
        "description": "Comprehensive 72-page executive brand identity manual detailing logo construction grids, typography scales, corporate stationery, email signatures, merchandise mockups, and digital asset packaging.",
        "short_description": "72-page executive brand manual with grids, typography scales, and full stationery mockups.",
        "images": [
            "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["AI", "INDD (InDesign)", "Figma", "EPS", "PDF"],
        "software": ["Adobe InDesign", "Adobe Illustrator", "Figma"],
        "dimensions": "A4 & US Letter Landscape (Print-Ready)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "72 Clean Master Page Layouts",
            "Corporate Stationery Package (Letterhead, Envelope, Folder)",
            "Automated Numbering & Character Styles",
            "Comprehensive Print Production Checklist"
        ],
        "features": [
            "Fully Configured Baseline Grids",
            "Separated Swatches for Pantone, CMYK & Hex",
            "Dynamic Table of Contents and Headers",
            "High-DPI Photorealistic Mockup Previews"
        ],
        "tags": ["Brand Guidelines", "Stationery", "Corporate", "Identity", "InDesign"],
        "reviews": [
            {
                "author": "Marcus Sterling",
                "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Agency level polish",
                "comment": "Used this to deliver brand guidelines to a series-A fintech client. The client remarked it looked like Pentagram work.",
                "helpful": 41,
            }
        ]
    },
    {
        "id_slug": "bauhaus-modern-brutalist-poster-collection",
        "title": "Aura — Swiss Brutalist Poster & Exhibition Banner Collection",
        "category_slug": "posters-banners",
        "price": Decimal("34.00"),
        "original_price": Decimal("49.00"),
        "discount": 31,
        "sku": "PXG-POS-003",
        "rating": Decimal("4.8"),
        "review_count": 67,
        "sales_count": 890,
        "sales_label": "890+",
        "is_featured": False,
        "is_trending": True,
        "is_new": True,
        "description": "50 high-impact Swiss typographic and brutalist poster templates with noise displacement maps, duotone overlays, and customizable experimental typography layouts for art exhibitions and club nights.",
        "short_description": "50 Swiss typographic and brutalist posters with noise maps and duotone overlays.",
        "images": [
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["PSD (Smart Objects)", "AI Vector", "TIFF", "High-Res JPEG"],
        "software": ["Adobe Photoshop", "Adobe Illustrator"],
        "dimensions": "A1 & A2 (300 DPI, 7016 x 9933 px)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "50 Layered Photoshop Files with Smart Objects",
            "20 Custom Halftone & Grain Textures",
            "Typography Hierarchy Guide",
            "RGB Digital & CMYK Print Presets"
        ],
        "features": [
            "300 DPI Ultra High Resolution",
            "Independent Grain & Texture Overlays",
            "Modular Grid Alignments",
            "Instant Smart Object Artwork Replacement"
        ],
        "tags": ["Swiss Style", "Brutalist", "Posters", "Exhibition", "Print"],
        "reviews": [
            {
                "author": "Elena Rostova",
                "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Textures are breathtaking",
                "comment": "The tactile depth and noise displacement map layers look stunning both on screen and fresh off the offset press.",
                "helpful": 19,
            }
        ]
    },
    {
        "id_slug": "noir-luxury-instagram-feed-kit",
        "title": "Noir — Luxury Dark Instagram Feed & Reel Covers",
        "category_slug": "instagram-posts",
        "price": Decimal("29.00"),
        "original_price": Decimal("49.00"),
        "discount": 41,
        "sku": "PXG-INS-004",
        "rating": Decimal("4.9"),
        "review_count": 210,
        "sales_count": 3400,
        "sales_label": "3.4k",
        "is_featured": True,
        "is_trending": False,
        "is_new": False,
        "description": "120 aesthetic square templates built for luxury fashion, architecture, and lifestyle creators. Features glassmorphism panels, editorial serif typography, and cohesive color palette presets.",
        "short_description": "120 aesthetic dark luxury square posts with glassmorphism panels and serif typography.",
        "images": [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma", "PSD", "Canva Compatible"],
        "software": ["Figma", "Adobe Photoshop"],
        "dimensions": "1080 x 1080 px (Square Feed) & 1080 x 1350 px (Portrait)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "120 Post Layouts in Figma & PSD",
            "Auto-Layout Components with Figma Variables",
            "Editorial Editorial Font Pairing Guide",
            "Batch Export Presets for WebP & PNG"
        ],
        "features": [
            "Figma Component Library with Variants",
            "Responsive Auto-Layout Frames",
            "Smart Object Media Placeholders in PSD",
            "Optimized for High Engagement & Saves"
        ],
        "tags": ["Instagram", "Social Media", "Luxury", "Figma", "Dark Theme"],
        "reviews": [
            {
                "author": "Chloe Dupont",
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Grew my agency IG to 40k",
                "comment": "Our aesthetic engagement jumped 300% after transitioning our feed to this clean, moody editorial theme.",
                "helpful": 62,
            }
        ]
    },
    {
        "id_slug": "pulse-kinetic-instagram-stories-pack",
        "title": "Pulse — Kinetic Animated Instagram Stories Pack",
        "category_slug": "instagram-stories",
        "price": Decimal("32.00"),
        "original_price": Decimal("55.00"),
        "discount": 42,
        "sku": "PXG-STO-005",
        "rating": Decimal("4.8"),
        "review_count": 76,
        "sales_count": 1100,
        "sales_label": "1.1k",
        "is_featured": False,
        "is_trending": True,
        "is_new": True,
        "description": "60 motion-designed 9:16 vertical story templates with animated transitions, bold kinetic typography, flash sales, countdown stickers, and poll layouts.",
        "short_description": "60 motion-designed vertical story templates with animated kinetic typography.",
        "images": [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma Interactive", "After Effects (.AEP)", "PSD", "MP4 Previews"],
        "software": ["Figma", "Adobe After Effects", "Photoshop"],
        "dimensions": "1080 x 1920 px (9:16 Vertical HD)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "60 Story Layouts with Motion Keyframes",
            "Figma Interactive Prototype Flow",
            "Render Presets for 60fps Vertical MP4",
            "Sound Effect Audio Stems Included"
        ],
        "features": [
            "One-Click Color Scheme Swapping",
            "Modular 5-second to 15-second loops",
            "High-contrast Call-To-Action Stickers",
            "Figma Smart Animate Ready"
        ],
        "tags": ["Stories", "Motion", "Kinetic", "Video", "After Effects"],
        "reviews": [
            {
                "author": "Devin Brooks",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Effortless story animations",
                "comment": "Saved hours of motion design in After Effects. The Figma smart animate versions are exceptionally smooth.",
                "helpful": 15,
            }
        ]
    },
    {
        "id_slug": "synapse-viral-linkedin-instagram-carousels",
        "title": "Synapse — High-Converting Educational Social Carousels",
        "category_slug": "social-carousels",
        "price": Decimal("38.00"),
        "original_price": Decimal("60.00"),
        "discount": 37,
        "sku": "PXG-CAR-006",
        "rating": Decimal("5.0"),
        "review_count": 184,
        "sales_count": 2800,
        "sales_label": "2.8k",
        "is_featured": True,
        "is_trending": True,
        "is_new": False,
        "description": "30 seamless multi-slide carousel frameworks (300 total slides) designed to maximize save rates and dwell time across LinkedIn and Instagram. Includes frameworks for case studies, frameworks, teardowns, and step-by-step tutorials.",
        "short_description": "30 seamless multi-slide carousel frameworks with 300 total slide designs.",
        "images": [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma", "PSD", "PDF Multi-page"],
        "software": ["Figma", "Photoshop"],
        "dimensions": "1080 x 1350 px (Portrait 4:5 Carousel)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "30 Unique Carousel Themes (10 slides each = 300 slides)",
            "Seamless Panoramic Split-image Guides",
            "Swipe Arrow Micro-animations & Badges",
            "LinkedIn PDF Document Export Settings"
        ],
        "features": [
            "Edge-to-Edge Continuous Background Flows",
            "Optimized for High Virality & Bookmark Rates",
            "Figma Component Properties for Rapid Content Swaps",
            "Ready-made Layouts for Infographics & Charts"
        ],
        "tags": ["Carousels", "LinkedIn", "Instagram", "Educational", "Engagement"],
        "reviews": [
            {
                "author": "Kavita Rao",
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Went viral on LinkedIn twice",
                "comment": "The seamless pan effect from slide to slide keeps people swiping to the end. My post impressions tripled.",
                "helpful": 53,
            }
        ]
    },
    {
        "id_slug": "apex-high-ctr-youtube-thumbnail-suite",
        "title": "Apex — High-CTR Gaming & Tech YouTube Thumbnail Suite",
        "category_slug": "youtube-thumbnails",
        "price": Decimal("25.00"),
        "original_price": Decimal("45.00"),
        "discount": 44,
        "sku": "PXG-YTT-007",
        "rating": Decimal("4.9"),
        "review_count": 340,
        "sales_count": 5200,
        "sales_label": "5.2k",
        "is_featured": True,
        "is_trending": True,
        "is_new": False,
        "description": "80 bold YouTube thumbnail templates engineered for 12%+ CTR. Includes 3D lighting effect actions, neon glow accents, expression cut-out styles, and ultra-readable high-contrast typography.",
        "short_description": "80 bold YouTube thumbnail templates engineered for 12%+ click-through rates.",
        "images": [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["PSD (Layered)", "Figma", "PNG Assets"],
        "software": ["Adobe Photoshop", "Figma"],
        "dimensions": "1280 x 720 px (HD YouTube Standard, 16:9)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "80 Fully Layered Photoshop PSDs",
            "100+ Custom Lighting, Arrow & Emoji Overlays",
            "Photoshop Neon & Rim Light Action Presets",
            "Complete Free Commercial Font Library Links"
        ],
        "features": [
            "Mobile Feed Preview Testing Matrix",
            "Smart Object Face Cutout Layering",
            "Color Graded Background Textures",
            "Calibrated Contrast Ratios for Dark & Light YouTube Themes"
        ],
        "tags": ["YouTube", "Thumbnails", "Gaming", "Tech", "High CTR"],
        "reviews": [
            {
                "author": "Tyler Sparks",
                "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Instant CTR jump from 4.2% to 11.8%",
                "comment": "Changed all our channel thumbnails to Apex layouts. The contrast makes them pop on mobile feeds instantly.",
                "helpful": 88,
            }
        ]
    },
    {
        "id_slug": "strata-responsive-youtube-channel-banners",
        "title": "Strata — Multi-Device 4K YouTube Channel Banners",
        "category_slug": "youtube-banners",
        "price": Decimal("24.00"),
        "original_price": Decimal("39.00"),
        "discount": 38,
        "sku": "PXG-YTB-008",
        "rating": Decimal("4.8"),
        "review_count": 52,
        "sales_count": 780,
        "sales_label": "780+",
        "is_featured": False,
        "is_trending": False,
        "is_new": True,
        "description": "40 responsive 4K YouTube channel banners with safety margin guides for desktop, tablet, mobile, and TV displays. Perfectly positioned text and avatar areas.",
        "short_description": "40 responsive 4K YouTube channel banners with multi-device safety margin guides.",
        "images": [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["PSD", "AI", "Figma", "PNG"],
        "software": ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
        "dimensions": "2560 x 1440 px (4K Multi-device safe zone)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "40 Channel Banners with Guide Overlays",
            "Matching Profile Avatar Templates",
            "Dark Theme & Gaming Cyberpunk Styles",
            "Schedule & Social Handle Lockups"
        ],
        "features": [
            "Safe Zone Outlines Visible via Layer Toggles",
            "Ultra HD 4K Canvas Resolution",
            "Organized Group Folders by Element Type",
            "Easily Replaceable Gradient Maps"
        ],
        "tags": ["YouTube Banner", "Channel Art", "Banner", "4K", "Social"],
        "reviews": [
            {
                "author": "Jordan Reed",
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Fits TV, Desktop, and Mobile cleanly",
                "comment": "No more guesswork on what gets cropped out on iPhone screens. The safe zone guides are foolproof.",
                "helpful": 14,
            }
        ]
    },
    {
        "id_slug": "matrix-holographic-luxury-business-cards",
        "title": "Aether — Luxury Foil & Holographic Business Card Templates",
        "category_slug": "business-cards",
        "price": Decimal("22.00"),
        "original_price": Decimal("35.00"),
        "discount": 37,
        "sku": "PXG-CRD-009",
        "rating": Decimal("4.9"),
        "review_count": 89,
        "sales_count": 1300,
        "sales_label": "1.3k",
        "is_featured": False,
        "is_trending": True,
        "is_new": False,
        "description": "35 modern minimalist and foil-stamped business card templates. Features spot UV masks, blind deboss layers, QR code badge placements, and print-ready bleeds.",
        "short_description": "35 foil-stamped and minimalist business cards with spot UV and print bleeds.",
        "images": [
            "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["AI Vector", "PSD", "EPS", "Print PDF"],
        "software": ["Adobe Illustrator", "Photoshop"],
        "dimensions": "3.5 x 2.0 inches (with 0.125 in bleed, 300 DPI CMYK)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "35 Double-Sided Business Card Layouts",
            "Dedicated Spot UV and Foil Mask Artboards",
            "Vector Social & Contact Icon Set",
            "Moo & Vistaprint Print Profile Specs"
        ],
        "features": [
            "300 DPI CMYK Offset Print Standards",
            "Editable Live Text & Vector Badges",
            "Front & Back Aligned Artboards",
            "Foil & Emboss Simulation Mockups"
        ],
        "tags": ["Business Cards", "Print", "Luxury", "Foil", "Branding"],
        "reviews": [
            {
                "author": "Sebastian Grey",
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Print shop approved with zero friction",
                "comment": "Bleeds and foil separation layers were set up flawlessly. Our printer was impressed by the file organization.",
                "helpful": 24,
            }
        ]
    },
    {
        "id_slug": "vanguard-executive-ats-resume-cv-kit",
        "title": "Vanguard — Executive ATS-Friendly Resume & Portfolio Kit",
        "category_slug": "resume-templates",
        "price": Decimal("28.00"),
        "original_price": Decimal("45.00"),
        "discount": 38,
        "sku": "PXG-RES-010",
        "rating": Decimal("5.0"),
        "review_count": 142,
        "sales_count": 2200,
        "sales_label": "2.2k",
        "is_featured": True,
        "is_trending": False,
        "is_new": False,
        "description": "Clean, sophisticated 2-page executive resume, cover letter, and mini-portfolio templates. Formatted specifically to pass Applicant Tracking Systems (ATS) while captivating human design leaders.",
        "short_description": "Clean executive 2-page resume and cover letter designed for 100% ATS pass rates.",
        "images": [
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1586282375836-e8d197609a69?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma", "AI", "DOCX (Word)", "PDF"],
        "software": ["Figma", "Microsoft Word", "Adobe Illustrator"],
        "dimensions": "US Letter & A4 Formats",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "1-Page, 2-Page, and 3-Page Resume Formats",
            "Matching Cover Letter & Reference Page",
            "Portfolio Project Summary Sheet",
            "Action Verb Word Bank & Interview Guide"
        ],
        "features": [
            "Tested on Greenhouse, Lever, and Workday ATS Parsers",
            "Single Column & Modular Two-Column Layouts",
            "Easily Editable Word & Figma Styles",
            "Free Commercial Typography Hierarchy"
        ],
        "tags": ["Resume", "CV", "ATS Friendly", "Career", "Portfolio"],
        "reviews": [
            {
                "author": "Nadia Al-Mansoor",
                "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Landed Senior Product Designer offer",
                "comment": "Passed every automated ATS scanner and looked gorgeous in the final director interview. Worth 100x the price.",
                "helpful": 49,
            }
        ]
    },
    {
        "id_slug": "quantum-investor-pitch-deck-presentation",
        "title": "Quantum — Series A/B Investor Pitch Deck & Keynote",
        "category_slug": "presentation-designs",
        "price": Decimal("65.00"),
        "original_price": Decimal("110.00"),
        "discount": 41,
        "sku": "PXG-PRE-011",
        "rating": Decimal("4.9"),
        "review_count": 165,
        "sales_count": 1900,
        "sales_label": "1.9k",
        "is_featured": True,
        "is_trending": True,
        "is_new": False,
        "description": "150 cinematic master slides engineered for venture capital fundraising. Includes dynamic financial projections, TAM/SAM/SOM market sizing charts, product roadmap timelines, and competitive quadrant frameworks.",
        "short_description": "150 cinematic pitch deck slides for venture capital fundraising and Keynotes.",
        "images": [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma", "PPTX (PowerPoint)", "KEY (Apple Keynote)"],
        "software": ["Figma", "Microsoft PowerPoint", "Apple Keynote"],
        "dimensions": "16:9 Widescreen Full HD (1920 x 1080 px)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "150 Unique Master Slides in Light & Dark Mode",
            "50+ Vector Infographic & Market Sizing Components",
            "Interactive Financial Table Models",
            "Icon Library (400+ Vector Tech & Business Icons)"
        ],
        "features": [
            "Non-Distracting Venture-Grade Typography",
            "Animated Slide Transition Templates",
            "Drag & Drop Mockup Artboards",
            "Custom Theme Color Tokens in Figma & PowerPoint"
        ],
        "tags": ["Pitch Deck", "Presentation", "Keynote", "PowerPoint", "Startup"],
        "reviews": [
            {
                "author": "Dr. Aris Thorne",
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Closed $4.5M seed round",
                "comment": "Investors commented multiple times on the clarity of our TAM/SAM slides. Cleanest presentation kit available.",
                "helpful": 77,
            }
        ]
    },
    {
        "id_slug": "nexus-saas-web3-dashboard-ui-kit",
        "title": "Nexus — Dark Glassmorphic SaaS & Web3 Design System",
        "category_slug": "website-ui-kits",
        "price": Decimal("79.00"),
        "original_price": Decimal("129.00"),
        "discount": 39,
        "sku": "PXG-WEB-012",
        "rating": Decimal("5.0"),
        "review_count": 312,
        "sales_count": 4800,
        "sales_label": "4.8k",
        "is_featured": True,
        "is_trending": True,
        "is_new": False,
        "description": "Massive enterprise UI design system containing 250+ responsive components, tokenized variables, analytics dashboards, crypto wallet integrations, and high-converting billing flows in Figma.",
        "short_description": "Massive enterprise UI kit with 250+ responsive components, tokens, and dark dashboards.",
        "images": [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma (.FIG)", "Component Library Tokens JSON"],
        "software": ["Figma"],
        "dimensions": "Responsive Desktop (1440px Grid) & Mobile (390px)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "250+ Fully Tokenized UI Components",
            "40 Pre-Built Dashboard & Analytics Screens",
            "Figma Variables for Dark, Light & Midnight Themes",
            "Interactive Clickable Prototype Flows"
        ],
        "features": [
            "100% Auto-Layout 5.0 with Min/Max Dimensions",
            "WCAG AAA Accessible Color Contrast Ratios",
            "Design Tokens Synced to Tailwind CSS Format",
            "Component Properties (Booleans, Swaps, Text Inputs)"
        ],
        "tags": ["UI Kit", "Dashboard", "SaaS", "Figma", "Design System"],
        "reviews": [
            {
                "author": "Rohan Deshmukh",
                "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Built entire SaaS frontend in 1 week",
                "comment": "The Tailwind token mapping made turning these Figma screens into React components completely effortless.",
                "helpful": 95,
            }
        ]
    },
    {
        "id_slug": "zenith-ios-android-mobile-app-design-system",
        "title": "Zenith — Fintech & E-Commerce Mobile App UI System",
        "category_slug": "mobile-app-ui",
        "price": Decimal("69.00"),
        "original_price": Decimal("119.00"),
        "discount": 42,
        "sku": "PXG-APP-013",
        "rating": Decimal("4.9"),
        "review_count": 198,
        "sales_count": 2600,
        "sales_label": "2.6k",
        "is_featured": True,
        "is_trending": True,
        "is_new": False,
        "description": "320+ mobile screens across banking, investments, crypto wallets, and social commerce flows. Conforms to Apple Human Interface Guidelines and Google Material Design 3.",
        "short_description": "320+ mobile screens across banking, investments, and social commerce flows.",
        "images": [
            "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma Source", "Prototype File"],
        "software": ["Figma"],
        "dimensions": "iOS (393 x 852 px) & Android (360 x 800 px)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "320 Mobile Screen Artboards",
            "Component Library with 180+ Variants",
            "Clickable Navigation Micro-interaction Flows",
            "Custom Icon Set (300+ 24px Mobile Icons)"
        ],
        "features": [
            "Dynamic Island & Android Status Bar Presets",
            "Interactive Gesture & Sheet Transitions",
            "Dark Theme & High Contrast Mode",
            "Organized Design Tokens for React Native & Flutter"
        ],
        "tags": ["Mobile App", "iOS", "Android", "Fintech", "Figma"],
        "reviews": [
            {
                "author": "Alina Becker",
                "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Shipped mobile app to App Store",
                "comment": "Every screen state (empty, loading, error, success) was thought out. Saved us months of mobile UI design work.",
                "helpful": 57,
            }
        ]
    },
    {
        "id_slug": "hyperion-high-converting-saas-landing-pages",
        "title": "Hyperion — High-Converting SaaS & Agency Landing Pages",
        "category_slug": "landing-page-templates",
        "price": Decimal("54.00"),
        "original_price": Decimal("89.00"),
        "discount": 39,
        "sku": "PXG-LND-014",
        "rating": Decimal("4.9"),
        "review_count": 145,
        "sales_count": 2100,
        "sales_label": "2.1k",
        "is_featured": True,
        "is_trending": False,
        "is_new": True,
        "description": "12 high-converting landing page layouts built for AI tools, devtech, developer APIs, and creative agencies. Includes hero variants, social proof walls, pricing tables, and interactive FAQ sections.",
        "short_description": "12 high-converting landing pages for AI, devtools, and modern creative agencies.",
        "images": [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["Figma", "HTML5/Tailwind Preview"],
        "software": ["Figma"],
        "dimensions": "Desktop (1440 px), Tablet (834 px), Mobile (390 px)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "12 Complete Page Layouts in 3 Viewport Breakpoints",
            "Conversion-Tested Pricing Comparison Tables",
            "Interactive Testimonial Carousel Blocks",
            "3D Floating Element Graphics Included"
        ],
        "features": [
            "Tailwind CSS Grid Alignment",
            "Fully Responsive Auto-Layout Containers",
            "Clean Semantic Typography Hierarchy",
            "Engineered for Sub-second Bounce Minimization"
        ],
        "tags": ["Landing Page", "SaaS", "Conversion", "Figma", "Tailwind"],
        "reviews": [
            {
                "author": "Henrik Lindqvist",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "Conversion rate jumped from 2.1% to 5.4%",
                "comment": "The social proof section and clear visual hierarchy made an immediate difference on our Google Ads landing page.",
                "helpful": 38,
            }
        ]
    },
    {
        "id_slug": "omni-omnichannel-digital-advertising-bundle",
        "title": "Omni — Cross-Platform Digital Ad Banners & Performance Creatives",
        "category_slug": "marketing-creatives",
        "price": Decimal("45.00"),
        "original_price": Decimal("75.00"),
        "discount": 40,
        "sku": "PXG-MKT-015",
        "rating": Decimal("4.8"),
        "review_count": 112,
        "sales_count": 1800,
        "sales_label": "1.8k",
        "is_featured": False,
        "is_trending": True,
        "is_new": False,
        "description": "Complete omnichannel performance marketing creative kit containing 24 standard IAB ad dimensions for Google Display Network, Meta Ads (Feed & Story), Twitter/X, and TikTok.",
        "short_description": "24 standard IAB ad banner sizes for Google Ads, Meta, and social display campaigns.",
        "images": [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
        ],
        "file_formats": ["PSD (Smart Objects)", "Figma", "HTML5 Animated Banners"],
        "software": ["Adobe Photoshop", "Figma"],
        "dimensions": "24 Standard Sizes (300x250, 728x90, 160x600, 1080x1080, etc.)",
        "license_type": "Standard Commercial License included",
        "what_included": [
            "24 Standard IAB Banner Artboards",
            "Batch Export Action Presets in Photoshop",
            "Click-Optimized CTA Button Styles",
            "Google Ads File Size Optimization Guide (<150KB)"
        ],
        "features": [
            "Smart Object Global Asset Updating",
            "Pre-compressed for Google Display Under 150KB",
            "Layered PSDs with Master Shape Layers",
            "High Contrast Visibility Tested on All Display Types"
        ],
        "tags": ["Advertising", "Marketing", "Google Ads", "Meta Ads", "Banners"],
        "reviews": [
            {
                "author": "Stefan Holmgren",
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
                "rating": 5,
                "title": "ROAS increased by 42%",
                "comment": "Replaced our old banners with these and saw an immediate drop in cost per click on GDN.",
                "helpful": 29,
            }
        ]
    }
]

class Command(BaseCommand):
    help = "Seeds demonstration marketplace products, licenses, promotions, and reviews in MySQL."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding marketplace foundational data in MySQL..."))

        # 1. Licenses
        lic_std, _ = License.objects.update_or_create(
            slug="standard",
            defaults={
                "name": "Standard Commercial License",
                "price_multiplier": Decimal("1.0"),
                "description": "Standard commercial rights for 1 client project or single end-product.",
                "terms": "Non-exclusive, perpetual rights. Redistribution prohibited.",
                "is_active": True,
            }
        )
        lic_ext, _ = License.objects.update_or_create(
            slug="extended",
            defaults={
                "name": "Extended Commercial License",
                "price_multiplier": Decimal("2.5"),
                "description": "Unlimited commercial client projects and end-product distribution/resale.",
                "terms": "Worldwide unlimited commercial use with indemnification.",
                "is_active": True,
            }
        )

        # 2. Promotional Coupons
        Coupon.objects.update_or_create(
            code="PIXEL20",
            defaults={
                "discount_percent": 20,
                "description": "Special 20% discount on all digital design templates",
                "is_active": True,
            }
        )
        Coupon.objects.update_or_create(
            code="CREATOR10",
            defaults={
                "discount_percent": 10,
                "description": "Creator welcome discount: 10% off",
                "is_active": True,
            }
        )

        # 3. Promotional Banner
        Banner.objects.update_or_create(
            title="Design Your Vision. Create Without Limits.",
            defaults={
                "subtitle": "Get instant access to curated vector systems, UI kits, and branding templates.",
                "badge": "Special Marketplace Launch Offer",
                "coupon_code": "PIXEL20",
                "discount_text": "20% OFF",
                "link_url": "/marketplace/products",
                "is_active": True,
                "sort_order": 1,
            }
        )

        # 4. Products, Images, Tags & Reviews
        products_created = 0
        products_updated = 0

        for item in PRODUCTS_SEED_DATA:
            category = Category.objects.filter(slug=item["category_slug"]).first()
            if not category:
                self.stdout.write(self.style.WARNING(f"Category slug {item['category_slug']} not found, skipping."))
                continue

            product, created = Product.objects.update_or_create(
                slug=item["id_slug"],
                defaults={
                    "title": item["title"],
                    "category": category,
                    "price": item["price"],
                    "original_price": item["original_price"],
                    "discount": item["discount"],
                    "sku": item["sku"],
                    "status": "active",
                    "is_featured": item["is_featured"],
                    "is_trending": item["is_trending"],
                    "is_new": item["is_new"],
                    "description": item["description"],
                    "short_description": item["short_description"],
                    "file_formats": item["file_formats"],
                    "software_compatibility": item["software"],
                    "dimensions": item["dimensions"],
                    "license_type": item["license_type"],
                    "what_included": item["what_included"],
                    "features": item["features"],
                    "sales_count": item["sales_count"],
                    "sales_label": item["sales_label"],
                    "average_rating": item["rating"],
                    "review_count": item["review_count"],
                }
            )

            if created:
                products_created += 1
            else:
                products_updated += 1

            # Images
            ProductImage.objects.filter(product=product).delete()
            for idx, img_url in enumerate(item["images"]):
                ProductImage.objects.create(
                    product=product,
                    image_url=img_url,
                    alt_text=f"{product.title} Preview {idx + 1}",
                    is_primary=(idx == 0),
                    sort_order=idx + 1
                )

            # Tags
            for tag_name in item["tags"]:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                ProductTag.objects.get_or_create(product=product, tag=tag)

            # Reviews
            ProductReview.objects.filter(product=product).delete()
            for rev in item["reviews"]:
                ProductReview.objects.create(
                    product=product,
                    author_name=rev["author"],
                    avatar_url=rev["avatar"],
                    rating=rev["rating"],
                    title=rev["title"],
                    comment=rev["comment"],
                    is_verified_buyer=True,
                    is_approved=True,
                    helpful_count=rev["helpful"]
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Marketplace data seeded successfully: {products_created} products created, {products_updated} updated. Total products in MySQL: {Product.objects.count()}."
            )
        )
