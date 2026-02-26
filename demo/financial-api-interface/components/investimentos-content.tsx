"use client"

import { useState, useMemo } from "react"
import { Plus, Pencil, Trash2, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useInvestimentos } from "@/hooks/use-investimentos"
import { InvestimentoForm } from "./investimento-form"
import type {
  Investimento,
  InvestimentoRequest,
  TipoInvestimento,
} from "@/lib/types"
import { TIPO_INVESTIMENTO_LABELS } from "@/lib/types"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

const TIPO_COLORS: Record<TipoInvestimento, string> = {
  ACOES: "bg-chart-1/15 text-chart-1 border-chart-1/20",
  FUNDOS_IMOBILIARIOS: "bg-chart-2/15 text-chart-2 border-chart-2/20",
  RENDA_FIXA: "bg-chart-3/15 text-chart-3 border-chart-3/20",
  CRIPTOMOEDAS: "bg-chart-4/15 text-chart-4 border-chart-4/20",
  INVESTIMENTO_EXTERIOR: "bg-chart-5/15 text-chart-5 border-chart-5/20",
}

export function InvestimentosContent() {
  const { investimentos, isLoading, criar, atualizar, deletar } =
    useInvestimentos()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Investimento | null>(null)
  const [deleting, setDeleting] = useState<Investimento | null>(null)
  const [search, setSearch] = useState("")
  const [filterTipo, setFilterTipo] = useState<string>("all")

  const filtered = useMemo(() => {
    return investimentos.filter((inv) => {
      const matchSearch = inv.NomeInvestimento.toLowerCase().includes(
        search.toLowerCase()
      )
      const matchTipo =
        filterTipo === "all" || inv.TipoInvestimento === filterTipo
      return matchSearch && matchTipo
    })
  }, [investimentos, search, filterTipo])

  const handleSubmit = async (data: InvestimentoRequest) => {
    if (editing) {
      await atualizar(editing.id, data)
    } else {
      await criar(data)
    }
    setEditing(null)
  }

  const handleDelete = async () => {
    if (deleting) {
      await deletar(deleting.id)
      setDeleting(null)
    }
  }

  const totalInvestido = filtered.reduce(
    (acc, i) => acc + i.ValorInvestimento * (i.quantidade || 1),
    0
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Investimentos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie sua carteira de investimentos
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setFormOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Investimento
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="ACOES">Acoes</SelectItem>
                    <SelectItem value="FUNDOS_IMOBILIARIOS">
                      Fundos Imobiliarios
                    </SelectItem>
                    <SelectItem value="RENDA_FIXA">Renda Fixa</SelectItem>
                    <SelectItem value="CRIPTOMOEDAS">Criptomoedas</SelectItem>
                    <SelectItem value="INVESTIMENTO_EXTERIOR">
                      Investimento Exterior
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Total: <span className="text-foreground">{formatCurrency(totalInvestido)}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <p className="text-sm">Nenhum investimento encontrado</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => {
                  setSearch("")
                  setFilterTipo("all")
                }}
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor Unit.</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium text-foreground">
                      {inv.NomeInvestimento}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={TIPO_COLORS[inv.TipoInvestimento]}
                      >
                        {TIPO_INVESTIMENTO_LABELS[inv.TipoInvestimento]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(inv.ValorInvestimento)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {inv.quantidade}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium text-foreground">
                      {formatCurrency(
                        inv.ValorInvestimento * (inv.quantidade || 1)
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(inv.DataInvestimento).toLocaleDateString(
                        "pt-BR"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setEditing(inv)
                            setFormOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleting(inv)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Deletar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <InvestimentoForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditing(null)
        }}
        onSubmit={handleSubmit}
        investimento={editing}
      />

      <AlertDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusao</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o investimento{" "}
              <strong>{deleting?.NomeInvestimento}</strong>? Esta acao nao pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
