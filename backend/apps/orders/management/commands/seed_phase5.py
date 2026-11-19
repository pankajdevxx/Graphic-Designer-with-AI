from decimal import Decimal
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.users.models import UserProfile
from apps.products.models import Product
from apps.orders.models import Order, OrderItem, Payment, CustomDesignRequest, generate_order_number, generate_license_key
from apps.content.models import BlogPost, ContactInquiry, NewsletterSubscriber, Notification


class Command(BaseCommand):
    help = 'Seeds Phase 5 data: admin user, demo creator, blog posts, sample orders, and notifications.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Starting Phase 5 data seeding...'))

        # 1. Admin User
        admin_user, created = User.objects.get_or_create(username='admin', defaults={
            'email': 'admin@pixelgencreativity.com',
            'first_name': 'PixelGen',
            'last_name': 'Administrator',
            'is_staff': True,
            'is_superuser': True,
        })
        admin_user.set_password('Admin@12345')
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()

        profile, _ = UserProfile.objects.get_or_create(user=admin_user)
        profile.role = 'admin'
        profile.company = 'PixelGen Creativity Inc.'
        profile.phone = '+1 (555) 019-2834'
        profile.save()
        self.stdout.write(self.style.SUCCESS(f"Admin user verified: {admin_user.username}"))

        # 2. Demo Customer User
        demo_user, created = User.objects.get_or_create(username='demo_creator', defaults={
            'email': 'alex@pixelgencreativity.com',
            'first_name': 'Alex',
            'last_name': 'Vance',
        })
        demo_user.set_password('Creator@12345')
        demo_user.save()

        user_profile, _ = UserProfile.objects.get_or_create(user=demo_user)
        user_profile.role = 'customer'
        user_profile.company = 'Vance Visuals Studio'
        user_profile.phone = '+91 98765 43210'
        user_profile.city = 'Bengaluru'
        user_profile.country = 'India'
        user_profile.bio = 'Senior Brand Identity Director & Motion Designer crafting next-generation digital experiences.'
        user_profile.avatar_url = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        user_profile.save()
        self.stdout.write(self.style.SUCCESS(f"Demo user verified: {demo_user.username}"))

        # 3. Blog Posts
        blog_articles = [
            {
                'title': 'The Rise of Hyper-Glassmorphism and Spatial UI in 2026',
                'slug': 'rise-of-hyper-glassmorphism-spatial-ui-2026',
                'excerpt': 'How frosted glass textures, specular reflections, and multi-layered depth cues are reshaping international digital design aesthetics.',
                'category': 'UI/UX Design',
                'author_name': 'Elena Rostova',
                'read_time_minutes': 6,
                'featured_image_url': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                'content': """# The Rise of Hyper-Glassmorphism and Spatial UI in 2026

Modern interfaces are rapidly shedding flat, sterile surfaces in favor of translucent, light-reactive spatial planes. Hyper-glassmorphism blends high-blur background filters (`backdrop-filter: blur(24px)`), directional rim glows, and sub-pixel noise to create an immersive, tactile sense of material reality.

### 1. Specular Highlights & Light Interaction
Unlike early skeumorphism, spatial glass relies on ambient illumination vectors. Buttons and card borders reflect light based on cursor position or scroll dynamics.

### 2. High-Performance WebGL and CSS Pipelines
With modern browsers optimizing GPU composite layers, complex CSS backdrop filters now render fluidly at 120 FPS across desktop and high-refresh mobile displays.

### 3. Visual Ergonomics
The key to longevity in dark-mode glass design is tonal contrast: pairing ultra-dark void purples (`#05020c`) with vibrant violet highlights (`#8b5cf6`) ensures effortless readability and eye comfort during long design sessions.""",
            },
            {
                'title': 'Next-Gen Vector Workflows: Scaling Precision Across Multi-Platform Brands',
                'slug': 'next-gen-vector-workflows-scaling-precision',
                'excerpt': 'A technical deep-dive into scalable SVG icon systems, Figma auto-layout tokenization, and multi-resolution typography engines.',
                'category': 'Branding Systems',
                'author_name': 'Marcus Thorne',
                'read_time_minutes': 8,
                'featured_image_url': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
                'content': """# Next-Gen Vector Workflows: Scaling Precision Across Multi-Platform Brands

Design teams today don't just deliver static vector files; they build living, tokenized design systems that translate seamlessly into production code.

### The Unified SVG Architecture
By structuring vector assets with strict geometric grids (24px, 48px, 64px) and CSS variables for stroke and fill, creative agencies can deploy one vector source that powers web, native mobile apps, and 4K print billboards without fidelity loss.

### Integrating Generative Vector Assist
AI-augmented vector tools enable designers to explore 50 variations of a brand symbol in minutes, while maintaining clean Bézier curves and zero redundant anchor points.""",
            },
            {
                'title': 'Building Modern Dark-Themed Marketplaces with Razorpay and Django',
                'slug': 'building-modern-dark-marketplaces-razorpay-django',
                'excerpt': 'Architectural best practices for instant digital deliveries, cryptographic signature validation, and frictionless guest checkouts.',
                'category': 'Engineering & Growth',
                'author_name': 'Arjun Mehta',
                'read_time_minutes': 5,
                'featured_image_url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
                'content': """# Building Modern Dark-Themed Marketplaces with Razorpay and Django

Selling digital assets requires absolute zero latency between the payment confirmation and the asset download link generation.

### Cryptographic Signature Verification
Never trust client-side success callbacks alone. In PixelGenCreativity, the backend recreates the HMAC-SHA256 signature using `order_id|payment_id` and the secret key, ensuring total security before issuing the `LIC-2026` license key.

### Ephemeral Download Keys & Protection
By binding download keys to specific paid order items and tracking IP/User-Agent download quotas, creative marketplaces protect artists' intellectual property while providing instant delivery to verified buyers.""",
            },
            {
                'title': 'Mastering Social Media Kit Typography for Viral Engagement',
                'slug': 'mastering-social-media-kit-typography',
                'excerpt': 'Why kinetic typographic hierarchies and bold display sans-serifs dominate modern Instagram and YouTube creative direction.',
                'category': 'Social Media Creatives',
                'author_name': 'Siddharth Rao',
                'read_time_minutes': 4,
                'featured_image_url': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
                'content': """# Mastering Social Media Kit Typography for Viral Engagement

In a fast-scrolling feed, a viewer decides in 200 milliseconds whether to stop or swipe past. Bold, Swiss-inspired typographic treatments paired with subtle motion generate up to 3x higher retention.

### High-Contrast Scale Ratios
We recommend a minimum 3:1 typographic contrast ratio between headline display fonts (80pt+) and body copy (24pt), accented with neon gradients or frosted backplate pills.""",
            },
        ]

        for art in blog_articles:
            post, _ = BlogPost.objects.update_or_create(slug=art['slug'], defaults=art)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(blog_articles)} blog articles."))

        # 4. Custom Design Requests
        custom_requests = [
            {
                'name': 'Sophia Chen',
                'email': 'sophia@lumina.ai',
                'phone': '+1 (415) 890-1234',
                'company': 'Lumina AI',
                'service_category': 'UI/UX & Web Design',
                'budget_range': '$3,000 - $5,000',
                'timeline': 'Urgent (1-2 Weeks)',
                'title': 'Complete Rebrand & SaaS Dashboard Interface Redesign',
                'description': 'We need a complete brand identity revamp and a dark-mode spatial glass dashboard design for our GPU-accelerated video intelligence platform.',
                'status': 'reviewing',
            },
            {
                'name': 'Rahul Sharma',
                'email': 'rahul@finpulse.io',
                'phone': '+91 98112 33445',
                'company': 'FinPulse Pay',
                'service_category': 'Custom Logo & Branding',
                'budget_range': '$1,000 - $3,000',
                'timeline': 'Standard (2-3 Weeks)',
                'title': 'Fintech Mobile App Visual Identity & 3D Iconography',
                'description': 'Looking for an electric purple and emerald brand mark with 25 custom 3D isometric financial icons in vector and rendered format.',
                'status': 'quoted',
                'quoted_amount': Decimal('2450.00'),
            },
            {
                'name': 'Liam O’Connor',
                'email': 'liam@hypewave.agency',
                'phone': '+44 20 7946 0912',
                'company': 'HypeWave Creative Agency',
                'service_category': 'Social Media & Motion Kit',
                'budget_range': '$500 - $1,000',
                'timeline': 'Standard (1-2 Weeks)',
                'title': 'Omnichannel YouTube Thumbnail & Banner Template Suite',
                'description': 'We require 30 editable Figma templates for YouTube thumbnails with click-through rate optimization and bold typography.',
                'status': 'new',
            },
        ]

        for cr in custom_requests:
            CustomDesignRequest.objects.get_or_create(email=cr['email'], title=cr['title'], defaults=cr)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(custom_requests)} custom design requests."))

        # 5. Sample Paid Orders for demo_creator
        products = list(Product.objects.filter(status='active')[:4])
        if len(products) >= 2:
            p1 = products[0]
            p2 = products[1]

            sample_orders = [
                {
                    'order_number': 'ORD-20261119-98A1',
                    'user': demo_user,
                    'customer_name': 'Alex Vance',
                    'customer_email': 'alex@pixelgencreativity.com',
                    'customer_phone': '+91 98765 43210',
                    'billing_address': '42 Innovation Parkway, Indiranagar',
                    'city': 'Bengaluru',
                    'country': 'India',
                    'postal_code': '560038',
                    'status': 'paid',
                    'payment_status': 'paid',
                    'payment_method': 'razorpay',
                    'subtotal': p1.price + p2.price,
                    'discount_amount': Decimal('10.00'),
                    'total_amount': p1.price + p2.price - Decimal('10.00'),
                    'currency': 'INR',
                    'razorpay_order_id': 'order_rzp_mock_98a1',
                    'razorpay_payment_id': 'pay_rzp_mock_live_98a1',
                    'items': [
                        {'product': p1, 'license_type': 'standard', 'unit_price': p1.price, 'quantity': 1, 'total_price': p1.price},
                        {'product': p2, 'license_type': 'extended', 'unit_price': (p2.price * Decimal('2.5')), 'quantity': 1, 'total_price': (p2.price * Decimal('2.5'))},
                    ]
                }
            ]

            for s_ord in sample_orders:
                items_data = s_ord.pop('items')
                order, created = Order.objects.get_or_create(order_number=s_ord['order_number'], defaults=s_ord)
                if created:
                    for it in items_data:
                        OrderItem.objects.create(
                            order=order,
                            product=it['product'],
                            product_title=it['product'].title,
                            license_type=it['license_type'],
                            unit_price=it['unit_price'],
                            quantity=it['quantity'],
                            total_price=it['total_price'],
                            license_key=generate_license_key(),
                        )

                    Payment.objects.create(
                        order=order,
                        razorpay_order_id=order.razorpay_order_id,
                        razorpay_payment_id=order.razorpay_payment_id,
                        razorpay_signature='sig_test_seeded_verified',
                        amount=order.total_amount,
                        currency=order.currency,
                        status='captured',
                    )
            self.stdout.write(self.style.SUCCESS("Sample paid orders and digital download licenses seeded."))

        # 6. Sample Notifications
        Notification.objects.get_or_create(
            user=demo_user,
            title='Order ORD-20261119-98A1 Confirmed!',
            defaults={
                'message': 'Your payment was successfully verified via Razorpay. Your commercial licenses and vector source files are ready for immediate download.',
                'notification_type': 'order',
                'link_url': '/dashboard?tab=downloads',
            }
        )
        Notification.objects.get_or_create(
            user=demo_user,
            title='Welcome to PixelGenCreativity Studio',
            defaults={
                'message': 'Explore over 15 categories of ultra-high-definition design templates and generative creative assets.',
                'notification_type': 'system',
                'link_url': '/marketplace',
            }
        )

        self.stdout.write(self.style.SUCCESS('Phase 5 seeding complete! All backend entities verified.'))
