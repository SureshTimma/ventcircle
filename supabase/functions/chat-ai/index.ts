
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    // First, analyze the emotion
    const emotionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an emotion analyzer. Respond with a single word emotion that best describes the message. Choose from: happy, sad, angry, anxious, neutral, excited, confused, or frustrated.'
          },
          { role: 'user', content: message }
        ],
      }),
    });

    const emotionData = await emotionResponse.json();
    const emotion = emotionData.choices[0].message.content.toLowerCase().trim();

    // Then, generate the AI response
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an empathetic and supportive friend. Provide brief, caring responses to help users process their emotions. Keep responses under 2-3 sentences.'
          },
          { role: 'user', content: `The user is feeling ${emotion} and said: ${message}` }
        ],
      }),
    });

    const responseData = await aiResponse.json();
    const aiMessage = responseData.choices[0].message.content;

    // Get the user's nickname
    const { data: userData } = await supabase
      .from('anonymous_users')
      .select('nickname')
      .eq('id', userId)
      .single();

    // Store both the user's message and AI response
    const { data: messages, error } = await supabase
      .from('messages')
      .insert([
        {
          content: message,
          sender_id: userId,
          sender_name: userData.nickname,
          emotion: emotion,
          is_ai: false
        },
        {
          content: aiMessage,
          sender_id: 'ai',
          sender_name: 'AI Assistant',
          is_ai: true
        }
      ]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        emotion,
        aiMessage,
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
