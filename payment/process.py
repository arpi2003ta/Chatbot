import stripe

# Replace with your actual Stripe API keys
stripe.api_key = "your_stripe_secret_key"

def process_payment(payment_data):
    try:
        # Create a payment intent
        intent = stripe.PaymentIntent.create(
            amount=payment_data['amount'],
            currency=payment_data['currency'],
            payment_method=payment_data['payment_method_id'],
            confirmation_method='manual',
            confirm=True
        )
        return {'status': 'success', 'payment_intent_id': intent.id}
    except stripe.error.StripeError as e:
        raise e

def handle_payment_error(e):
    return {'status': 'error', 'message': str(e)}
