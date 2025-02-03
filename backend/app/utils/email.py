from flask import current_app
from flask_mail import Mail, Message

mail = Mail()

def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

def send_email(subject, recipient, html_body):
    msg = Message(
        subject,
        sender=current_app.config['MAIL_DEFAULT_SENDER'],
        recipients=[recipient]
    )
    msg.html = html_body
    
    # Send email asynchronously
    Thread(
        target=send_async_email,
        args=(current_app._get_current_object(), msg)
    ).start()

def send_order_confirmation(order, user):
    """Send order confirmation email to user"""
    msg = Message(
        'Order Confirmation - EdHaus Store',
        recipients=[user.email]
    )
    msg.body = f'''
    Dear {user.name},

    Thank you for your order! Here are your order details:

    Order Number: {order.id}
    Total Amount: KES {order.total_amount:,.2f}
    Status: {order.status}

    We will notify you when your order has been shipped.

    Best regards,
    EdHaus Store Team
    '''
    mail.send(msg)

def send_order_status_update(order, user):
    """Send order status update email to user"""
    msg = Message(
        f'Order Status Update - EdHaus Store',
        recipients=[user.email]
    )
    msg.body = f'''
    Dear {user.name},

    Your order (#{order.id}) status has been updated to: {order.status}

    {f"Tracking Number: {order.tracking_number}" if order.tracking_number else ""}

    You can track your order on our website.

    Best regards,
    EdHaus Store Team
    '''
    mail.send(msg)
