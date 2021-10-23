FROM maven:3.8.2-openjdk-16 AS MAVEN_BUILD
COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn package
FROM openjdk:16
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/checkoutmicroservices-0.0.1.jar /app/
# EXPOSE 8083
ENTRYPOINT ["java", "-jar", "checkoutmicroservices-0.0.1.jar"]