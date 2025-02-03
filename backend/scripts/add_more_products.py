from app import create_app
from app.models import db, Product, Category

def add_more_products():
    app = create_app()
    with app.app_context():
        # Get remaining category IDs
        coast_calcium_cat = Category.query.filter_by(name='Coast Calcium').first()
        bathroom_cat = Category.query.filter_by(name='Bathroom and Ceramics').first()
        terrazzo_cat = Category.query.filter_by(name='Terrazzo').first()
        tiles_cat = Category.query.filter_by(name='Tiles and Accessories').first()
        paint_cat = Category.query.filter_by(name='Paint & Accessories').first()
        glue_cat = Category.query.filter_by(name='Glue and Adhesive').first()
        waterproofing_cat = Category.query.filter_by(name='Waterproofing Products').first()
        sealants_cat = Category.query.filter_by(name='Sealants').first()
        antitermite_cat = Category.query.filter_by(name='Antitermite').first()
        bolts_cat = Category.query.filter_by(name='Bolts & Nuts').first()
        carpentry_cat = Category.query.filter_by(name='Carpentry').first()
        
        # Coast Calcium products
        coast_calcium_products = [
            Product(
                name='Agricultural Lime 50kg',
                description='50kg bag of agricultural lime for soil treatment',
                price=600.00,
                stock=1000,
                category_id=coast_calcium_cat.id
            ),
            Product(
                name='Industrial Lime 25kg',
                description='25kg bag of industrial grade lime',
                price=450.00,
                stock=800,
                category_id=coast_calcium_cat.id
            ),
            Product(
                name='Hydrated Lime 20kg',
                description='20kg bag of hydrated lime',
                price=350.00,
                stock=1200,
                category_id=coast_calcium_cat.id
            )
        ]
        
        # Bathroom and Ceramics products
        bathroom_products = [
            Product(
                name='Wall Tiles White 30x60cm',
                description='White ceramic wall tiles, 30x60cm',
                price=1200.00,
                stock=500,
                category_id=bathroom_cat.id
            ),
            Product(
                name='Floor Tiles Grey 60x60cm',
                description='Grey porcelain floor tiles, 60x60cm',
                price=1800.00,
                stock=400,
                category_id=bathroom_cat.id
            ),
            Product(
                name='Toilet Set Complete',
                description='Complete toilet set with cistern and seat',
                price=15000.00,
                stock=50,
                category_id=bathroom_cat.id
            )
        ]
        
        # Terrazzo products
        terrazzo_products = [
            Product(
                name='Terrazzo Flooring Mix',
                description='Pre-mixed terrazzo flooring compound',
                price=2500.00,
                stock=200,
                category_id=terrazzo_cat.id
            ),
            Product(
                name='Decorative Terrazzo Chips',
                description='Colored terrazzo chips for decoration',
                price=1200.00,
                stock=300,
                category_id=terrazzo_cat.id
            ),
            Product(
                name='Precast Terrazzo Tiles',
                description='Ready-made terrazzo tiles 60x60cm',
                price=3500.00,
                stock=150,
                category_id=terrazzo_cat.id
            )
        ]
        
        # Tiles products
        tiles_products = [
            Product(
                name='Ceramic Floor Tiles 40x40cm',
                description='Standard ceramic floor tiles',
                price=950.00,
                stock=600,
                category_id=tiles_cat.id
            ),
            Product(
                name='Porcelain Tiles 60x60cm',
                description='High-quality porcelain tiles',
                price=2200.00,
                stock=300,
                category_id=tiles_cat.id
            ),
            Product(
                name='Tile Adhesive 20kg',
                description='Strong tile adhesive for all types of tiles',
                price=850.00,
                stock=400,
                category_id=tiles_cat.id
            ),
            Product(
                name='Tile Grout 5kg',
                description='Waterproof tile grout',
                price=450.00,
                stock=700,
                category_id=tiles_cat.id
            )
        ]
        
        # Paint products
        paint_products = [
            Product(
                name='Interior Paint White 20L',
                description='Premium white interior paint',
                price=3500.00,
                stock=200,
                category_id=paint_cat.id
            ),
            Product(
                name='Exterior Paint Weather Guard 20L',
                description='Weather-resistant exterior paint',
                price=4500.00,
                stock=150,
                category_id=paint_cat.id
            ),
            Product(
                name='Paint Brush Set Professional',
                description='Set of 5 professional paint brushes',
                price=1200.00,
                stock=300,
                category_id=paint_cat.id
            ),
            Product(
                name='Paint Roller Kit',
                description='Complete paint roller kit with tray',
                price=800.00,
                stock=400,
                category_id=paint_cat.id
            )
        ]
        
        # Adhesives products
        adhesives_products = [
            Product(
                name='Wood Glue 1L',
                description='Strong wood adhesive',
                price=450.00,
                stock=600,
                category_id=glue_cat.id
            ),
            Product(
                name='Construction Adhesive 5kg',
                description='Heavy-duty construction adhesive',
                price=1200.00,
                stock=300,
                category_id=glue_cat.id
            ),
            Product(
                name='Epoxy Resin Kit',
                description='Two-component epoxy resin kit',
                price=2500.00,
                stock=150,
                category_id=glue_cat.id
            )
        ]
        
        # Waterproofing products
        waterproofing_products = [
            Product(
                name='Liquid Membrane 20L',
                description='Waterproof liquid membrane coating',
                price=3500.00,
                stock=200,
                category_id=waterproofing_cat.id
            ),
            Product(
                name='Bitumen Sheet 1x10m',
                description='Self-adhesive bitumen waterproofing sheet',
                price=2800.00,
                stock=150,
                category_id=waterproofing_cat.id
            )
        ]
        
        # Sealants products
        sealants_products = [
            Product(
                name='Silicone Sealant Clear',
                description='Clear silicone sealant for general use',
                price=350.00,
                stock=800,
                category_id=sealants_cat.id
            ),
            Product(
                name='Construction Sealant Grey',
                description='Heavy-duty construction sealant',
                price=450.00,
                stock=600,
                category_id=sealants_cat.id
            )
        ]
        
        # Antitermite products
        antitermite_products = [
            Product(
                name='Termite Treatment Spray 5L',
                description='Professional termite treatment spray',
                price=2500.00,
                stock=200,
                category_id=antitermite_cat.id
            ),
            Product(
                name='Wood Treatment Solution 1L',
                description='Preventive wood treatment against termites',
                price=800.00,
                stock=400,
                category_id=antitermite_cat.id
            ),
            Product(
                name='Soil Treatment Chemical 10L',
                description='Pre-construction soil treatment',
                price=3500.00,
                stock=150,
                category_id=antitermite_cat.id
            )
        ]
        
        # Bolts & Nuts products
        bolts_products = [
            Product(
                name='Stainless Steel Bolt Set M10',
                description='Set of M10 stainless steel bolts',
                price=450.00,
                stock=1000,
                category_id=bolts_cat.id
            ),
            Product(
                name='High-Tensile Nut Set M12',
                description='Set of M12 high-tensile nuts',
                price=350.00,
                stock=1200,
                category_id=bolts_cat.id
            ),
            Product(
                name='Washer Pack 100pcs',
                description='Pack of 100 standard washers',
                price=200.00,
                stock=2000,
                category_id=bolts_cat.id
            )
        ]
        
        # Carpentry products
        carpentry_products = [
            Product(
                name='Circular Saw 7"',
                description='Professional 7" circular saw',
                price=12000.00,
                stock=50,
                category_id=carpentry_cat.id
            ),
            Product(
                name='Chisel Set 6pcs',
                description='Set of 6 woodworking chisels',
                price=2500.00,
                stock=200,
                category_id=carpentry_cat.id
            ),
            Product(
                name='Power Drill Kit',
                description='Complete power drill kit with bits',
                price=8500.00,
                stock=100,
                category_id=carpentry_cat.id
            )
        ]
        
        # Add all products
        all_products = (
            coast_calcium_products +
            bathroom_products +
            terrazzo_products +
            tiles_products +
            paint_products +
            adhesives_products +
            waterproofing_products +
            sealants_products +
            antitermite_products +
            bolts_products +
            carpentry_products
        )
        
        db.session.add_all(all_products)
        db.session.commit()
        
        print(f"Added {len(all_products)} more products successfully!")

if __name__ == '__main__':
    add_more_products()
