<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TestController extends AbstractController
{
    #[Route('/api/test', name: 'app_test')]
    public function index(): Response
    {
        return $this->json(['message' => 'API works']);
    }

    #[Route('/api/me', methods: ['GET'])]
    public function me(): Response
    {
        return $this->json([
            'user' => $this->getUser()?->getUserIdentifier(),
            'roles' => $this->getUser()?->getRoles(),
        ]);
    }
}
