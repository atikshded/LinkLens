FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
RUN chmod +x mvnw

# Download dependencies first (better caching)
RUN ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw clean package -DskipTests

EXPOSE 8081

CMD ["java","-jar","target/backend-0.0.1-SNAPSHOT.jar"]