FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copiar pom.xml e baixar dependências
COPY pom.xml .
COPY src ./src

# Build
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

# Runtime image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copiar JAR da fase de build
COPY --from=builder /app/target/carrinhos-api-*.jar app.jar

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Expor porta
EXPOSE 8080

# Iniciar aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
