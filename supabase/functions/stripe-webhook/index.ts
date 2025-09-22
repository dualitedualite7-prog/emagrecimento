import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'
import { corsHeaders } from '../shared/cors.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!
    )
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.user_id
        const plan = subscription.items.data[0].price.id
        const status = subscription.status
        
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ plano: status === 'active' || status === 'trialing' ? 'premium' : 'gratuito' })
          .eq('id', userId)
          
        if (error) throw error
        break
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.subscription_data?.metadata?.user_id ?? session.client_reference_id;
        const stripeCustomerId = session.customer;

        if (!userId) {
          throw new Error('ID do usuário não encontrado no metadado da sessão.');
        }

        const { error } = await supabaseAdmin
          .from('profiles')
          .update({
            plano: 'premium',
            stripe_customer_id: stripeCustomerId
          })
          .eq('id', userId);
        
        if (error) throw error;
        break;
      }
    }
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
