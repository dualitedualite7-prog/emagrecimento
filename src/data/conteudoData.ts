import { BrainCircuit, UtensilsCrossed, ListChecks, Dumbbell, HelpCircle } from 'lucide-react'

export const conteudoCategorias = {
  fundamentos: {
    slug: 'fundamentos',
    title: 'Fundamentos do Emagrecimento',
    description: 'Entenda os pilares essenciais para uma perda de peso saudável e sustentável.',
    icon: BrainCircuit,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    content: {
      tabs: [
        {
          name: 'Pilares',
          items: [
            { id: 'f-p1', title: 'Déficit Calórico Inteligente', content: 'Não se trata de passar fome, mas de consumir menos calorias do que você gasta. Priorize alimentos nutritivos que dão saciedade.', isPremium: false },
            { id: 'f-p2', title: 'Nutrição Balanceada', content: 'Equilibre a ingestão de macronutrientes (proteínas, carboidratos e gorduras) e micronutrientes (vitaminas e minerais).', isPremium: false },
            { id: 'f-p3', title: 'Hidratação Constante', content: 'A água é crucial para o metabolismo, controle do apetite e eliminação de toxinas. Beba pelo menos 2 litros por dia.', isPremium: false },
            { id: 'f-p4', title: 'Atividade Física Regular', content: 'Combine exercícios aeróbicos (queima de gordura) com musculação (aumento do metabolismo).', isPremium: true },
            { id: 'f-p5', title: 'Descanso e Sono de Qualidade', content: 'Dormir bem regula hormônios ligados ao apetite (grelina e leptina) e à recuperação muscular.', isPremium: true },
          ]
        },
        {
          name: 'Metabolismo',
          items: [
            { id: 'f-m1', title: 'O que é Metabolismo Basal?', content: 'É a quantidade de energia que seu corpo gasta em repouso. Aumentar a massa muscular acelera o metabolismo basal.', isPremium: false },
            { id: 'f-m2', title: 'Efeito Térmico dos Alimentos', content: 'Seu corpo gasta energia para digerir alimentos. Proteínas têm o maior efeito térmico, ou seja, "queimam" mais calorias para serem digeridas.', isPremium: false },
            { id: 'f-m3', title: 'Como Acelerar?', content: 'Beba chá verde e café (com moderação), consuma pimenta, faça treinos intervalados de alta intensidade (HIIT) e não pule refeições.', isPremium: true },
          ]
        }
      ]
    }
  },
  alimentacao: {
    slug: 'dicas-alimentacao',
    title: 'Dicas de Alimentação',
    description: 'Aprenda a fazer escolhas inteligentes no seu dia a dia para potencializar seus resultados.',
    icon: UtensilsCrossed,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-green-500',
    content: {
      tabs: [
        {
          name: 'No Dia a Dia',
          items: [
            { id: 'a-d1', title: 'Planeje suas Refeições', content: 'Dedique um dia da semana para planejar o cardápio e fazer as compras. Isso evita decisões impulsivas e pouco saudáveis.', isPremium: false },
            { id: 'a-d2', title: 'Cozinhe Mais em Casa', content: 'Cozinhar te dá controle total sobre os ingredientes, temperos e porções.', isPremium: false },
            { id: 'a-d3', title: 'Leia os Rótulos', content: 'Fique atento à lista de ingredientes e à tabela nutricional. Evite produtos com muito açúcar, sódio e gorduras trans.', isPremium: false },
            { id: 'a-d4', title: 'Monte um Prato Colorido', content: 'Quanto mais cores no prato, maior a variedade de nutrientes. Inclua vegetais de cores diferentes.', isPremium: false },
            { id: 'a-d5', title: 'Cuidado com as "Calorias Líquidas"', content: 'Refrigerantes, sucos industrializados e bebidas alcoólicas são ricos em calorias e pobres em nutrientes.', isPremium: true },
          ]
        },
        {
          name: 'Supermercado',
          items: [
            { id: 'a-s1', title: 'Faça uma Lista de Compras', content: 'Vá ao supermercado com uma lista e siga-a à risca para evitar compras por impulso.', isPremium: false },
            { id: 'a-s2', title: 'Nunca Vá com Fome', content: 'Ir ao supermercado com fome aumenta a chance de comprar alimentos calóricos e pouco saudáveis.', isPremium: false },
            { id: 'a-s3', title: 'Foque nos Corredores Externos', content: 'Geralmente, os alimentos frescos (frutas, vegetais, carnes) ficam nos corredores externos, enquanto os ultraprocessados ficam no centro.', isPremium: false },
          ]
        }
      ]
    }
  },
  planejamento: {
    slug: 'ferramentas-planejamento',
    title: 'Ferramentas de Planejamento',
    description: 'Organize sua rotina com checklists, cardápios e listas de compras práticas.',
    icon: ListChecks,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    borderColor: 'border-yellow-500',
    content: {
      tabs: [
        {
          name: 'Checklist Semanal',
          items: [
            { id: 'p-c1', title: 'Definir o cardápio da semana', content: '', isPremium: true },
            { id: 'p-c2', title: 'Fazer a lista de compras baseada no cardápio', content: '', isPremium: true },
            { id: 'p-c3', title: 'Ir ao supermercado ou feira', content: '', isPremium: false },
            { id: 'p-c4', title: 'Higienizar e guardar frutas e vegetais', content: '', isPremium: false },
            { id: 'p-c5', title: 'Pré-preparar alguns ingredientes (ex: cozinhar grãos, deixar salada lavada)', content: '', isPremium: true },
            { id: 'p-c6', title: 'Agendar os treinos da semana', content: '', isPremium: true },
          ]
        },
        {
          name: 'Cardápio Exemplo',
          items: [
            { id: 'p-m1', title: 'Café da Manhã', content: 'Ovos mexidos com pão integral ou Iogurte natural com aveia e frutas.', isPremium: false },
            { id: 'p-m2', title: 'Almoço', content: 'Frango grelhado, arroz integral, feijão e uma grande porção de salada de folhas verdes com legumes variados.', isPremium: false },
            { id: 'p-m3', title: 'Lanche da Tarde', content: 'Uma porção de fruta (maçã, banana) com um punhado de castanhas.', isPremium: false },
            { id: 'p-m4', title: 'Jantar', content: 'Sopa de legumes ou um filé de peixe assado com brócolis.', isPremium: false },
          ]
        }
      ]
    }
  },
  exercicios: {
    slug: 'exercicios-sugeridos',
    title: 'Exercícios Sugeridos',
    description: 'Sugestões de atividades físicas e mentais para uma rotina equilibrada.',
    icon: Dumbbell,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-500',
    content: {
      tabs: [
        {
          name: 'Exercícios Físicos',
          items: [
            { id: 'e-f1', title: 'Caminhada Acelerada', content: '30-45 minutos, 3-5 vezes por semana. Ótimo para iniciantes e para a saúde cardiovascular.', isPremium: false },
            { id: 'e-f2', title: 'Agachamento Livre', content: 'Fortalece pernas e glúteos, grandes grupos musculares que queimam muitas calorias. Comece sem peso.', isPremium: false },
            { id: 'e-f3', title: 'Prancha Abdominal', content: 'Fortalece o core (centro do corpo), melhora a postura e previne dores nas costas. Tente segurar por 30 segundos.', isPremium: false },
            { id: 'e-f4', title: 'Flexão de Braços', content: 'Excelente para o peitoral, ombros e tríceps. Comece com os joelhos apoiados no chão se necessário.', isPremium: true },
            { id: 'e-f5', title: 'Pular Corda', content: 'Um exercício aeróbico de alta intensidade que queima muitas calorias em pouco tempo.', isPremium: true },
          ]
        },
        {
          name: 'Exercícios Mentais',
          items: [
            { id: 'e-m1', title: 'Meditação Guiada', content: '5-10 minutos por dia para reduzir o estresse e a ansiedade, que podem levar à compulsão alimentar.', isPremium: false },
            { id: 'e-m2', title: 'Mindful Eating', content: 'Pratique comer com atenção plena. Observe as cores, cheiros e texturas do alimento. Coma devagar e sem distrações.', isPremium: false },
            { id: 'e-m3', title: 'Diário de Gratidão', content: 'Anote 3 coisas pelas quais você é grato todos os dias. Isso melhora o humor e a perspectiva sobre a vida.', isPremium: true },
          ]
        }
      ]
    }
  },
  mitos: {
    slug: 'mitos-e-verdades',
    title: 'Mitos e Verdades',
    description: 'Desvende o que é fato e o que é ficção no mundo do emagrecimento.',
    icon: HelpCircle,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    borderColor: 'border-red-500',
    content: {
      tabs: [
        {
          name: 'Mitos Comuns',
          items: [
            { id: 'm-m1', title: 'Mito: Carboidratos à noite engordam.', content: 'Verdade: O que engorda é o excesso de calorias no total do dia, não o horário em que você come carboidratos. Opte por carboidratos complexos (integrais).', isPremium: false },
            { id: 'm-m2', title: 'Mito: Para emagrecer, preciso cortar toda a gordura.', content: 'Verdade: Gorduras boas (de abacate, azeite, castanhas) são essenciais para a saúde e para a absorção de vitaminas. O problema são as gorduras trans e o excesso de saturadas.', isPremium: false },
            { id: 'm-m3', title: 'Mito: Fazer apenas exercícios aeróbicos é o melhor para emagrecer.', content: 'Verdade: A combinação de aeróbicos com musculação é a mais eficaz. A musculação aumenta sua massa magra, o que acelera seu metabolismo de repouso.', isPremium: false },
            { id: 'm-m4', title: 'Mito: Produtos "light" e "diet" são sempre a melhor opção.', content: 'Verdade: Muitos desses produtos têm redução de um nutriente (açúcar ou gordura), mas compensam com outros, como sódio ou adoçantes artificiais. O ideal é preferir comida de verdade.', isPremium: false },
          ]
        }
      ]
    }
  }
};
