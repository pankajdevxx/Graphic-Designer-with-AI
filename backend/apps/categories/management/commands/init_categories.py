from django.core.management.base import BaseCommand
from apps.categories.models import Category

CATEGORIES_DATA = [
    {
        "id": 1,
        "name": "Logo Design",
        "slug": "logo-design",
        "description": "Iconic minimal, 3D, mascot, and wordmark vector logos engineered for modern brand authority.",
        "badge": "Popular",
        "icon_name": "Sparkles",
        "accent_color": "#a855f7",
        "sort_order": 1,
    },
    {
        "id": 2,
        "name": "Brand Identity",
        "slug": "brand-identity",
        "description": "Complete brand guidelines, typography systems, color palettes, and corporate stationery suites.",
        "badge": "Premium",
        "icon_name": "Compass",
        "accent_color": "#8b5cf6",
        "sort_order": 2,
    },
    {
        "id": 3,
        "name": "Posters & Banners",
        "slug": "posters-banners",
        "description": "High-impact promotional posters, festival print designs, and digital advertising banners.",
        "badge": "Trending",
        "icon_name": "Palette",
        "accent_color": "#d946ef",
        "sort_order": 3,
    },
    {
        "id": 4,
        "name": "Instagram Posts",
        "slug": "instagram-posts",
        "description": "Aesthetic, engagement-driven feed square templates crafted for creators and e-commerce brands.",
        "badge": "Hot",
        "icon_name": "Camera",
        "accent_color": "#ec4899",
        "sort_order": 4,
    },
    {
        "id": 5,
        "name": "Instagram Stories",
        "slug": "instagram-stories",
        "description": "Dynamic 9:16 vertical story layouts with bold typography, interactive callouts, and clean motion styling.",
        "badge": "Popular",
        "icon_name": "Flame",
        "accent_color": "#f43f5e",
        "sort_order": 5,
    },
    {
        "id": 6,
        "name": "Social Media Carousels",
        "slug": "social-carousels",
        "description": "Multi-slide narrative carousels for LinkedIn and Instagram that boost saves, shares, and watch time.",
        "badge": "High CTR",
        "icon_name": "Layers",
        "accent_color": "#f59e0b",
        "sort_order": 6,
    },
    {
        "id": 7,
        "name": "YouTube Thumbnails",
        "slug": "youtube-thumbnails",
        "description": "Click-optimized 1280x720 thumbnails with expressive face cutouts and high-contrast typography.",
        "badge": "Top Seller",
        "icon_name": "Video",
        "accent_color": "#ef4444",
        "sort_order": 7,
    },
    {
        "id": 8,
        "name": "YouTube Channel Banners",
        "slug": "youtube-banners",
        "description": "Multi-device responsive channel art banners tailored for gaming, tech, podcasts, and lifestyle creators.",
        "badge": "4K Ready",
        "icon_name": "Monitor",
        "accent_color": "#6366f1",
        "sort_order": 8,
    },
    {
        "id": 9,
        "name": "Business Cards",
        "slug": "business-cards",
        "description": "Luxury embossed, minimal foil, and digital NFC business card vector templates.",
        "badge": "Print Ready",
        "icon_name": "CreditCard",
        "accent_color": "#10b981",
        "sort_order": 9,
    },
    {
        "id": 10,
        "name": "Resume Templates",
        "slug": "resume-templates",
        "description": "ATS-friendly modern CV and executive resume templates formatted for maximum recruiter visibility.",
        "badge": "Career",
        "icon_name": "FileText",
        "accent_color": "#3b82f6",
        "sort_order": 10,
    },
    {
        "id": 11,
        "name": "Presentation Designs",
        "slug": "presentation-designs",
        "description": "Investor pitch deck slides, Keynote, and PowerPoint templates with cinematic infographics.",
        "badge": "Decks",
        "icon_name": "Presentation",
        "accent_color": "#c084fc",
        "sort_order": 11,
    },
    {
        "id": 12,
        "name": "Website UI Kits",
        "slug": "website-ui-kits",
        "description": "Figma and React design systems loaded with component libraries, wireframes, and dark/light modes.",
        "badge": "Featured",
        "icon_name": "Layout",
        "accent_color": "#06b6d4",
        "sort_order": 12,
    },
    {
        "id": 13,
        "name": "Mobile App UI",
        "slug": "mobile-app-ui",
        "description": "iOS and Android application UI kits featuring 60+ responsive screens, flow charts, and interactive components.",
        "badge": "Pro Kit",
        "icon_name": "Smartphone",
        "accent_color": "#14b8a6",
        "sort_order": 13,
    },
    {
        "id": 14,
        "name": "Landing Page Templates",
        "slug": "landing-page-templates",
        "description": "High-converting SaaS, fintech, agency, and Web3 landing page UI designs built for high conversion.",
        "badge": "High Conversion",
        "icon_name": "Globe",
        "accent_color": "#8b5cf6",
        "sort_order": 14,
    },
    {
        "id": 15,
        "name": "Marketing Creatives",
        "slug": "marketing-creatives",
        "description": "Complete cross-platform digital ad bundles covering Google Ads, Meta Ads, and display networks.",
        "badge": "Ad Bundle",
        "icon_name": "Megaphone",
        "accent_color": "#d946ef",
        "sort_order": 15,
    },
]

class Command(BaseCommand):
    help = "Idempotently initializes all 15 core PixelGenCreativity design categories in MySQL."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Initializing 15 design categories in MySQL..."))
        created_count = 0
        updated_count = 0

        for item in CATEGORIES_DATA:
            category, created = Category.objects.update_or_create(
                slug=item["slug"],
                defaults={
                    "name": item["name"],
                    "description": item["description"],
                    "badge": item["badge"],
                    "icon_name": item["icon_name"],
                    "accent_color": item["accent_color"],
                    "sort_order": item["sort_order"],
                    "is_active": True,
                }
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully initialized categories: {created_count} created, {updated_count} updated. Total active: {Category.objects.count()}."
            )
        )
