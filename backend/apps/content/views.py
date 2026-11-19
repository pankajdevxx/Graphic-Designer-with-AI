from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.text import slugify

from .models import BlogPost, ContactInquiry, NewsletterSubscriber, Notification
from .serializers import (
    BlogPostSerializer,
    ContactInquirySerializer,
    AdminContactInquirySerializer,
    NewsletterSubscriberSerializer,
    NotificationSerializer,
    AdminProductManageSerializer,
)
from apps.products.models import Product, ProductImage
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer


class BlogPostListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        category = request.query_params.get('category')
        posts = BlogPost.objects.filter(is_published=True)
        if category:
            posts = posts.filter(category__iexact=category)

        serializer = BlogPostSerializer(posts, many=True)
        return Response({
            'count': posts.count(),
            'posts': serializer.data,
        }, status=status.HTTP_200_OK)


class BlogPostDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        try:
            post = BlogPost.objects.get(slug=slug, is_published=True)
        except BlogPost.DoesNotExist:
            return Response({'error': 'Article not found.'}, status=status.HTTP_404_NOT_FOUND)

        post.views_count += 1
        post.save(update_fields=['views_count'])

        serializer = BlogPostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ContactInquiryCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ContactInquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            return Response({
                'message': 'Thank you! Your message has been received. Our team will respond within 24 hours.',
                'inquiry': ContactInquirySerializer(inquiry).data,
            }, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class NewsletterSubscribeView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        if not email or '@' not in email:
            return Response({'error': 'Please provide a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

        subscriber, created = NewsletterSubscriber.objects.get_or_create(email=email)
        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.save()

        return Response({
            'message': 'Thank you for subscribing to PixelGen Creatives! Check your inbox for exclusive design drops.',
            'email': email,
        }, status=status.HTTP_200_OK)


class NotificationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        notifs = Notification.objects.filter(user=request.user).order_by('-created_at')
        unread_count = notifs.filter(is_read=False).count()
        return Response({
            'unread_count': unread_count,
            'notifications': NotificationSerializer(notifs, many=True).data,
        }, status=status.HTTP_200_OK)


class NotificationMarkReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk=None):
        if pk:
            Notification.objects.filter(id=pk, user=request.user).update(is_read=True)
        else:
            Notification.objects.filter(user=request.user).update(is_read=True)
        return Response({'message': 'Notifications updated.'}, status=status.HTTP_200_OK)


# Admin Endpoints
class AdminBlogManageView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        posts = BlogPost.objects.all().order_by('-created_at')
        return Response({'count': posts.count(), 'posts': BlogPostSerializer(posts, many=True).data})

    def post(self, request):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            return Response(BlogPostSerializer(post).data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            BlogPost.objects.filter(pk=pk).delete()
            return Response({'message': 'Article deleted.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AdminInquiriesManageView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        inquiries = ContactInquiry.objects.all().order_by('-created_at')
        return Response({'count': inquiries.count(), 'inquiries': AdminContactInquirySerializer(inquiries, many=True).data})

    def patch(self, request, pk):
        try:
            inquiry = ContactInquiry.objects.get(pk=pk)
            status_val = request.data.get('status')
            if status_val:
                inquiry.status = status_val
                inquiry.save()
            return Response(AdminContactInquirySerializer(inquiry).data)
        except ContactInquiry.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class AdminSubscribersManageView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        subs = NewsletterSubscriber.objects.all().order_by('-subscribed_at')
        return Response({'count': subs.count(), 'subscribers': NewsletterSubscriberSerializer(subs, many=True).data})


class AdminProductManageView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        products = Product.objects.all().order_by('-created_at')
        return Response({
            'count': products.count(),
            'products': AdminProductManageSerializer(products, many=True).data,
        })

    def post(self, request):
        serializer = AdminProductManageSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            img_url = request.data.get('image_url')
            if img_url:
                ProductImage.objects.create(product=product, image_url=img_url, is_primary=True)
            return Response(AdminProductManageSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminProductManageSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            product = serializer.save()
            return Response(AdminProductManageSerializer(product).data)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Product.objects.filter(pk=pk).delete()
            return Response({'message': 'Product deleted.'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AdminCategoryManageView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        categories = Category.objects.all().order_by('sort_order', 'name')
        return Response({'count': categories.count(), 'categories': CategorySerializer(categories, many=True).data})

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            cat = serializer.save()
            return Response(CategorySerializer(cat).data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            cat = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CategorySerializer(cat, data=request.data, partial=True)
        if serializer.is_valid():
            cat = serializer.save()
            return Response(CategorySerializer(cat).data)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Category.objects.filter(pk=pk).delete()
            return Response({'message': 'Category deleted.'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
