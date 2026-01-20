"""
Script de ejemplo para crear usuarios de prueba
Ejecutar después de inicializar la base de datos con Alembic
"""
from sqlalchemy.orm import Session
from app.database.session import SessionLocal
from app.models.users import User, UserRole
from app.core.security import get_password_hash


def create_test_users():
    """Crear usuarios de prueba en la base de datos"""
    db: Session = SessionLocal()
    
    try:
        # Verificar si ya existen usuarios
        existing_users = db.query(User).count()
        if existing_users > 0:
            print(f"⚠️  Ya existen {existing_users} usuarios en la base de datos.")
            response = input("¿Desea continuar y agregar más usuarios? (s/n): ")
            if response.lower() != 's':
                print("Operación cancelada.")
                return
        
        # Usuario administrador
        admin = User(
            email="admin@fotovariedades.com",
            full_name="Administrador Principal",
            password_hash=get_password_hash("Admin123!"),
            role=UserRole.ADMIN,  # Ahora es una constante string
            is_active=True
        )
        db.add(admin)
        print("✅ Usuario administrador creado: admin@fotovariedades.com")
        
        # Usuario staff
        staff = User(
            email="staff@fotovariedades.com",
            full_name="Personal de Tienda",
            password_hash=get_password_hash("Staff123!"),
            role=UserRole.STAFF,  # Ahora es una constante string
            is_active=True
        )
        db.add(staff)
        print("✅ Usuario staff creado: staff@fotovariedades.com")
        
        # Usuario cliente
        customer = User(
            email="cliente@example.com",
            full_name="Juan Pérez",
            password_hash=get_password_hash("Cliente123!"),
            role=UserRole.CUSTOMER,  # Ahora es una constante string
            is_active=True
        )
        db.add(customer)
        print("✅ Usuario cliente creado: cliente@example.com")
        
        # Confirmar cambios
        db.commit()
        
        print("\n" + "="*60)
        print("🎉 Usuarios de prueba creados exitosamente!")
        print("="*60)
        print("\nCredenciales de prueba:")
        print("\n1. ADMINISTRADOR:")
        print("   Email: admin@fotovariedades.com")
        print("   Password: Admin123!")
        print("\n2. STAFF:")
        print("   Email: staff@fotovariedades.com")
        print("   Password: Staff123!")
        print("\n3. CLIENTE:")
        print("   Email: cliente@example.com")
        print("   Password: Cliente123!")
        print("\n" + "="*60)
        print("\n📝 Puedes probar el login en: http://localhost:8000/api/v1/docs")
        print("   Endpoint: POST /api/v1/auth/token")
        print("="*60 + "\n")
        
    except Exception as e:
        db.rollback()
        print(f"\n❌ Error al crear usuarios: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    print("\n" + "="*60)
    print("🔧 Creando usuarios de prueba para Fotovariedades")
    print("="*60 + "\n")
    create_test_users()