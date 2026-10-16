import { supabase } from '@/lib/supabase';
import type { AccountSource, Holding, PendingMovement, HistoricalSnapshot } from '@/types/finance';

export const FinanceDataService = {
  // 1. Obtener plataformas y cuentas
  async getAccounts(): Promise<AccountSource[]> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select(`
          id,
          name,
          account_category,
          currency,
          internal_cash,
          created_at,
          financial_sources (
            name,
            provider
          )
        `);

      if (error || !data) return [];

      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.account_category as any,
        currency: item.currency as any,
        amount: Number(item.internal_cash || 0),
        date: new Date(item.created_at).toLocaleDateString('es-CO'),
        institution: item.financial_sources?.name || 'Manual',
      }));
    } catch {
      return [];
    }
  },

  // 2. Obtener posiciones del corte activo
  async getHoldings(): Promise<Holding[]> {
    try {
      const { data, error } = await supabase
        .from('positions')
        .select(`
          quantity,
          market_value,
          assets (
            symbol,
            name
          )
        `)
        .order('market_value', { ascending: false });

      if (error || !data || data.length === 0) return [];

      return data.map((pos: any) => ({
        symbol: pos.assets?.symbol || 'UNKNOWN',
        name: pos.assets?.name || 'Activo',
        quantity: Number(pos.quantity),
        marketValueUSD: Number(pos.market_value),
      }));
    } catch {
      return [];
    }
  },

  // 3. Obtener movimientos pendientes por conciliar
  async getMovements(): Promise<PendingMovement[]> {
    try {
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (error || !data) return [];

      return data.map((m: any) => ({
        id: m.id,
        date: new Date(m.transaction_date).toLocaleDateString('es-CO'),
        amountUSD: Number(m.amount),
        origin: m.external_reference || 'Comprobante',
        description: m.description,
        status: m.reconciliation_status,
      }));
    } catch {
      return [];
    }
  },

  // 4. Obtener snapshots históricos de balance
  async getSnapshots(): Promise<HistoricalSnapshot[]> {
    try {
      const { data, error } = await supabase
        .from('account_snapshots')
        .select('*')
        .order('as_of_date', { ascending: true });

      if (error || !data) return [];

      return data.map((s: any) => ({
        date: s.as_of_date,
        label: `${s.as_of_date} · US$ ${s.total_balance}`,
        balanceUSD: Number(s.total_balance),
        securitiesUSD: Number(s.securities_value),
        cashUSD: Number(s.cash_value),
      }));
    } catch {
      return [];
    }
  },

  // 5. Guardar una nueva cuenta
  async createAccount(acc: Omit<AccountSource, 'id'>, ownerId: string): Promise<string | null> {
    try {
      // 1. Obtener o crear source
      const { data: source } = await supabase
        .from('financial_sources')
        .select('id')
        .eq('owner_id', ownerId)
        .eq('name', acc.name)
        .maybeSingle();

      let sourceId = source?.id;
      if (!sourceId) {
        const { data: newSource } = await supabase
          .from('financial_sources')
          .insert({
            owner_id: ownerId,
            name: acc.name,
            provider: acc.institution || 'Directo',
            institution_type: acc.type === 'investments' ? 'brokerage' : 'bank',
            currency: acc.currency,
          })
          .select('id')
          .single();
        sourceId = newSource?.id;
      }

      if (!sourceId) return null;

      const { data: newAcc, error } = await supabase
        .from('accounts')
        .insert({
          owner_id: ownerId,
          source_id: sourceId,
          name: acc.name,
          account_category: acc.type,
          currency: acc.currency,
          internal_cash: acc.amount,
        })
        .select('id')
        .single();

      if (error) return null;
      return newAcc?.id || null;
    } catch {
      return null;
    }
  },
};
