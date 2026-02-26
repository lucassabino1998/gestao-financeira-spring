import type {
  Investimento,
  InvestimentoRequest,
  Transacao,
  TransacaoRequest,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.100:8080/api";

// 1. A NOSSA CHAVE MESTRA
const username = 'lucas';
const password = 'minhasenha123';
const tokenBase64 = btoa(`${username}:${password}`);

const defaultHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Basic ${tokenBase64}`
};

// ==========================================
// INVESTIMENTOS API
// ==========================================

export async function listarInvestimentos(): Promise<Investimento[]> {
  const res = await fetch(`${API_BASE}/investimentos`, {
    headers: { "Authorization": `Basic ${tokenBase64}` } 
  });
  if (!res.ok) throw new Error("Erro ao buscar investimentos");
  return res.json();
}

export async function criarInvestimento(data: InvestimentoRequest): Promise<Investimento> {
  const res = await fetch(`${API_BASE}/investimentos`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar investimento");
  return res.json();
}

export async function atualizarInvestimento(id: string, data: InvestimentoRequest): Promise<Investimento> {
  const res = await fetch(`${API_BASE}/investimentos/${id}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar investimento");
  return res.json();
}

export async function deletarInvestimento(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/investimentos/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Basic ${tokenBase64}` } 
  });
  if (!res.ok) throw new Error("Erro ao deletar investimento");
}

// ==========================================
// TRANSAÇÕES API (As que estavam faltando!)
// ==========================================

export async function listarTransacoes(): Promise<Transacao[]> {
  const res = await fetch(`${API_BASE}/transacoes`, {
    headers: { "Authorization": `Basic ${tokenBase64}` } 
  });
  if (!res.ok) throw new Error("Erro ao buscar transacoes");
  return res.json();
}

export async function criarTransacao(data: TransacaoRequest): Promise<Transacao> {
  const res = await fetch(`${API_BASE}/transacoes`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar transacao");
  return res.json();
}

export async function atualizarTransacao(id: string, data: TransacaoRequest): Promise<Transacao> {
  const res = await fetch(`${API_BASE}/transacoes/${id}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar transacao");
  return res.json();
}

export async function deletarTransacao(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/transacoes/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Basic ${tokenBase64}` } 
  });
  if (!res.ok) throw new Error("Erro ao deletar transacao");
}