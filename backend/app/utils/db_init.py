from ..models import db, Category, Product

def init_categories():
    """Initialize the database with categories and subcategories"""
    try:
        # Check if categories already exist
        if Category.query.first():
            return
        
        # 1. BUILDING MATERIALS
        building_materials = Category(
            name="BUILDING MATERIALS",
            description="Construction materials for building projects",
            slug="building-materials"
        )
        db.session.add(building_materials)
        db.session.flush()  # Get ID for parent category

        # Building Materials subcategories
        steel = Category(
            name="Steel",
            description="Steel products for construction",
            parent_id=building_materials.id,
            slug="steel"
        )
        db.session.add(steel)

        wood = Category(
            name="Wood & Accessories",
            description="Wood products and related accessories",
            parent_id=building_materials.id,
            slug="wood-accessories"
        )
        db.session.add(wood)

        wire = Category(
            name="Wire Products",
            description="Wire-based construction materials",
            parent_id=building_materials.id,
            slug="wire-products"
        )
        db.session.add(wire)

        iron_sheets = Category(
            name="Iron Sheets",
            description="Iron sheets for roofing and construction",
            parent_id=building_materials.id,
            slug="iron-sheets"
        )
        db.session.add(iron_sheets)

        cement = Category(
            name="Cement",
            description="Various types of cement",
            parent_id=building_materials.id,
            slug="cement"
        )
        db.session.add(cement)

        plumbing = Category(
            name="Plumbing",
            description="Plumbing materials and accessories",
            parent_id=building_materials.id,
            slug="plumbing"
        )
        db.session.add(plumbing)

        coast_calcium = Category(
            name="Coast Calcium",
            description="Calcium-based construction materials",
            parent_id=building_materials.id,
            slug="coast-calcium"
        )
        db.session.add(coast_calcium)

        # 2. FINISHING MATERIALS
        finishing_materials = Category(
            name="FINISHING MATERIALS",
            description="Materials for finishing and decoration",
            slug="finishing-materials"
        )
        db.session.add(finishing_materials)
        db.session.flush()

        # Finishing Materials subcategories
        bathroom = Category(
            name="Bathroom and Ceramics",
            description="Bathroom fixtures and ceramic products",
            parent_id=finishing_materials.id,
            slug="bathroom-ceramics"
        )
        db.session.add(bathroom)

        terrazzo = Category(
            name="Terrazzo",
            description="Terrazzo flooring and related products",
            parent_id=finishing_materials.id,
            slug="terrazzo"
        )
        db.session.add(terrazzo)

        tiles = Category(
            name="Tiles and Accessories",
            description="Various types of tiles and accessories",
            parent_id=finishing_materials.id,
            slug="tiles-accessories"
        )
        db.session.add(tiles)

        paint = Category(
            name="Paint & Accessories",
            description="Paints and painting accessories",
            parent_id=finishing_materials.id,
            slug="paint-accessories"
        )
        db.session.add(paint)

        # 3. ADHESIVES AND SEALANTS
        adhesives = Category(
            name="ADHESIVES AND SEALANTS",
            description="Adhesive and sealant products",
            slug="adhesives-sealants"
        )
        db.session.add(adhesives)
        db.session.flush()

        # Adhesives subcategories
        glue = Category(
            name="Glue and Adhesive",
            description="Various types of glues and adhesives",
            parent_id=adhesives.id,
            slug="glue-adhesive"
        )
        db.session.add(glue)

        waterproofing = Category(
            name="Waterproofing Products",
            description="Products for waterproofing",
            parent_id=adhesives.id,
            slug="waterproofing"
        )
        db.session.add(waterproofing)

        antitermite = Category(
            name="Antitermite",
            description="Termite prevention products",
            parent_id=adhesives.id,
            slug="antitermite"
        )
        db.session.add(antitermite)

        # 4. HARDWARE & TOOLS
        hardware = Category(
            name="HARDWARE & TOOLS",
            description="Hardware items and tools",
            slug="hardware-tools"
        )
        db.session.add(hardware)
        db.session.flush()

        # Hardware subcategories
        bolts = Category(
            name="Bolts & nuts",
            description="Various types of bolts and nuts",
            parent_id=hardware.id,
            slug="bolts-nuts"
        )
        db.session.add(bolts)

        carpentry = Category(
            name="Carpentry",
            description="Carpentry tools and equipment",
            parent_id=hardware.id,
            slug="carpentry"
        )
        db.session.add(carpentry)

        tanks = Category(
            name="Tanks",
            description="Various types of storage tanks",
            parent_id=hardware.id,
            slug="tanks"
        )
        db.session.add(tanks)

        # Commit the changes
        db.session.commit()
    except Exception as e:
        print(f"Error initializing categories: {e}")
        db.session.rollback()

def init_sample_products():
    """Initialize the database with sample products"""
    try:
        # Check if products already exist
        if Product.query.first():
            return
            
        # Get category IDs
        steel_category = Category.query.filter_by(name="Steel").first()
        wood_category = Category.query.filter_by(name="Wood & Accessories").first()

        if not steel_category or not wood_category:
            print("Categories not found. Please initialize categories first.")
            return

        # Sample steel products
        products = [
            Product(
                name="BRC 65std",
                description="This is a welded steel mesh made of longitudinal (line wire) and transverse (cross wire) bars welded together for use in reinforcement of foundations during construction.",
                price=15468,
                stock=100,
                category_id=steel_category.id,
                sku="STL-BRC-001",
                brand="Steel Masters",
                manufacturer="Steel Corp",
                weight=65.0,
                dimensions="6m x 2.4m"
            ),
            Product(
                name="Round 12",
                description="12mm diameter steel reinforcement bar for concrete structures.",
                price=1443,
                stock=200,
                category_id=steel_category.id,
                sku="STL-RND-012",
                brand="Steel Masters",
                manufacturer="Steel Corp",
                weight=12.0,
                dimensions="12m"
            ),
            Product(
                name="Tube 2 * 2 * 2mm",
                description="Square steel tube for structural applications.",
                price=2258,
                stock=150,
                category_id=steel_category.id,
                sku="STL-TUB-222",
                brand="Steel Masters",
                manufacturer="Steel Corp",
                weight=2.0,
                dimensions="2in x 2in x 2mm"
            )
        ]

        for product in products:
            db.session.add(product)

        # Commit the changes
        db.session.commit()
    except Exception as e:
        print(f"Error initializing products: {e}")
        db.session.rollback()

def init_db():
    """Initialize the database with categories and sample products"""
    try:
        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()
        
        init_categories()
        init_sample_products()
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.session.rollback()
