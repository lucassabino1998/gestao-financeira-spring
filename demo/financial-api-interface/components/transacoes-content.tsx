"use client"

import { useState, useMemo } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  SlidersHorizontal,
  ArrowUpCircle,
  ArrowDownCircle,
  CalendarIcon,
  X,
} from "lucide-react"
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
import { useTransacoes } from "@/hooks/use-transacoes"
import { TransacaoForm } from "./transacao-form"
import type { Transacao, TransacaoRequest } from "@/lib/types"
import {
  CATEGORIA_LABELS,
  METODO_PAGAMENTO_LABELS,
} from "@/lib/types"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function TransacoesContent() {
  const { transacoes, isLoading, criar, atualizar, deletar } = useTransacoes()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Transacao | null>(null)
  const [deleting, setDeleting] = useState<Transacao | null>(null)
  const [search, setSearch] = useState("")
  const [filterTipo, setFilterTipo] = useState<string>("all")
  const [filterCategoria, setFilterCategoria] = useState<string>("all")
  const [dataInicio, setDataInicio] = useState<string>("")
  const [dataFim, setDataFim] = useState<string>("")

  const hasDateFilter = dataInicio !== "" || dataFim !== ""

  const filtered = useMemo(() => {
    return transacoes.filter((tx) => {
      const matchSearch = tx.descricao
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchTipo =
        filterTipo === "all" || tx.tipoDeTransacao === filterTipo
      const matchCategoria =
        filterCategoria === "all" || tx.categoria === filterCategoria

      let matchData = true
      if (dataInicio) {
        matchData = matchData && tx.data >= dataInicio
      }
      if (dataFim) {
        matchData = matchData && tx.data <= dataFim
      }

      return matchSearch && matchTipo && matchCategoria && matchData
    })
  }, [transacoes, search, filterTipo, filterCategoria, dataInicio, dataFim])

  const handleSubmit = async (data: TransacaoRequest) => {
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

  const totalEntradas = filtered
    .filter((t) => t.tipoDeTransacao === "Entrada")
    .reduce((acc, t) => acc + t.valor, 0)
  const totalDespesas = filtered
    .filter((t) => t.tipoDeTransacao === "Despesas")
    .reduce((acc, t) => acc + t.valor, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transacoes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie suas receitas e despesas
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setFormOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Transacao
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <ArrowUpCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Entradas
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(totalEntradas)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <ArrowDownCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Despesas
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(totalDespesas)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descricao..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Entrada">Entrada</SelectItem>
                    <SelectItem value="Despesas">Despesas</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterCategoria}
                  onValueChange={setFilterCategoria}
                >
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas categorias</SelectItem>
                    <SelectItem value="ALIMENTACAO">Alimentacao</SelectItem>
                    <SelectItem value="TRANSPORTE">Transporte</SelectItem>
                    <SelectItem value="MORADIA">Moradia</SelectItem>
                    <SelectItem value="LAZER">Lazer</SelectItem>
                    <SelectItem value="SAUDE">Saude</SelectItem>
                    <SelectItem value="EDUCACAO">Educacao</SelectItem>
                    <SelectItem value="SALARIO">Salario</SelectItem>
                    <SelectItem value="VENDAS">Vendas</SelectItem>
                    <SelectItem value="OUTROS">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Periodo:</span>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="w-40 text-sm"
                  placeholder="Data inicio"
                />
                <span className="text-sm text-muted-foreground">ate</span>
                <Input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="w-40 text-sm"
                  min={dataInicio || undefined}
                />
              </div>
              {hasDateFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setDataInicio("")
                    setDataFim("")
                  }}
                >
                  <X className="mr-1 h-3 w-3" />
                  Limpar datas
                </Button>
              )}
            </div>
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
              <p className="text-sm">Nenhuma transacao encontrada</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => {
                  setSearch("")
                  setFilterTipo("all")
                  setFilterCategoria("all")
                  setDataInicio("")
                  setDataFim("")
                }}
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descricao</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Metodo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium text-foreground">
                      {tx.descricao}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          tx.tipoDeTransacao === "Entrada"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {tx.tipoDeTransacao}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {CATEGORIA_LABELS[tx.categoria]}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {METODO_PAGAMENTO_LABELS[tx.metodoDePagamento]}
                    </TableCell>
                    <TableCell
                      className={`text-right tabular-nums font-medium ${
                        tx.tipoDeTransacao === "Entrada"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {tx.tipoDeTransacao === "Entrada" ? "+" : "-"}
                      {formatCurrency(tx.valor)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(tx.data).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setEditing(tx)
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
                          onClick={() => setDeleting(tx)}
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

      <TransacaoForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditing(null)
        }}
        onSubmit={handleSubmit}
        transacao={editing}
      />

      <AlertDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusao</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a transacao{" "}
              <strong>{deleting?.descricao}</strong>? Esta acao nao pode ser
              desfeita.
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
