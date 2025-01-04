import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!; // Use the service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseKey);

type KeepAliveResponse = {
  message: string;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<KeepAliveResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Insert a simple row into the keep_alive table
    const { data, error } = await supabase
      .from('keep_alive') // Replace with your table name
      .insert([{ timestamp: new Date().toISOString() }]); // Adjust columns as needed

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: 'Keep-alive successful', data });
  } catch (error: any) {
    console.error('Error in keep-alive:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
