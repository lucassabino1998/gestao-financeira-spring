"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type {
  Investimento,
  InvestimentoRequest,
  TipoInvestimento,
} from "@/lib/types"
import { TIPO_INVESTIMENTO_LABELS } from "@/lib/types"

interface InvestimentoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: InvestimentoRequest) => Promise<void>
  investimento?: Investimento | null
}

const TIPOS: TipoInvestimento[] = [
  "RENDA_FIXA",
  "CRIPTOMOEDAS",
  "FUNDOS_IMOBILIARIOS",
  "INVESTIMENTO_EXTERIOR",
  "ACOES",
]

export function InvestimentoForm({
  open,
  onOpenChange,
  onSubmit,
  investimento,
}: InvestimentoFormProps) {
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [data, setData] = useState("")
  const [tipo, setTipo] = useState<TipoInvestimento>("ACOES")
  const [quantidade, setQuantidade] = useState("")

  useEffect(() => {
    if (investimento) {
      setNome(investimento.NomeInvestimento)
      setValor(String(investimento.ValorInvestimento))
      setData(investimento.DataInvestimento)
      setTipo(investimento.TipoInvestimento)
      setQuantidade(String(investimento.quantidade))
    } else {
      setNome("")
      setValor("")
      setData("")
      setTipo("ACOES")
      setQuantidade("")
    }
  }, [investimento, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({
        NomeInvestimento: nome,
        ValorInvestimento: Number.parseFloat(valor),
        DataInvestimento: data,
        TipoInvestimento: tipo,
        quantidade: Number.parseFloat(quantidade),
      })
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {investimento ? "Editar Investimento" : "Novo Investimento"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome" className="text-foreground">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: PETR4, BOVA11"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="valor" className="text-foreground">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="quantidade" className="text-foreground">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                step="0.0001"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tipo" className="text-foreground">Tipo</Label>
            <Select value={tipo} onValueChange={(v) => setTipo(v as TipoInvestimento)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {TIPO_INVESTIMENTO_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="data" className="text-foreground">Data</Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : investimento ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
