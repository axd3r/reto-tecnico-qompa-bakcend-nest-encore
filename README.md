
# 🧾 Microservicio de Comprobantes de Compra

Microservicio desarrollado con **NestJS** en estructura clásica para registrar y gestionar comprobantes de compra. Implementa arquitectura limpia, validación de RUC con la API de SUNAT (simulada o real), y exportación CSV, además de integración con IA para responder preguntas con lenguaje natural.

📦 Esta versión del proyecto **no utiliza Encore Cloud**. Para ver la versión compatible con Encore, dirígete a la rama `encore-dev`.

---

## 📌 Funcionalidades Principales

### 📥 Registro de Comprobantes
- Campos requeridos: `company_id`, `supplier_ruc`, `invoice_number`, `amount`, `issue_date`, `document_type`
- Cálculo automático de:
  - IGV (18%)
  - Total
- Validación automática de RUC (API SUNAT)

### 🔁 Manejo de Estados
- Estados: `pending`, `validated`, `rejected`, `observed`
- Cambio de estado manual mediante API

### 📄 Listado y Filtros
- Paginación
- Filtro por fecha (`issue_date`)
- Filtro por tipo de documento (`document_type`)
- Filtro por estado

### 📤 Exportación CSV
- Exportación de comprobantes filtrados
- Columnas adicionales:
  - IGV calculado
  - Total
  - Estado actual

### 🤖 Integración IA (ChatGPT)
- Endpoint inteligente para responder preguntas como:
  > “¿Cuál fue el total de comprobantes validados en mayo?”

---

## ⚙️ Stack Tecnológico

| Herramienta     | Uso                        |
|------------------|-----------------------------|
| NestJS          | Framework principal         |
| PostgreSQL      | Base de datos relacional     |
| Prisma ORM      | Acceso a base de datos       |
| TypeScript      | Tipado estricto              |
| Jest (opcional) | Pruebas unitarias (no incluidas) |

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar repositorio

```bash
git clone https://github.com/axd3r/reto-tecnico-qompa-bakcend-nest-encore.git
cd reto-tecnico-qompa-bakcend-nest-encore
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```
En el archivo .env coloca la clave de OpenAI brindada en el reto:
```bash
OPENAI_API_KEY=sk-.........
```

Ajusta los valores de conexión a PostgreSQL y el token de la API SUNAT si aplica.

### 4. Configurar Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 📚 Modelo de Base de Datos

| Campo           | Tipo            | Descripción                                |
| --------------- | --------------- | ------------------------------------------ |
| `id`            | `String (UUID)` | Identificador único del comprobante        |
| `companyId`     | `String`        | Identificador de la empresa emisora        |
| `supplierRuc`   | `String`        | RUC del proveedor                          |
| `invoiceNumber` | `String`        | Número del comprobante (ej. F001-00001234) |
| `amount`        | `Decimal(12,2)` | Monto base del comprobante                 |
| `igv`           | `Decimal(12,2)` | Impuesto IGV calculado automáticamente     |
| `total`         | `Decimal(12,2)` | Monto total (amount + igv)                 |
| `issueDate`     | `DateTime`      | Fecha de emisión del comprobante           |
| `documentType`  | `Enum`          | Tipo de documento: FACTURA, BOLETA, RECIBO |
| `status`        | `Enum`          | Estado: PENDING, VALIDATED, REJECTED, etc. |
| `createdAt`     | `DateTime`      | Fecha de creación del registro             |
| `updatedAt`     | `DateTime`      | Fecha de última modificación               |

🧩 Entidad Principal: PurchaseReceipt

#### 📘 Enums
DocumentType
- FACTURA
- BOLETA
- RECIBO

PurchaseReceiptStatus
- PENDING
- VALIDATED
- REJECTED
- OBSERVED

### 5. Ejecutar servidor de desarrollo (NestJS clásico)

```bash
npm run start:dev
```

---

## 🧪 Datos de prueba

Se incluyen comprobantes de ejemplo precargados (seed) para facilitar pruebas. Ejecuta:

```bash
npm run seed
```

---

## 📬 Endpoints Destacados

Puedes utilizar el archivo `Reto_tecnico_nestjs.postman_collection.json` para importar los endpoints en Postman.

| Método | Ruta                              | Descripción                           |
|--------|-----------------------------------|----------------------------------------|
| POST   | `/pucharse-receipts`              | Registrar comprobante de compra       |
| PATCH  | `/pucharse-receipts/:id/status`   | Cambiar estado del comprobante        |
| GET    | `/pucharse-receipts`              | Listar comprobantes con filtros       |
| GET    | `/pucharse-receipts/export/csv`   | Exportar comprobantes filtrados a CSV |
| POST   | `/pucharse-receipts/ai/ask`       | Preguntar al asistente IA             |

---

## 📌 Ejemplos de uso

✅ POST /pucharse-receipts
```json
{
  "companyId": "a0645f6d-18df-422f-8168-30d701af78a0",
  "supplierRuc": "10763261374",
  "invoiceNumber": "F001-00001239",
  "amount": 1000.00,
  "issueDate": "2024-05-01T00:00:00.000Z",
  "documentType": "FACTURA"
}
```

🔄 PATCH /pucharse-receipts/:id/status
```json
{
  "status": "VALIDATED"
}
```

🔍 GET /pucharse-receipts
```
?startDate=2024-03-19&endDate=2025-06-25&status=VALIDATED&page=1&limit=5
```

📤 GET /pucharse-receipts/export/csv
```
?startDate=2024-06-01&documentType=FACTURA&status=VALIDATED
```

🧠 POST /pucharse-receipts/ai/ask
```json
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

## ✅ Estado del Proyecto

- [x] Registro de comprobantes
- [x] Validación RUC vía API
- [x] Gestión de estados
- [x] Filtros y exportación CSV
- [x] Endpoint de IA (ChatGPT)
- [ ] Pruebas unitarias básicas (por implementar)

---

## 📄 Licencia

MIT

---

## 👨‍💻 Autor

Desarrollado por **Joaquín Orihuela**  
[GitHub](https://github.com/axd3r)

---

## 🙌 Agradecimientos

Gracias al equipo de **Qompa** por el reto técnico.  
¡Fue un desafío interesante y enriquecedor!
