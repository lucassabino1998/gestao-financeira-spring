# Usa o Java 21
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
# Copia os arquivos da pasta demo
COPY . .
# Compila o projeto ignorando testes para ser mais rápido
RUN chmod +x mvnw
RUN ./mvnw clean install -DskipTests
# Porta padrão do Render
EXPOSE 8080
# Comando para iniciar sua API
ENTRYPOINT ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]