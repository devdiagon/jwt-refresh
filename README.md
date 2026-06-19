# Autenticación stateless con JWT

Aplicación Node.js + Express que demuestra la firma y verificación de tokens JWT usando dos algoritmos: **HS256** (HMAC con clave simétrica) y **RS256** (RSA con par de claves asimétricas). El algoritmo activo se selecciona mediante la variable de entorno `JWT_ALGORITHM`.

---

### 1. ¿De qué manera la implementación teórica de un Refresh Token solucionaría la experiencia del usuario sin comprometer la seguridad en servicios distribuidos?

Actualmente TODA la información para validar la identidad del token se reside dentro de los metadados de la propia token. Este mecanismo resulta ideal para aplicaciones distribuidas, pues cada una puede verificar independientemente el token sin consultar a una base de datos central. No obstante, dado que el token da acceso al sistema, es importante configurarlo con una expiración corta debido a que se pueden comprometer facilmente al momento de transitar en la web.

A fin de evitar que el usuario tenga que autenticarse una y otra vez, surge el término de **refresh token**, el cual viene a ser a ser un token adicional que se genera con un ciclo de vida de larga duración (días, semanas). Su propósito es orquestar el ciclo de autenticación de forma automática, en la que emite token de corta expiración (**access tokens**) al momento de que utiliza algún recurso del sistema. Cuando un access token expira, se vuelve a emitir otro, evitando que el usuario tenga que autenticarse constantemente.

De esta manera la UX sería mucho más cómoda, en donde solo se pediría nuevamente el registro de credenciales del usuario cuando expire el refresh token.

---

### 2. ¿En qué lugar del ecosistema (Cliente o Servidor) se debería almacenar y gestionar el ciclo de vida del Refresh Token según las buenas prácticas de persistencia con cookies seguras?

Dado que el refresh token es el que mantiene el proceso de autenticación, es importante poder mantenerlo de forma segura tanto del lado del cliente como del servidor.

**En el Servidor**

Puedealmacenar los refresh tokens junto con metadatos útiles para ser usados por el backend, principalmente llevar la `fecha_expiracion`. Esto permite tener más control autoritario sobre la token, siendo una fuente de verdad fiable.

Del lado del servidor se puede controlar el estado de esta token, por lo que se la puede invalidar en cualquier momento en caso de que haya sido comprometida. De la misma manera, puede controlar correctamente el proceso de renovación de la refresh token mediante políticas de control de acceso ajustadas a regularizaciones o reglas internas del negocio.

**En el Cliente**

La manera más segura de mantener la token es mediante `Cookies HTTP-Only`. Esto evita que llamadas por parte de la API de javascript puedan acceder directamente a la cookie, principalmente si se tratan de ataques como XSS. Una configuración robusta puede ser:

```
Set-Cookie: refreshToken=<valor>;
  HttpOnly;        // No accesible desde JavaScript
  Secure;          // Solo se transmite por HTTPS
  SameSite=Strict; // No se envía en peticiones cross-site
  Path=/auth/token/refresh; // Scope mínimo: solo viaja al endpoint de renovación
  Max-Age=<segundos de vigencia>
```

Dado que desde la perspectiva del usuario, no se "ve" la refresh token, resulta conveniente limitar las rutas a las que se puede transportar, especialmente cuando se trata de solicitudes de renovación.

Si se trata de dispositivos móviles, se puede utilizar `Almacenamiento cifrado`, como los Keychain (iOS) o KeyStore (Android), siendo nativas del sistema operativo para almacenar datos muy sensibles de manera local; lo que podría habilitar la posibilidad de solicitudes del tipo offline-access.

> NUNCA almacenar la refresh token en `localStorage` o `sessionStorage` del navegador
