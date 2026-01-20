"""
Script para crear productos de prueba (mocks)
Útil para desarrollo y testing de las APIs
"""
from decimal import Decimal
from sqlalchemy.orm import Session
from app.database.session import SessionLocal
from app.models.products import Product


def create_mock_products():
    """Crear productos de prueba en la base de datos"""
    db: Session = SessionLocal()
    
    try:
        # Verificar si ya existen productos
        existing_products = db.query(Product).count()
        if existing_products > 0:
            print(f"⚠️  Ya existen {existing_products} productos en la base de datos.")
            response = input("¿Desea continuar y agregar más productos? (s/n): ")
            if response.lower() != 's':
                print("Operación cancelada.")
                return
        
        # =================================================================
        # CATEGORÍA: PAPELERÍA
        # =================================================================
        
        products = [
            Product(
                name="Cuaderno Universitario 100 Hojas",
                description="Cuaderno de espiral, papel bond de 75g, rayado, con margen. Ideal para estudiantes.",
                category="stationery",
                price=Decimal("5.50"),
                stock_quantity=150,
                status="active",
                image_url="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
                sku="CUA-100-001"
            ),
            Product(
                name="Cuaderno Profesional 200 Hojas",
                description="Cuaderno de espiral doble, pasta dura, papel bond premium.",
                category="stationery",
                price=Decimal("8.99"),
                stock_quantity=80,
                status="active",
                image_url="https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
                sku="CUA-200-001"
            ),
            Product(
                name="Bolígrafo Azul Punta Fina",
                description="Bolígrafo de tinta azul, punta 0.7mm.",
                category="stationery",
                price=Decimal("0.75"),
                stock_quantity=500,
                status="active",
                image_url="https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
                sku="BOL-AZ-001"
            ),
            Product(
                name="Bolígrafo Negro Gel",
                description="Bolígrafo de gel negro, punta 0.5mm.",
                category="stationery",
                price=Decimal("1.25"),
                stock_quantity=300,
                status="active",
                image_url="https://fastly.picsum.photos/id/32/4032/3024.jpg?hmac=n7I3OdGszMIwuGcvplNthgBmAxvAZ3rNBBSuDFZaItQ",
                sku="BOL-NG-001"
            ),
            Product(
                name="Lápiz Grafito HB - Pack 12 unidades",
                description="Lápices de grafito HB, madera de calidad.",
                category="stationery",
                price=Decimal("3.50"),
                stock_quantity=200,
                status="active",
                image_url="https://fastly.picsum.photos/id/36/4179/2790.jpg?hmac=OCuYYm0PkDCMwxWhrtoSefG5UDir4O0XCcR2x-aSPjs",
                sku="LAP-HB-012"
            ),
            Product(
                name="Lápices de Colores - 24 unidades",
                description="Set de 24 lápices de colores brillantes.",
                category="stationery",
                price=Decimal("12.99"),
                stock_quantity=75,
                status="active",
                image_url="https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI",
                sku="LAP-COL-024"
            ),
            Product(
                name="Carpeta Cartón Oficio",
                description="Carpeta de cartón prensado tamaño oficio.",
                category="stationery",
                price=Decimal("2.50"),
                stock_quantity=120,
                status="active",
                image_url="https://fastly.picsum.photos/id/41/1280/805.jpg?hmac=W9CWeYdlZisqEfhjuODl83T3lCXAqjUZrOe9iMFPYmI",
                sku="CAR-OFF-001"
            ),
            Product(
                name="Archivador de Palanca Tamaño Oficio",
                description="Archivador de palanca, lomo de 7cm.",
                category="stationery",
                price=Decimal("6.75"),
                stock_quantity=60,
                status="active",
                image_url="https://fastly.picsum.photos/id/44/4272/2848.jpg?hmac=a0rRK2VqTNYMvxqfQjFI65m4ZzMGnKRJzHvrJovjoQQ",
                sku="ARC-PAL-001"
            ),
            
            # =================================================================
            # CATEGORÍA: SUMINISTROS DE FOTOGRAFÍA
            # =================================================================
            
            Product(
                name="Papel Fotográfico Glossy A4 - 100 hojas",
                description="Papel fotográfico brillante A4, 180g/m².",
                category="photo_supplies",
                price=Decimal("18.50"),
                stock_quantity=45,
                status="active",
                image_url="https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g",
                sku="PAP-FOT-A4-100"
            ),
            Product(
                name="Papel Fotográfico 10x15cm - 200 hojas",
                description="Papel fotográfico tamaño postal 10x15cm.",
                category="photo_supplies",
                price=Decimal("22.99"),
                stock_quantity=30,
                status="active",
                image_url="https://fastly.picsum.photos/id/45/4592/2576.jpg?hmac=Vc7_kMYufvy96FxocZ1Zx6DR1PNsNQXF4XUw1mZ2dlc",
                sku="PAP-FOT-10X15-200"
            ),
            Product(
                name="Papel Fotográfico Mate A4 - 50 hojas",
                description="Papel fotográfico mate A4, 200g/m².",
                category="photo_supplies",
                price=Decimal("16.75"),
                stock_quantity=35,
                status="active",
                image_url="https://fastly.picsum.photos/id/56/2880/1920.jpg?hmac=BIplhYgNZ9bsjPXYhD0xx6M1yPgmg4HtthKkCeJp6Fk",
                sku="PAP-FOT-MAT-50"
            ),
            Product(
                name="Marco para Foto A4 con Vidrio",
                description="Marco elegante para fotos tamaño A4.",
                category="photo_supplies",
                price=Decimal("8.99"),
                stock_quantity=50,
                status="active",
                image_url="https://fastly.picsum.photos/id/58/1280/853.jpg?hmac=YO3QnOm9TpyM5DqsJjoM4CHg8oIq4cMWLpd9ALoP908",
                sku="MAR-A4-001"
            ),
            Product(
                name="Álbum de Fotos 200 Bolsillos",
                description="Álbum para 200 fotos 10x15cm.",
                category="photo_supplies",
                price=Decimal("15.50"),
                stock_quantity=25,
                status="active",
                image_url="https://fastly.picsum.photos/id/39/3456/2304.jpg?hmac=cc_VPxzydwTUbGEtpsDeo2NxCkeYQrhTLqw4TFo-dIg",
                sku="ALB-200-001"
            ),
            Product(
                name="Cartucho de Tinta Negro Compatible HP 664",
                description="Cartucho de tinta negra compatible con HP.",
                category="photo_supplies",
                price=Decimal("25.99"),
                stock_quantity=20,
                status="active",
                image_url="https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
                sku="CART-HP664-NEG"
            ),
            Product(
                name="Cartucho de Tinta Color Compatible HP 664",
                description="Cartucho de tinta tricolor (CMY).",
                category="photo_supplies",
                price=Decimal("28.99"),
                stock_quantity=18,
                status="active",
                image_url="https://fastly.picsum.photos/id/69/4912/3264.jpg?hmac=Q08LW3SoOxPfaE-y8-braexxvm5PESXMCdEDqFbEhQ8",
                sku="CART-HP664-COL"
            ),
            
            # Productos con estados especiales
            Product(
                name="Papel Couché A3 - 100 hojas",
                description="Papel couché brillante A3. ¡Próximamente!",
                category="photo_supplies",
                price=Decimal("35.00"),
                stock_quantity=0,
                status="out_of_stock",
                image_url="https://fastly.picsum.photos/id/76/4912/3264.jpg?hmac=VkFcSa2Rbv0R0ndYnz_FAmw02ON1pPVjuF_iVKbiiV8",
                sku="PAP-COU-A3-100"
            ),
            Product(
                name="Tinta Canon Serie Antigua (DESCONTINUADO)",
                description="Producto fuera de catálogo.",
                category="photo_supplies",
                price=Decimal("20.00"),
                stock_quantity=0,
                status="discontinued",
                image_url="https://fastly.picsum.photos/id/80/3888/2592.jpg?hmac=zD95NwXZ7mGAMj-z4444Elf43I4HJvd7Afm2tloweLw",
                sku="CART-CAN-OLD-001"
            ),
            Product(
                name="OFERTA: Set de Marcadores Permanentes x12",
                description="¡Últimas unidades!",
                category="stationery",
                price=Decimal("9.99"),
                stock_quantity=5,
                status="active",
                image_url="https://fastly.picsum.photos/id/85/1280/774.jpg?hmac=h_HHpvfhMmLP6uOSrHS7HSlXVRuMKfBbc8HFKd1Acv4",
                sku="MAR-PER-012-OFERTA"
            ),
        ]
        
        # Agregar todos los productos
        for product in products:
            db.add(product)
        
        db.commit()
        
        print("\n" + "="*70)
        print("🎉 ¡Productos mock creados exitosamente!")
        print("="*70)
        
        # Estadísticas
        papeleria = db.query(Product).filter(Product.category == "stationery").count()
        foto = db.query(Product).filter(Product.category == "photo_supplies").count()
        
        print(f"\n📊 Resumen:")
        print(f"   • Papelería: {papeleria}")
        print(f"   • Suministros de Fotografía: {foto}")
        print(f"   • Total: {db.query(Product).count()}")
        
        activos = db.query(Product).filter(Product.status == "active").count()
        agotados = db.query(Product).filter(Product.status == "out_of_stock").count()
        descontinuados = db.query(Product).filter(Product.status == "discontinued").count()
        
        print(f"\n📝 Por estado:")
        print(f"   • Activos: {activos}")
        print(f"   • Agotados: {agotados}")
        print(f"   • Discontinuados: {descontinuados}")
        print("\n" + "="*70 + "\n")
        
    except Exception as e:
        db.rollback()
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    print("\n" + "="*70)
    print("🏪 Creando productos mock para Fotovariedades")
    print("="*70 + "\n")
    create_mock_products()