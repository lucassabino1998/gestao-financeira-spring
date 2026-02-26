"use client"

import React from "react"

import { useMemo } from "react"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowLeftRight,
  DollarSign,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInvestimentos } from "@/hooks/use-investimentos"
import { useTransacoes } from "@/hooks/use-transacoes"
import {
  TIPO_INVESTIMENTO_LABELS,
  CATEGORIA_LABELS,
  type TipoInvestimento,
  type Categoria,
} from "@/lib/types"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

const CHART_COLORS = [
  "hsl(217, 91%, 50%)",
  "hsl(160, 70%, 42%)",
  "hsl(35, 92%, 55%)",
  "hsl(340, 75%, 55%)",
  "hsl(270, 60%, 55%)",
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
}: {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  trend?: "up" | "down" | "neutral"
  trendLabel?: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
            {trendLabel && (
              <div className="flex items-center gap-1 mt-1">
                {trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-success" />
                )}
                {trend === "down" && (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span
                  className={`text-xs font-medium ${
                    trend === "up"
                      ? "text-success"
                      : trend === "down"
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }`}
                >
                  {trendLabel}
                </span>
              </div>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardContent() {
  const { investimentos, isLoading: loadingInv } = useInvestimentos()
  const { transacoes, isLoading: loadingTx } = useTransacoes()

  const stats = useMemo(() => {
    const totalInvestido = investimentos.reduce(
      (acc, i) => acc + (i.ValorInvestimento * (i.quantidade || 1)),
      0
    )
    const totalEntradas = transacoes
      .filter((t) => t.tipoDeTransacao === "Entrada")
      .reduce((acc, t) => acc + t.valor, 0)
    const totalDespesas = transacoes
      .filter((t) => t.tipoDeTransacao === "Despesas")
      .reduce((acc, t) => acc + t.valor, 0)
    const saldo = totalEntradas - totalDespesas

    return { totalInvestido, totalEntradas, totalDespesas, saldo }
  }, [investimentos, transacoes])

  const investimentosPorTipo = useMemo(() => {
    const map = new Map<TipoInvestimento, number>()
    for (const inv of investimentos) {
      const current = map.get(inv.TipoInvestimento) || 0
      map.set(
        inv.TipoInvestimento,
        current + inv.ValorInvestimento * (inv.quantidade || 1)
      )
    }
    return Array.from(map.entries()).map(([tipo, valor]) => ({
      name: TIPO_INVESTIMENTO_LABELS[tipo],
      value: valor,
    }))
  }, [investimentos])

  const despesasPorCategoria = useMemo(() => {
    const map = new Map<Categoria, number>()
    for (const tx of transacoes) {
      if (tx.tipoDeTransacao === "Despesas") {
        const current = map.get(tx.categoria) || 0
        map.set(tx.categoria, current + tx.valor)
      }
    }
    return Array.from(map.entries())
      .map(([cat, valor]) => ({
        name: CATEGORIA_LABELS[cat],
        valor,
      }))
      .sort((a, b) => b.valor - a.valor)
  }, [transacoes])

  if (loadingInv || loadingTx) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visao geral das suas financas
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visao geral das suas financas
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Investido"
          value={formatCurrency(stats.totalInvestido)}
          icon={TrendingUp}
          trend="up"
          trendLabel={`${investimentos.length} ativos`}
        />
        <KpiCard
          title="Entradas"
          value={formatCurrency(stats.totalEntradas)}
          icon={Wallet}
          trend="up"
          trendLabel="receitas"
        />
        <KpiCard
          title="Despesas"
          value={formatCurrency(stats.totalDespesas)}
          icon={ArrowLeftRight}
          trend="down"
          trendLabel="gastos"
        />
        <KpiCard
          title="Saldo"
          value={formatCurrency(stats.saldo)}
          icon={DollarSign}
          trend={stats.saldo >= 0 ? "up" : "down"}
          trendLabel={stats.saldo >= 0 ? "positivo" : "negativo"}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              Investimentos por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {investimentosPorTipo.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                Nenhum investimento cadastrado
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={investimentosPorTipo}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {investimentosPorTipo.map((_, index) => (
                      <Cell
                        key={`cell-${
                          // biome-ignore lint: index as key for chart
                          index
                        }`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(220, 25%, 11%)",
                      border: "1px solid hsl(220, 15%, 20%)",
                      borderRadius: "8px",
                      color: "hsl(220, 10%, 95%)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <BarChart3 className="h-4 w-4 text-primary" />
              Despesas por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            {despesasPorCategoria.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                Nenhuma despesa cadastrada
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={despesasPorCategoria} layout="vertical">
                  <XAxis
                    type="number"
                    tickFormatter={(v) => formatCurrency(v)}
                    tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(220, 25%, 11%)",
                      border: "1px solid hsl(220, 15%, 20%)",
                      borderRadius: "8px",
                      color: "hsl(220, 10%, 95%)",
                    }}
                  />
                  <Bar
                    dataKey="valor"
                    fill="hsl(217, 91%, 50%)"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
