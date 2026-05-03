<?php

namespace App\Controller;

use App\Entity\NumeroSorti;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class GrilleController extends AbstractController
{
    #[Route('/', name: 'grille')]
    public function index(): Response
    {
        return $this->render('grille/index.html.twig', [
            'numeros' => range(1, 90),
        ]);
    }

    #[Route('/affichage', name: 'affichage')]
    public function affichage(): Response
    {
        return $this->render('grille/affichage.html.twig', [
            'numeros' => range(1, 90),
        ]);
    }

    #[Route('/api/numeros', name: 'api_numeros')]
    public function apiNumeros(EntityManagerInterface $em): JsonResponse
    {
        $sortis = $em->getRepository(NumeroSorti::class)->findBy([], ['id' => 'ASC']);
        $liste = array_map(fn($n) => $n->getNumero(), $sortis);
        $dernier = count($liste) > 0 ? end($liste) : null;

        return $this->json([
            'sortis'  => $liste,
            'dernier' => $dernier,
            'compte'  => count($liste),
        ]);
    }

    #[Route('/numero/{n}', name: 'toggle_numero', methods: ['POST'])]
    public function toggleNumero(int $n, EntityManagerInterface $em): JsonResponse
    {
        if ($n < 1 || $n > 90) {
            return $this->json(['error' => 'Numéro invalide'], 400);
        }

        $existing = $em->getRepository(NumeroSorti::class)->findOneBy(['numero' => $n]);

        if ($existing) {
            $em->remove($existing);
            $em->flush();
            return $this->json(['action' => 'retire', 'numero' => $n]);
        }

        $em->persist(new NumeroSorti($n));
        $em->flush();

        return $this->json(['action' => 'sorti', 'numero' => $n]);
    }

    #[Route('/reset', name: 'reset', methods: ['POST'])]
    public function reset(EntityManagerInterface $em): JsonResponse
    {
        $em->createQuery('DELETE FROM App\Entity\NumeroSorti')->execute();

        return $this->json(['action' => 'reset']);
    }
}
