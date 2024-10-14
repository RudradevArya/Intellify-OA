import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { data, error } = await supabase
    .from('dashboard_metrics')
    .select('*');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const { metric_name, metric_value, user_id } = await request.json();
  const { data, error } = await supabase
    .from('dashboard_metrics')
    .insert([{ metric_name, metric_value, user_id }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

