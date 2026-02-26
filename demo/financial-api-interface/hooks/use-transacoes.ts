"use client"

import useSWR from "swr"
import {
  listarTransacoes,
  criarTransacao,
  atualizarTransacao,
  deletarTransacao,
} from "@/lib/api"
import type { TransacaoRequest } from "@/lib/types"

export function useTransacoes() {
  const { data, error, isLoading, mutate } = useSWR(
    "transacoes",
    listarTransacoes
  )

  const criar = async (req: TransacaoRequest) => {
    const result = await criarTransacao(req)
    mutate()
    return result
  }

  const atualizar = async (id: string, req: TransacaoRequest) => {
    const result = await atualizarTransacao(id, req)
    mutate()
    return result
  }

  const deletar = async (id: string) => {
    await deletarTransacao(id)
    mutate()
  }

  return {
    transacoes: data ?? [],
    error,
    isLoading,
    criar,
    atualizar,
    deletar,
    mutate,
  }
}
