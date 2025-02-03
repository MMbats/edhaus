from app import create_app
from app.models import db, Product, Category

def init_products():
    app = create_app()
    with app.app_context():
        # Get category IDs
        steel_cat = Category.query.filter_by(name='Steel').first()
        wood_cat = Category.query.filter_by(name='Wood & Accessories').first()
        wire_cat = Category.query.filter_by(name='Wire Products').first()
        iron_sheets_cat = Category.query.filter_by(name='Iron Sheets (Mabati)').first()
        cement_cat = Category.query.filter_by(name='Cement').first()
        plumbing_cat = Category.query.filter_by(name='Plumbing').first()
        
        # Steel products
        steel_products = [
            Product(
                name='Reinforced Steel Bar 12mm',
                description='12mm diameter reinforced steel bar for construction',
                price=1200.00,
                stock=500,
                category_id=steel_cat.id
            ),
            Product(
                name='Structural Steel Beam IPE 200',
                description='IPE 200 structural steel beam for heavy construction',
                price=15000.00,
                stock=50,
                category_id=steel_cat.id
            ),
            Product(
                name='Steel Sheet 2mm',
                description='2mm thick steel sheet for industrial use',
                price=3000.00,
                stock=200,
                category_id=steel_cat.id
            )
        ]
        
        # Wood products
        wood_products = [
            Product(
                name='Plywood Sheet 18mm',
                description='18mm thick plywood sheet for construction',
                price=2500.00,
                stock=300,
                category_id=wood_cat.id
            ),
            Product(
                name='Timber Beam 6x2',
                description='6x2 inch timber beam for construction',
                price=800.00,
                stock=1000,
                category_id=wood_cat.id
            ),
            Product(
                name='MDF Board 12mm',
                description='12mm medium-density fiberboard',
                price=1800.00,
                stock=400,
                category_id=wood_cat.id
            )
        ]
        
        # Wire products
        wire_products = [
            Product(
                name='Binding Wire 2mm',
                description='2mm galvanized binding wire',
                price=250.00,
                stock=1000,
                category_id=wire_cat.id
            ),
            Product(
                name='Chain Link Fence 6ft',
                description='6ft high chain link fence',
                price=1500.00,
                stock=200,
                category_id=wire_cat.id
            ),
            Product(
                name='Welded Mesh 6x6',
                description='6x6 inch welded wire mesh',
                price=3500.00,
                stock=150,
                category_id=wire_cat.id
            )
        ]
        
        # Iron sheets products
        iron_sheets_products = [
            Product(
                name='Corrugated Iron Sheet 28G',
                description='28 gauge corrugated iron sheet',
                price=850.00,
                stock=500,
                category_id=iron_sheets_cat.id
            ),
            Product(
                name='Box Profile Sheet 30G',
                description='30 gauge box profile iron sheet',
                price=950.00,
                stock=400,
                category_id=iron_sheets_cat.id
            ),
            Product(
                name='Polycarbonate Sheet Clear',
                description='Clear polycarbonate roofing sheet',
                price=2500.00,
                stock=200,
                category_id=iron_sheets_cat.id
            )
        ]
        
        # Cement products
        cement_products = [
            Product(
                name='Portland Cement 50kg',
                description='50kg bag of ordinary portland cement',
                price=750.00,
                stock=1000,
                category_id=cement_cat.id
            ),
            Product(
                name='Rapid Hardening Cement 50kg',
                description='50kg bag of rapid hardening cement',
                price=850.00,
                stock=500,
                category_id=cement_cat.id
            ),
            Product(
                name='White Cement 40kg',
                description='40kg bag of white cement',
                price=1200.00,
                stock=300,
                category_id=cement_cat.id
            )
        ]
        
        # Plumbing products
        plumbing_products = [
            Product(
                name='PVC Pipe 4"',
                description='4 inch PVC drainage pipe',
                price=450.00,
                stock=800,
                category_id=plumbing_cat.id
            ),
            Product(
                name='Ball Valve 1"',
                description='1 inch brass ball valve',
                price=350.00,
                stock=500,
                category_id=plumbing_cat.id
            ),
            Product(
                name='Water Tank 1000L',
                description='1000 liter plastic water storage tank',
                price=8500.00,
                stock=50,
                category_id=plumbing_cat.id
            )
        ]
        
        # Add all products
        all_products = (
            steel_products +
            wood_products +
            wire_products +
            iron_sheets_products +
            cement_products +
            plumbing_products
        )
        
        db.session.add_all(all_products)
        db.session.commit()
        
        print(f"Added {len(all_products)} sample products successfully!")

if __name__ == '__main__':
    init_products()
