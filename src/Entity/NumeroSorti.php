<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class NumeroSorti
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(unique: true)]
    private int $numero;

    public function __construct(int $numero)
    {
        $this->numero = $numero;
    }

    public function getId(): ?int { return $this->id; }
    public function getNumero(): int { return $this->numero; }
}
