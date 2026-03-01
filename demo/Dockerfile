# Usa o Java 21 como base
FROM eclipse-temurin:21-jdk-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia todos os arquivos do projeto para o container
COPY . .

# Dá permissão de execução para o Maven Wrapper
RUN chmod +x mvnw

# Compila o projeto ignorando os testes para ser mais rápido
RUN ./mvnw clean install -DskipTests

# Expõe a porta padrão que o Render utiliza
EXPOSE 8080

# O SEGREDO: Como seu JAR está em demo/demo/target,
# e o Maven roda na pasta atual, o caminho final é demo/target/
# REMOVA o "demo/" da frente do target
# O JAR agora será gerado na pasta target da raiz
ENTRYPOINT ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]