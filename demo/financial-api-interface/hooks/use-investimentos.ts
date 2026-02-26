"use client"

import useSWR from "swr"
import {
  listarInvestimentos,
  criarInvestimento,
  atualizarInvestimento,
  deletarInvestimento,
} from "@/lib/api"
import type { InvestimentoRequest } from "@/lib/types"

export function useInvestimentos() {
  const { data, error, isLoading, mutate } = useSWR(
    "investimentos",
    listarInvestimentos
  )

  const criar = async (req: InvestimentoRequest) => {
    const result = await criarInvestimento(req)
    mutate()
    return result
  }

  const atualizar = async (id: string, req: InvestimentoRequest) => {
    const result = await atualizarInvestimento(id, req)
    mutate()
    return result
  }

  const deletar = async (id: string) => {
    await deletarInvestimento(id)
    mutate()
  }

  return {
    investimentos: data ?? [],
    error,
    isLoading,
    criar,
    atualizar,
    deletar,
    mutate,
  }
}
