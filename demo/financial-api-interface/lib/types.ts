// Investimento types
export type TipoInvestimento =
  | "RENDA_FIXA"
  | "CRIPTOMOEDAS"
  | "FUNDOS_IMOBILIARIOS"
  | "INVESTIMENTO_EXTERIOR"
  | "ACOES"

export interface Investimento {
  id: string
  TipoInvestimento: TipoInvestimento
  ValorInvestimento: number
  NomeInvestimento: string
  DataInvestimento: string
  quantidade: number
  valorAtual: number | null
}

export interface InvestimentoRequest {
  NomeInvestimento: string
  ValorInvestimento: number
  DataInvestimento: string
  TipoInvestimento: TipoInvestimento
  quantidade: number
}

// Transacao types
export type TipoDeTransacao = "Entrada" | "Despesas"

export type Categoria =
  | "ALIMENTACAO"
  | "TRANSPORTE"
  | "MORADIA"
  | "LAZER"
  | "SAUDE"
  | "EDUCACAO"
  | "SALARIO"
  | "VENDAS"
  | "OUTROS"

export type MetodoDePagamento =
  | "PIX"
  | "CARTAO_CREDITO"
  | "CARTAO_DEBITO"
  | "DINHEIRO"
  | "BOLETO"
  | "TRANSFERENCIA"

export interface Transacao {
  id: string
  tipoDeTransacao: TipoDeTransacao
  valor: number
  descricao: string
  data: string
  categoria: Categoria
  metodoDePagamento: MetodoDePagamento
}

export interface TransacaoRequest {
  tipoDeTransacao: TipoDeTransacao
  valor: number
  descricao: string
  data: string
  categoria: Categoria
  metodoDePagamento: MetodoDePagamento
}

// Label maps for UI display
export const TIPO_INVESTIMENTO_LABELS: Record<TipoInvestimento, string> = {
  RENDA_FIXA: "Renda Fixa",
  CRIPTOMOEDAS: "Criptomoedas",
  FUNDOS_IMOBILIARIOS: "Fundos Imobiliarios",
  INVESTIMENTO_EXTERIOR: "Investimento Exterior",
  ACOES: "Acoes",
}

export const CATEGORIA_LABELS: Record<Categoria, string> = {
  ALIMENTACAO: "Alimentacao",
  TRANSPORTE: "Transporte",
  MORADIA: "Moradia",
  LAZER: "Lazer",
  SAUDE: "Saude",
  EDUCACAO: "Educacao",
  SALARIO: "Salario",
  VENDAS: "Vendas",
  OUTROS: "Outros",
}

export const METODO_PAGAMENTO_LABELS: Record<MetodoDePagamento, string> = {
  PIX: "PIX",
  CARTAO_CREDITO: "Cartao de Credito",
  CARTAO_DEBITO: "Cartao de Debito",
  DINHEIRO: "Dinheiro",
  BOLETO: "Boleto",
  TRANSFERENCIA: "Transferencia",
}

export const TIPO_TRANSACAO_LABELS: Record<TipoDeTransacao, string> = {
  Entrada: "Entrada",
  Despesas: "Despesas",
}
