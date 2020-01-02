from django.shortcuts import render
from notemaster.models import Notes
from notemaster.serializers import NotesSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from notemaster.permission import IsOwnerOrReadOnly


class NotesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated&IsOwnerOrReadOnly]
    serializer_class = NotesSerializer
    # queryset = Notes.objects.filter(user=request.user)

    def get_queryset(self):
        return Notes.objects.filter(user= self.request.user)
    