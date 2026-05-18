import React from 'react'
import './ApiDocs.css'

const baseUrl = `${window.location.origin}/api`

const sections = [
  {
    title: 'Professores',
    routes: [
      {
        method: 'GET',
        path: '/professores',
        description: 'Lista todos os professores.',
        body: null
      },
      {
        method: 'GET',
        path: '/professores/1',
        description: 'Busca um professor pelo ID.',
        body: null
      },
      {
        method: 'POST',
        path: '/professores',
        description: 'Cria um professor ativo.',
        body: {
          nome: 'Prof. Teste',
          email: 'prof.teste@senai.br'
        }
      },
      {
        method: 'PUT',
        path: '/professores/1',
        description: 'Atualiza nome e email de um professor.',
        body: {
          nome: 'Prof. Joao Atualizado',
          email: 'joao.atualizado@senai.br'
        }
      },
      {
        method: 'PATCH',
        path: '/professores/3/inativar',
        description: 'Marca um professor como inativo.',
        body: null
      },
      {
        method: 'PATCH',
        path: '/professores/3/ativar',
        description: 'Marca um professor como ativo.',
        body: null
      }
    ]
  },
  {
    title: 'Carrinhos',
    routes: [
      {
        method: 'GET',
        path: '/carrinhos',
        description: 'Lista todos os carrinhos.',
        body: null
      },
      {
        method: 'GET',
        path: '/carrinhos/1',
        description: 'Busca um carrinho pelo ID.',
        body: null
      },
      {
        method: 'POST',
        path: '/carrinhos',
        description: 'Cria um carrinho ativo.',
        body: {
          numero: 5,
          descricao: 'Carrinho novo',
          quantidadeNotebooks: 20,
          localizacao: 'Sala 200'
        }
      },
      {
        method: 'PUT',
        path: '/carrinhos/1',
        description: 'Atualiza os dados de um carrinho.',
        body: {
          numero: 1,
          descricao: 'Carrinho atualizado',
          quantidadeNotebooks: 22,
          localizacao: 'Sala 201'
        }
      },
      {
        method: 'PATCH',
        path: '/carrinhos/3/inativar',
        description: 'Marca um carrinho como inativo.',
        body: null
      },
      {
        method: 'PATCH',
        path: '/carrinhos/3/ativar',
        description: 'Marca um carrinho como ativo.',
        body: null
      }
    ]
  },
  {
    title: 'Reservas',
    routes: [
      {
        method: 'GET',
        path: '/reservas',
        description: 'Lista todas as reservas.',
        body: null
      },
      {
        method: 'GET',
        path: '/reservas/1',
        description: 'Busca uma reserva pelo ID.',
        body: null
      },
      {
        method: 'GET',
        path: '/reservas?dataUso=2026-05-20',
        description: 'Filtra reservas por data de uso.',
        body: null
      },
      {
        method: 'GET',
        path: '/reservas?professorId=1',
        description: 'Filtra reservas por professor.',
        body: null
      },
      {
        method: 'GET',
        path: '/reservas?carrinhoId=1',
        description: 'Filtra reservas por carrinho.',
        body: null
      },
      {
        method: 'POST',
        path: '/reservas',
        description: 'Cria uma reserva agendada.',
        body: {
          professorId: 1,
          carrinhoId: 1,
          dataUso: '2026-06-01',
          horaInicio: '08:00',
          horaFim: '10:00',
          turma: 'ADS 5A',
          observacao: 'Aula de testes'
        }
      },
      {
        method: 'PATCH',
        path: '/reservas/1/cancelar',
        description: 'Cancela uma reserva agendada.',
        body: null
      },
      {
        method: 'PATCH',
        path: '/reservas/2/finalizar',
        description: 'Finaliza uma reserva agendada.',
        body: null
      }
    ]
  }
]

function MethodBadge({ method }) {
  return <span className={`method method-${method.toLowerCase()}`}>{method}</span>
}

function RouteCard({ route }) {
  const fullUrl = `${baseUrl}${route.path}`

  return (
    <article className="route-card">
      <div className="route-header">
        <MethodBadge method={route.method} />
        <code>{route.path}</code>
      </div>
      <p>{route.description}</p>
      <div className="example-block">
        <span>URL</span>
        <pre>{fullUrl}</pre>
      </div>
      {route.body && (
        <div className="example-block">
          <span>Body JSON</span>
          <pre>{JSON.stringify(route.body, null, 2)}</pre>
        </div>
      )}
    </article>
  )
}

export function ApiDocs() {
  return (
    <div className="api-docs">
      <div className="api-docs-header">
        <h1>Rotas da API</h1>
        <p>Use essas URLs no Postman ou em testes manuais.</p>
        <div className="base-url">
          <span>Base URL</span>
          <code>{baseUrl}</code>
        </div>
      </div>

      {sections.map(section => (
        <section key={section.title} className="api-section">
          <h2>{section.title}</h2>
          <div className="routes-grid">
            {section.routes.map(route => (
              <RouteCard key={`${route.method}-${route.path}`} route={route} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
