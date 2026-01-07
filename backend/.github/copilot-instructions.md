# Guías de Estilo de Código Python

## 1. Estándares de Logging

### Regla 1.1: Lazy Formatting para Llamadas a Logger 🐌

Los mensajes de logging dentro de las llamadas directas a `logger` (`logger.info`, `logger.error`, etc.) deben usar el formato de interpolación de estilo antiguo (**lazy formatting**) con el operador `%`.

**Nunca se deben usar f-strings dentro de las llamadas directas a logger**, ya que fuerzan la evaluación de la cadena incluso si el nivel de logging es muy bajo.

**Excepción:** Esta restricción **NO APLICA** a la construcción de mensajes de error o strings en el código de aplicación *antes* de que se pasen a `logger` o a `raise`.

**Formato Correcto (Preferido en `logger`):**
```python
self.logger.error("Falló la conexión con %s", url_conexion)
```
**Formato Correcto para mensajes normales o excepciones (Priorizar f-strings por claridad):**
```python
message = f"Permission denied for action: {action}"
if resource:
    message += f" on resource: {resource}"
super().__init__(message)
```
**Formato Incorrecto para mensajes normales o excepciones :**
```python
message = "Permission denied for action %s:" % action
if resource:
    message += " on resource: %s" % resource
super().__init__(message)
```
**Formato Incorrecto (Evitar en `logger`):**
```python
self.logger.error(f"Falló la conexión con {url_conexion}")
```

## 2. Uso de Emojis y Formato

### Regla 2.1: Restricción General de Emojis

GitHub Copilot no debe incluir **emojis** en el código fuente (comentarios, nombres de variables, cadenas de texto, docstrings, etc.) de forma general. Prioriza la claridad y el profesionalismo del código.

### Regla 2.2: Excepciones para Logging (Emojis Útiles)

Solo se permiten emojis en las llamadas a **logging** (`logger.info`, `logger.warning`, `logger.error`, etc.) y **solo si** el emoji mejora significativamente la claridad o visibilidad del tipo de mensaje, como en los siguientes ejemplos:

| Tipo de Mensaje | Ejemplo de Uso (Aceptado) |
| :--- | :--- |
| Éxito / Tarea Finalizada | self.logger.info("Proceso completado ✅") |
| Advertencia / Atención | self.logger.warning("Fallo temporal, reintentando ⚠️") |
| Error Crítico / Falla | self.logger.error("Error fatal en la base de datos 🚨") |

---

## 3. Estándares de Manejo y Lanzamiento de Excepciones

### Regla 3.1: Especificidad en el Lanzamiento (`raise`)

Al lanzar (`raise`) una excepción, esta debe ser lo **más específica posible**, utilizando una subclase de `Exception` incorporada en Python o una excepción personalizada del proyecto, en lugar de la clase base `Exception`.

Esto permite que el código que llama pueda capturar y manejar el error con precisión.

| Tipo de Error (Caso) | Formato Correcto (Preferido) | Formato Incorrecto (Evitar) |
| :--- | :--- | :--- |
| Argumento No Válido | raise ValueError("El valor debe ser positivo.") | raise Exception("Problema con el valor.") |
| Archivo No Encontrado | raise FileNotFoundError("Ruta de imagen inválida.") | raise Exception("El archivo no existe.") |
| Error de Tipo | raise TypeError("El argumento debe ser un string.") | raise Exception("Error de dato.") |

### Regla 3.2: Captura Específica (`except`)

Al manejar (`except`) excepciones, también se debe intentar capturar la clase de excepción específica y no el `Exception` genérico, a menos que se relance la excepción inmediatamente después de registrar el error.

**Formato Correcto (Preferido):**
```python
try:
    # ... código ...
except FileNotFoundError as e:
    self.logger.error("Error al abrir el archivo: %s", e)
    # Manejo de error de archivo
```
## 4. Estándares de Documentación de Funciones
### Regla 4.1: Docstrings Obligatorios 📄
Toda nueva función o método (def o async def) que se cree debe incluir un Docstring inmediatamente después de su definición. El Docstring debe resumir brevemente la función del código.

Formato Correcto (Preferido - estilo One-line):
```python
async def _close_db_pool(self):
    """Cierra el pool de conexiones a la base de datos de forma asíncrona."""
    # ... código ...
```
Formato Incorrecto (Evitar - sin Docstring):
```python
async def _close_db_pool(self):
    # ... código ...
```

## 5. Estándares de Importación de Módulos
### Regla 5.1: Imports en la parte superior del archivo (PEP 8) 🔝
Todos los módulos (import o from ... import ...) deben declararse siempre en la parte superior del documento (después del docstring del módulo, si existe) y no deben colocarse dentro de funciones, métodos o bloques try/except.

Formato Correcto (Preferido):
```python
"""Módulo de servicio de soporte de pago
"""
import os
import cv2
import numpy as np
# Resto de imports...
# ... código ...
def procesar_imagen(imagen):
    # ... código ...
```
Formato Incorrecto (Evitar - imports dentro de funciones):
```python
def procesar_imagen(imagen):
    import cv2
    # ... código ...
```