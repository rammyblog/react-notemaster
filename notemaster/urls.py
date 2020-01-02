from notemaster.views import NotesViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'notes', NotesViewSet, basename='notes')
urlpatterns = router.urls