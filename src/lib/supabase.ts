import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getHouseCounts = async () => {
  // Chamada SEGURA via RPC: Obtém apenas os totais por casa.
  // Nenhum dado sensível (nome, casa individual) é enviado ao navegador.
  const { data, error } = await supabase.rpc('get_house_counts');

  if (error) {
    console.error('Erro ao buscar contagens (seguro):', error);
    return {
      AGOLGO: 0,
      FILINI: 0,
      KALIDA: 0,
      PERIPOU: 0,
      KONIPAK: 0,
      OCTANI: 0,
    };
  }

  const counts: Record<string, number> = {
    AGOLGO: 0,
    FILINI: 0,
    KALIDA: 0,
    PERIPOU: 0,
    KONIPAK: 0,
    OCTANI: 0,
  };

  data?.forEach((row: { house_id: string; count: number }) => {
    if (counts[row.house_id] !== undefined) {
      counts[row.house_id] = Number(row.count);
    }
  });

  return counts;
};

export const submitSorting = async (name: string, houseId: string) => {
  const { data, error } = await supabase
    .from('responses')
    .insert([{ name, house_id: houseId }]);

  return { data, error };
};

export const getAllResponses = async () => {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

export const updateResponse = async (id: string, name: string, houseId: string) => {
  const { data, error } = await supabase
    .from('responses')
    .update({ name, house_id: houseId })
    .eq('id', id);

  return { data, error };
};

export const deleteResponse = async (id: string) => {
  const { data, error } = await supabase
    .from('responses')
    .delete()
    .eq('id', id);

  return { data, error };
};
