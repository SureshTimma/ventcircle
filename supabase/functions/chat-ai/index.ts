
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, userId } = await req.json()

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user's nickname
    const { data: userData, error: userError } = await supabaseClient
      .from('anonymous_users')
      .select('nickname')
      .eq('id', userId)
      .single()

    if (userError) throw userError

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Create user message
    const { error: messageError } = await supabaseClient
      .from('messages')
      .insert([
        {
          content: message,
          sender_id: userId,
          sender_name: userData.nickname,
          is_ai: false
        }
      ])

    if (messageError) throw messageError

    // Analyze message sentiment and generate AI response
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compassionate and supportive listener. Your responses should be empathetic, non-judgmental, and encouraging. If you detect signs of serious distress or suicidal thoughts, gently suggest professional help and emergency resources."
        },
        {
          role: "user",
          content: message
        }
      ],
    })

    const aiResponse = completion.data.choices[0].message?.content

    if (aiResponse) {
      // Store AI response
      await supabaseClient
        .from('messages')
        .insert([
          {
            content: aiResponse,
            sender_id: 'ai',
            sender_name: 'VentCircle Assistant',
            is_ai: true
          }
        ])
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
