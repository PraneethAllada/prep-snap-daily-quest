// src/lib/functions.ts
import { supabase } from "./supabase";

const base = import.meta.env.VITE_FUNCTIONS_URL as string;

async function authHeader() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Not signed in");
  return { Authorization: `Bearer ${token}` };
}

export async function getQuizToday() {
  const headers = await authHeader();
  const res = await fetch(`${base}/get-quiz-today`, { headers });
  if (!res.ok) throw new Error(`get-quiz-today failed: ${res.status}`);
  return res.json() as Promise<{
    attemptId: number;
    questions: Array<{
      id: number;
      stem: string;
      options: { key: "A"|"B"|"C"|"D"; text: string }[];
      topic?: string | null;
    }>;
  }>;
}

export async function submitQuiz(payload: {
  attemptId: number;
  finishedAtISO?: string;
  items: { questionId: number; choice: "A"|"B"|"C"|"D"; timeMs?: number; idx?: number }[];
}) {
  const headers = await authHeader();
  const res = await fetch(`${base}/submit-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`submit-quiz failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<{ score: number; earned: number; flags: string[] }>;
}
