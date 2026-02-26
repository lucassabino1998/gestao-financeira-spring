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
# Se o seu JAR fica em demo/target/...
ENTRYPOINT ["java", "-jar", "demo/target/demo-0.0.1-SNAPSHOT.jar"]