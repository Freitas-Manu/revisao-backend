import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed...');

  await prisma.food.createMany({
    data: [
      {
        name: 'Strogonoff de Frango',
        description: 'Frango ao molho cremoso com arroz branco e batata palha',
        price: 32.9,
        category: 'prato principal',
        available: true,
      },
      {
        name: 'Lasanha à Bolonhesa',
        description: 'Lasanha tradicional com molho de carne e queijo gratinado',
        price: 38.0,
        category: 'prato principal',
        available: true,
      },
      {
        name: 'Filé de Tilápia Grelhado',
        description: 'Tilápia grelhada com legumes salteados e purê de batata',
        price: 41.5,
        category: 'prato principal',
        available: true,
      },
      {
        name: 'Bruschetta de Tomate',
        description: 'Pão italiano tostado com tomate, alho e manjericão',
        price: 17.0,
        category: 'entrada',
        available: true,
      },
      {
        name: 'Coxinha de Frango',
        description: 'Porção com 5 coxinhas artesanais',
        price: 22.0,
        category: 'entrada',
        available: true,
      },
      {
        name: 'Caldo de Mandioquinha',
        description: 'Caldo quente com mandioquinha e bacon crocante',
        price: 19.0,
        category: 'entrada',
        available: true,
      },
      {
        name: 'Pudim de Leite',
        description: 'Pudim tradicional com calda de caramelo',
        price: 16.0,
        category: 'sobremesa',
        available: true,
      },
      {
        name: 'Mousse de Maracujá',
        description: 'Mousse leve com calda natural de maracujá',
        price: 14.5,
        category: 'sobremesa',
        available: true,
      },
      {
        name: 'Suco Natural de Laranja',
        description: 'Suco natural feito na hora (300ml)',
        price: 9.0,
        category: 'bebida',
        available: true,
      },
      {
        name: 'Água com Gás',
        description: 'Garrafa 500ml',
        price: 5.5,
        category: 'bebida',
        available: true,
      },
    ],
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });