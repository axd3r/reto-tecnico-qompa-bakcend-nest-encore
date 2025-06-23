
# 🧾 Microservicio de Comprobantes de Compra

Microservicio desarrollado con **NestJS** y **Encore** para registrar y gestionar comprobantes de compra. Desplegado automáticamente en **Encore Cloud**, con infraestructura y CI/CD gestionados por Encore.

---

## 🚀 Despliegue en Encore Cloud

Este proyecto está conectado con **Encore Cloud** y se despliega automáticamente al hacer `git push encore`.  
Puedes ver la app y endpoints en:  
🔗 [https://app.encore.dev/apps/reto-tecnico-qompa](https://app.encore.dev/apps/reto-tecnico-qompa)

### 📁 Estructura de despliegue

- App ID: `reto-tecnico-qompa-zzgi`
- Rama activa: `encore-dev`
- CI/CD: Integrado por defecto con build, test y deploy automáticos

---

## ⚙️ Configuración de Variables de Entorno

En Encore, las variables de entorno se manejan como **secretos seguros**:

### 🔑 Establecer variables con Encore CLI

```bash
encore secret set OPENAI_API_KEY="sk-..."
encore secret set DATABASE_URL="postgresql://..."
```

Estas variables estarán disponibles en tu código a través de `process.env`.

---

## 🧠 Funcionalidades Principales

### 📥 Registro de Comprobantes

- Campos requeridos:
  - `companyId`
  - `supplierRuc`
  - `invoiceNumber`
  - `amount`
  - `issueDate`
  - `documentType`
- Cálculo automático de IGV (18%) y Total
- Validación automática de RUC con API SUNAT

### 🔁 Manejo de Estados

- Estados permitidos: `PENDING`, `VALIDATED`, `REJECTED`, `OBSERVED`
- Cambio de estado vía API REST

### 📄 Listado y Filtros

- Paginación
- Filtros por:
  - Fecha (`issueDate`)
  - Tipo (`documentType`)
  - Estado (`status`)

### 📤 Exportación CSV

- Exportación directa desde Encore Cloud con los filtros anteriores

### 🤖 Integración con IA (ChatGPT)

- Realiza preguntas en lenguaje natural:
  > “¿Cuál fue el total validado en mayo?”

---

## 🌐 Endpoints Destacados

| Método | Endpoint                              | Descripción                          |
|--------|----------------------------------------|--------------------------------------|
| POST   | `/pucharse-receipts`                  | Crear un comprobante de compra       |
| PATCH  | `/pucharse-receipts/status/:id`       | Cambiar estado del comprobante       |
| GET    | `/pucharse-receipts`                  | Listar comprobantes con filtros      |
| GET    | `/pucharse-receipts/export/csv`       | Exportar comprobantes a CSV          |
| POST   | `/pucharse-receipts/ai/ask`           | Consultar datos con lenguaje natural |

---

## 📦 Modelo de Base de Datos

| Campo           | Tipo             | Descripción                                 |
|-----------------|------------------|---------------------------------------------|
| `id`            | UUID             | Identificador único                         |
| `companyId`     | String           | ID de la empresa                            |
| `supplierRuc`   | String           | RUC del proveedor                           |
| `invoiceNumber` | String           | Número de comprobante                       |
| `amount`        | Decimal(12,2)    | Monto base                                  |
| `igv`           | Decimal(12,2)    | IGV calculado automáticamente               |
| `total`         | Decimal(12,2)    | Total con IGV                               |
| `issueDate`     | DateTime         | Fecha de emisión                            |
| `documentType`  | Enum             | FACTURA, BOLETA, RECIBO                     |
| `status`        | Enum             | PENDING, VALIDATED, REJECTED, OBSERVED      |
| `createdAt`     | DateTime         | Fecha de creación del registro              |
| `updatedAt`     | DateTime         | Fecha de última modificación                |

---

## 🧠 Ejemplo de Consulta IA

```json
POST /pucharse-receipts/ai/ask

{
  "question": "¿Cuál fue el total de comprobantes validados en mayo?"
}
```

**Respuesta esperada:**
```json
{
  "answer": "El total validado en mayo fue de S/ 18,900.00"
}
```

---

## 📌 CI/CD Automático con Encore

Al hacer cambios:

```bash
git add .
git commit -m "Nueva funcionalidad"
git push encore encore-dev
```

Esto ejecuta automáticamente:

1. `npm install`
2. `npm run build`
3. `npm test`
4. Despliegue a producción en Encore Cloud

Puedes seguir los logs en tu dashboard en [app.encore.dev](https://app.encore.dev).

---

## 🧪 Seed de Datos

Para insertar datos de prueba en entorno local:

```bash
npm run seed
```

En producción puedes ejecutar un script desde el dashboard o CLI.

---

## 👨‍💻 Autor

Desarrollado por **Joaquín Orihuela**  
🔗 [GitHub](https://github.com/axd3r)

---

## 🙌 Agradecimientos

Gracias al equipo de **Qompa** por el reto técnico.  
¡Una experiencia enriquecedora!

---

## 📄 Licencia

MIT
