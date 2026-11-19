from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    excerpt = models.TextField(blank=True, default='')
    content = models.TextField()
    author_name = models.CharField(max_length=100, default='PixelGen Editorial')
    featured_image_url = models.URLField(max_length=500, blank=True, default='')
    category = models.CharField(max_length=100, default='Design Trends')
    read_time_minutes = models.PositiveIntegerField(default=5)
    views_count = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'content_blog_posts'
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:250]
        super().save(*args, **kwargs)


class ContactInquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New Inquiry'),
        ('replied', 'Replied'),
        ('resolved', 'Resolved'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, default='')
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        db_table = 'content_contact_inquiries'
        ordering = ['-created_at']
        verbose_name = 'Contact Inquiry'
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        return f"{self.subject} - {self.name}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True, db_index=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'content_newsletter_subscribers'
        ordering = ['-subscribed_at']
        verbose_name = 'Newsletter Subscriber'
        verbose_name_plural = 'Newsletter Subscribers'

    def __str__(self):
        return self.email


class Notification(models.Model):
    TYPE_CHOICES = [
        ('order', 'Order Update'),
        ('payment', 'Payment Update'),
        ('system', 'System Alert'),
        ('promo', 'Special Promotion'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='system')
    is_read = models.BooleanField(default=False, db_index=True)
    link_url = models.CharField(max_length=255, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        db_table = 'content_notifications'
        ordering = ['-created_at']
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'

    def __str__(self):
        return f"{self.title} ({'Read' if self.is_read else 'Unread'})"
