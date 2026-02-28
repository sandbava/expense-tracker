<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Expense;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

class ExpenseProcessor implements ProcessorInterface
{
    public function __construct(private EntityManagerInterface $entityManager, private Security $security) {}

    /**
     * @inheritDoc
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($data instanceof Expense) {
            if ($data instanceof Expense && null === $data->getOwner()) {
                $data->setOwner($this->security->getUser());
            }

            $this->entityManager->persist($data);
            $this->entityManager->flush();
        }

        return $data;
    }
}
