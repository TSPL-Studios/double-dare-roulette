import { supabase } from "@/integrations/supabase/client";

export type Dare = {
  id: number;
  title: string;
  description: string | null;
};

async function fetchRandomFromTable(table: 'normal_dares' | 'punishment_dares'): Promise<Dare | null> {
  // Simple approach: fetch up to 100 and pick one client-side at random
  const { data, error } = await supabase
    .from(table)
    .select("id,title,description")
    .limit(100);

  if (error) throw new Error(error.message);
  if (!data || data.length === 0) return null;

  const random = data[Math.floor(Math.random() * data.length)];
  return random as Dare;
}

export async function getRandomNormalDare() {
  return fetchRandomFromTable("normal_dares");
}

export async function getRandomPunishmentDare() {
  return fetchRandomFromTable("punishment_dares");
}
