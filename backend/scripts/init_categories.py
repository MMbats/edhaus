from app import create_app
from app.models import db, Category
from datetime import datetime

def init_categories():
    app = create_app()
    with app.app_context():
        # Create main categories
        building_materials = Category(
            name='BUILDING MATERIALS',
            description='Essential materials for construction'
        )
        finishing_materials = Category(
            name='FINISHING MATERIALS',
            description='Materials for final touches and aesthetics'
        )
        adhesives_sealants = Category(
            name='ADHESIVES AND SEALANTS',
            description='Bonding and sealing solutions'
        )
        hardware_tools = Category(
            name='HARDWARE & TOOLS',
            description='Construction tools and hardware supplies'
        )
        
        db.session.add_all([
            building_materials,
            finishing_materials,
            adhesives_sealants,
            hardware_tools
        ])
        db.session.commit()
        
        # Building Materials subcategories
        building_materials_subs = [
            Category(
                name='Steel',
                description='Steel construction materials',
                parent_id=building_materials.id
            ),
            Category(
                name='Wood & Accessories',
                description='Wood and related products',
                parent_id=building_materials.id
            ),
            Category(
                name='Wire Products',
                description='Various wire-based materials',
                parent_id=building_materials.id
            ),
            Category(
                name='Iron Sheets (Mabati)',
                description='Roofing and wall sheets',
                parent_id=building_materials.id
            ),
            Category(
                name='Cement',
                description='Various types of cement',
                parent_id=building_materials.id
            ),
            Category(
                name='Plumbing',
                description='Plumbing materials and accessories',
                parent_id=building_materials.id
            ),
            Category(
                name='Coast Calcium',
                description='Calcium-based construction materials',
                parent_id=building_materials.id
            )
        ]
        
        # Finishing Materials subcategories
        finishing_materials_subs = [
            Category(
                name='Bathroom and Ceramics',
                description='Bathroom fittings and ceramic products',
                parent_id=finishing_materials.id
            ),
            Category(
                name='Terrazzo',
                description='Terrazzo flooring solutions',
                parent_id=finishing_materials.id
            ),
            Category(
                name='Tiles and Accessories',
                description='Various types of tiles and accessories',
                parent_id=finishing_materials.id
            ),
            Category(
                name='Paint & Accessories',
                description='Paint and painting tools',
                parent_id=finishing_materials.id
            )
        ]
        
        # Adhesives and Sealants subcategories
        adhesives_sealants_subs = [
            Category(
                name='Glue and Adhesive',
                description='Various types of adhesives',
                parent_id=adhesives_sealants.id
            ),
            Category(
                name='Waterproofing Products',
                description='Waterproofing solutions',
                parent_id=adhesives_sealants.id
            ),
            Category(
                name='Sealants',
                description='Sealing products',
                parent_id=adhesives_sealants.id
            ),
            Category(
                name='Antitermite',
                description='Termite prevention products',
                parent_id=adhesives_sealants.id
            )
        ]
        
        # Hardware & Tools subcategories
        hardware_tools_subs = [
            Category(
                name='Bolts & Nuts',
                description='Fasteners and hardware',
                parent_id=hardware_tools.id
            ),
            Category(
                name='Carpentry',
                description='Carpentry tools and equipment',
                parent_id=hardware_tools.id
            ),
            Category(
                name='Tanks',
                description='Storage and water tanks',
                parent_id=hardware_tools.id
            )
        ]
        
        # Add all subcategories
        db.session.add_all(
            building_materials_subs +
            finishing_materials_subs +
            adhesives_sealants_subs +
            hardware_tools_subs
        )
        db.session.commit()
        
        print("Categories initialized successfully!")

if __name__ == '__main__':
    init_categories()
