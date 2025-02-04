from .. import db
from .base import BaseModel

class Category(BaseModel):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    parent_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    display_order = db.Column(db.Integer, default=0)
    
    subcategories = db.relationship(
        'Category', 
        backref=db.backref('parent', remote_side=[id]),
        cascade='all, delete-orphan'
    )
    products = db.relationship('Product', lazy='dynamic')
    
    def __repr__(self):
        return f'<Category {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'parent_id': self.parent_id,
            'slug': self.slug,
            'is_active': self.is_active,
            'display_order': self.display_order,
            'subcategories': [child.to_dict() for child in self.subcategories],
            'products': [product.to_dict() for product in self.products]
        }
