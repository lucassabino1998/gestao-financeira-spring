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
  Transacao,
  TransacaoRequest,
  TipoDeTransacao,
  Categoria,
  MetodoDePagamento,
} from "@/lib/types"
import {
  TIPO_TRANSACAO_LABELS,
  CATEGORIA_LABELS,
  METODO_PAGAMENTO_LABELS,
} from "@/lib/types"

interface TransacaoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TransacaoRequest) => Promise<void>
  transacao?: Transacao | null
}

const TIPOS_TX: TipoDeTransacao[] = ["Entrada", "Despesas"]
const CATEGORIAS: Categoria[] = [
  "ALIMENTACAO",
  "TRANSPORTE",
  "MORADIA",
  "LAZER",
  "SAUDE",
  "EDUCACAO",
  "SALARIO",
  "VENDAS",
  "OUTROS",
]
const METODOS: MetodoDePagamento[] = [
  "PIX",
  "CARTAO_CREDITO",
  "CARTAO_DEBITO",
  "DINHEIRO",
  "BOLETO",
  "TRANSFERENCIA",
]

export function TransacaoForm({
  open,
  onOpenChange,
  onSubmit,
  transacao,
}: TransacaoFormProps) {
  const [loading, setLoading] = useState(false)
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [data, setData] = useState("")
  const [tipo, setTipo] = useState<TipoDeTransacao>("Entrada")
  const [categoria, setCategoria] = useState<Categoria>("OUTROS")
  const [metodo, setMetodo] = useState<MetodoDePagamento>("PIX")

  useEffect(() => {
    if (transacao) {
      setDescricao(transacao.descricao)
      setValor(String(transacao.valor))
      setData(transacao.data)
      setTipo(transacao.tipoDeTransacao)
      setCategoria(transacao.categoria)
      setMetodo(transacao.metodoDePagamento)
    } else {
      setDescricao("")
      setValor("")
      setData("")
      setTipo("Entrada")
      setCategoria("OUTROS")
      setMetodo("PIX")
    }
  }, [transacao, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({
        descricao,
        valor: Number.parseFloat(valor),
        data,
        tipoDeTransacao: tipo,
        categoria,
        metodoDePagamento: metodo,
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
            {transacao ? "Editar Transacao" : "Nova Transacao"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="descricao" className="text-foreground">Descricao</Label>
            <Input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Supermercado, Salario"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="valor-tx" className="text-foreground">Valor (R$)</Label>
              <Input
                id="valor-tx"
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="data-tx" className="text-foreground">Data</Label>
              <Input
                id="data-tx"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Tipo</Label>
            <Select
              value={tipo}
              onValueChange={(v) => setTipo(v as TipoDeTransacao)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_TX.map((t) => (
                  <SelectItem key={t} value={t}>
                    {TIPO_TRANSACAO_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Categoria</Label>
              <Select
                value={categoria}
                onValueChange={(v) => setCategoria(v as Categoria)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORIA_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Metodo de Pagamento</Label>
              <Select
                value={metodo}
                onValueChange={(v) => setMetodo(v as MetodoDePagamento)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {METODOS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {METODO_PAGAMENTO_LABELS[m]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              {loading ? "Salvando..." : transacao ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
