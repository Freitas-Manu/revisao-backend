import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.food.createMany({
        data: [
            {
                nome: 'Lasanha',
                descricao: 'Lasanha de carne com queijo, acompanhada de arroz',
                preco: 20.00,
                categoria: 'Prato principal',
                avaliacao: true
            },
            {
                nome: 'Sopa',
                descricao: 'Sopa de legumes com carne',
                preco: 15.50,
                categoria: 'Entrada',
                avaliacao: true
            },
            {
                nome: 'Pizza de Chocolate',
                descricao: 'Pizza de chocolate branco com morango',
                preco: 30.00,
                categoria: 'Sobremesa',
                avaliacao: true
            },
            {
                nome: 'Suco de Laranja',
                descricao: 'Suco natural da fruta 500ml',
                preco: 8.50,
                categoria: 'Bebida',
                avaliacao: true
            },
            {
                nome: 'Hambúrguer Artesanal',
                descricao: 'Pão brioche, carne 180g, queijo cheddar e bacon',
                preco: 25.00,
                categoria: 'Prato principal',
                avaliacao: true
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
